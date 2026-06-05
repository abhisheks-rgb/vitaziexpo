import type { AuthSession } from '../models/AuthSession';
import type { User } from '../models/User';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterPayload {
  organizationId: string;
}

export interface CompleteFormPayload {
  organizationId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  consentGiven: boolean;
}

/**
 * IAuthRepository
 * Contract for all authentication operations.
 * The UI depends ONLY on this interface — never on the concrete implementation.
 */
export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthSession>;
  register(payload: RegisterPayload): Promise<{ userId: string }>;
  completeRegistration(payload: CompleteFormPayload): Promise<User>;
  logout(): Promise<void>;
  refreshSession(refreshToken: string): Promise<AuthSession>;
  getStoredSession(): Promise<AuthSession | null>;
}
