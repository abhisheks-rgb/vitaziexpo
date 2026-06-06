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
import { AuthMapper } from '../mappers/AuthMapper';
import { UserMapper } from '../mappers/UserMapper';

// ── Mock implementation ───────────────────────────────────────────────────────

/**
 * In mock mode, login() matches email against mockUsers[].
 * Any password is accepted. This lets you test both users:
 *
 *   sarah.mitchell@example.com  → hasCompletedHealthQuestions: false
 *                                 → will be routed to GeneralHealthQuestions
 *
 *   james.carter@example.com    → hasCompletedHealthQuestions: true
 *                                 → goes straight to Home
 */
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
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
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
    // Simulate creating a new user who hasn't done health questions yet
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

  /**
   * Always return null — session comes from Zustand AsyncStorage persistence,
   * not from this method. Returning a session here would bypass the login screen.
   */
  async getStoredSession(): Promise<AuthSession | null> {
    return null;
  }
}

// ── Real implementation ───────────────────────────────────────────────────────

class AuthRepositoryImpl implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<{ session: AuthSession; user: User }> {
    const { data } = await apiClient.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
      remember_me: credentials.rememberMe,
    });
    return {
      session: AuthMapper.toDomain(data.session),
      user: UserMapper.toDomain(data.user),
    };
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
    await apiClient.post('/auth/logout');
  }

  async refreshSession(refreshToken: string): Promise<AuthSession> {
    const { data } = await apiClient.post('/auth/refresh', { refresh_token: refreshToken });
    return AuthMapper.toDomain(data);
  }

  async getStoredSession(): Promise<AuthSession | null> {
    return null;
  }
}

export const authRepository: IAuthRepository = IS_MOCK
  ? new AuthRepositoryMock()
  : new AuthRepositoryImpl();
