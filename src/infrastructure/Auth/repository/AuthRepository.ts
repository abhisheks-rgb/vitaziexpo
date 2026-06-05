import { USE_MOCKS } from '../../../config/env';
import type { AuthSession } from '../../../domain/Auth/models/AuthSession';
import type { User } from '../../../domain/Auth/models/User';
import type {
  CompleteFormPayload,
  IAuthRepository,
  LoginCredentials,
  RegisterPayload,
} from '../../../domain/Auth/repository/IAuthRepository';
import { mockAuthSession } from '../../../mockData/MockAuthSession';
import { mockDelay } from '../../../mockData/MockHelpers';
import { mockCurrentUser } from '../../../mockData/MockUsers';
import { apiClient } from '../../api/apiClient';
import { AuthMapper } from '../mappers/AuthMapper';
import { UserMapper } from '../mappers/UserMapper';

// ── Mock implementation ───────────────────────────────────────────────────────

class AuthRepositoryMock implements IAuthRepository {
  async login(_credentials: LoginCredentials): Promise<AuthSession> {
    await mockDelay();
    return { ...mockAuthSession };
  }

  async register(_payload: RegisterPayload): Promise<{ userId: string }> {
    await mockDelay();
    return { userId: mockCurrentUser.id };
  }

  async completeRegistration(_payload: CompleteFormPayload): Promise<User> {
    await mockDelay();
    return { ...mockCurrentUser };
  }

  async logout(): Promise<void> {
    await mockDelay(200);
  }

  async refreshSession(_refreshToken: string): Promise<AuthSession> {
    await mockDelay(300);
    return {
      ...mockAuthSession,
      accessToken: 'mock-refreshed-token-' + Date.now(),
      expiresAt: Date.now() + 3600 * 1000,
    };
  }

  async getStoredSession(): Promise<AuthSession | null> {
    await mockDelay(100);
    // Simulate a user who is already logged in
    return { ...mockAuthSession };
  }
}

// ── Real implementation ───────────────────────────────────────────────────────

class AuthRepositoryImpl implements IAuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const { data } = await apiClient.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
      remember_me: credentials.rememberMe,
    });
    return AuthMapper.toDomain(data);
  }

  async register(payload: RegisterPayload): Promise<{ userId: string }> {
    const { data } = await apiClient.post('/auth/register', {
      org_id: payload.organizationId,
    });
    return { userId: data.user_id };
  }

  async completeRegistration(payload: CompleteFormPayload): Promise<User> {
    const { data } = await apiClient.post('/auth/complete-registration', {
      org_id: payload.organizationId,
      first_name: payload.firstName,
      last_name: payload.lastName,
      date_of_birth: payload.dateOfBirth,
      password: payload.password,
      consent_given: payload.consentGiven,
    });
    return UserMapper.toDomain(data);
  }

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  }

  async refreshSession(refreshToken: string): Promise<AuthSession> {
    const { data } = await apiClient.post('/auth/refresh', {
      refresh_token: refreshToken,
    });
    return AuthMapper.toDomain(data);
  }

  async getStoredSession(): Promise<AuthSession | null> {
    // In practice, read from SecureStore / AsyncStorage
    return null;
  }
}

// ── Export the correct implementation ─────────────────────────────────────────
export const authRepository: IAuthRepository = USE_MOCKS
  ? new AuthRepositoryMock()
  : new AuthRepositoryImpl();
