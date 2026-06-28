import { IS_MOCK } from '../../../config/env';
import type { AuthSession } from '../../../domain/Auth/models/AuthSession';
import type { User } from '../../../domain/Auth/models/User';
import type {
  CompleteFormPayload,
  IAuthRepository,
  LoginCredentials,
  RegisterPayload,
} from '../../../domain/Auth/repository/IAuthRepository';
import { mockDelay } from '../../../mockData/MockHelpers';
import { mockUsers } from '../../../mockData/MockUsers';
import { apiClient } from '../../api/apiClient';
import type { AuthResponseDTO, PreAuthResponseDTO } from '../dtos/AuthDTO';
import type { UserProfileResponseDTO } from '../dtos/UserDTO';
import { AuthMapper } from '../mappers/AuthMapper';
import { UserMapper } from '../mappers/UserMapper';

// ── Mock implementation ───────────────────────────────────────────────────────
// (unchanged — keeping mock working independently)

class AuthRepositoryMock implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<{ session: AuthSession; user: User }> {
    await mockDelay();
    const user = mockUsers.find((u) => u.email.toLowerCase() === credentials.email.toLowerCase());
    if (!user) {
      throw new Error('No account found with that email address.');
    }
    const session: AuthSession = {
      accessToken: `mock-token-${user.id}-${Date.now()}`,
      refreshToken: `mock-refresh-${user.id}`,
      userId: user.id,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    return { session, user };
  }

  async register(_payload: RegisterPayload): Promise<{ userId: string }> {
    await mockDelay();
    return { userId: 'user-new-' + Date.now() };
  }

  async completeRegistration(
    payload: CompleteFormPayload,
  ): Promise<{ session: AuthSession; user: User }> {
    await mockDelay();
    const newUser: User = {
      id: 'user-new-' + Date.now(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: '',
      dateOfBirth: payload.dateOfBirth,
      organizationId: payload.organizationId,
      hasCompletedHealthQuestions: false,
      hasCompletedOnboarding: true,
      consentGiven: payload.consentGiven,
    };
    const session: AuthSession = {
      accessToken: `mock-token-${newUser.id}`,
      refreshToken: `mock-refresh-${newUser.id}`,
      userId: newUser.id,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
    return { session, user: newUser };
  }

  async logout(): Promise<void> {
    await mockDelay(200);
  }

  async refreshSession(_refreshToken: string): Promise<AuthSession> {
    await mockDelay(300);
    return {
      accessToken: 'mock-refreshed-' + Date.now(),
      refreshToken: 'mock-refresh-new',
      userId: 'user-001',
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };
  }

  async getStoredSession(): Promise<AuthSession | null> {
    return null;
  }
}

// ── Real implementation ───────────────────────────────────────────────────────

class AuthRepositoryImpl implements IAuthRepository {
  /**
   * Login flow:
   *   1. POST /users/login  → "Access Key" JWT  (or pre_auth_token if 2FA enabled)
   *   2. GET  /users/profile → user details
   *
   * The userId in AuthSession is set to the user's email (stable Vitazi identifier).
   */
  async login(credentials: LoginCredentials): Promise<{ session: AuthSession; user: User }> {
    const { data } = await apiClient.post<AuthResponseDTO | PreAuthResponseDTO>('/users/login', {
      email: credentials.email,
      password: credentials.password,
    });

    // ── 2FA path ──────────────────────────────────────────────────────────────
    if ('2fa_required' in data && data['2fa_required']) {
      // Caller (use case / screen) must handle 2FA — throw a typed signal
      const err = new TwoFARequiredError(data.pre_auth_token);
      throw err;
    }

    // ── Normal path ───────────────────────────────────────────────────────────
    const authData = data as AuthResponseDTO;
    const session = AuthMapper.toDomain(authData);

    // Fetch the user profile using the freshly-obtained token.
    // apiClient interceptor will attach the token automatically, but we set it
    // here directly so the profile call doesn't race against Zustand being set.
    const { data: profileData } = await apiClient.get<UserProfileResponseDTO>('/users/profile', {
      params: { email: credentials.email },
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });

    const user = UserMapper.toDomain(profileData.body);

    // Back-fill userId into the session now that we have it
    const hydratedSession: AuthSession = { ...session, userId: user.id };

    return { session: hydratedSession, user };
  }

  async register(payload: RegisterPayload): Promise<{ userId: string }> {
    const { data } = await apiClient.post('/auth/register', { org_id: payload.organizationId });
    return { userId: data.user_id };
  }

  async completeRegistration(
    payload: CompleteFormPayload,
  ): Promise<{ session: AuthSession; user: User }> {
    const { data } = await apiClient.post('/auth/complete-registration', {
      org_id: payload.organizationId,
      first_name: payload.firstName,
      last_name: payload.lastName,
      date_of_birth: payload.dateOfBirth,
      password: payload.password,
      consent_given: payload.consentGiven,
    });
    return {
      session: AuthMapper.toDomain(data.session),
      user: UserMapper.toDomain(data.user),
    };
  }

  async logout(): Promise<void> {
    // Vitazi API has no explicit logout endpoint; just clear client state
    // If one is added later, call it here
  }

  /**
   * Vitazi issues no refresh token. When the session expires the user must log in again.
   * If a refresh endpoint is added, wire it here.
   */
  async refreshSession(_refreshToken: string): Promise<AuthSession> {
    throw new Error('Session refresh is not supported by this API. Please log in again.');
  }

  async getStoredSession(): Promise<AuthSession | null> {
    return null;
  }
}

// ── 2FA error signal ──────────────────────────────────────────────────────────

/**
 * Thrown by login() when the server requires a 2FA code.
 * The login screen catches this, stores the pre_auth_token, and shows the 2FA input.
 */
export class TwoFARequiredError extends Error {
  readonly preAuthToken: string;
  constructor(preAuthToken: string) {
    super('2FA verification required');
    this.name = 'TwoFARequiredError';
    this.preAuthToken = preAuthToken;
  }
}

// ── Export ────────────────────────────────────────────────────────────────────

export const authRepository: IAuthRepository = IS_MOCK
  ? new AuthRepositoryMock()
  : new AuthRepositoryImpl();
