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

export interface AuthResult {
  session: AuthSession;
  user: User;
}

/**
 * IAuthRepository
 * login and completeRegistration return AuthResult (session + user together)
 * so the use case can store both atomically in a single setSession(session, user) call.
 */
export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResult>;
  register(payload: RegisterPayload): Promise<{ userId: string }>;
  completeRegistration(payload: CompleteFormPayload): Promise<AuthResult>;
  logout(): Promise<void>;
  refreshSession(refreshToken: string): Promise<AuthSession>;
  getStoredSession(): Promise<AuthSession | null>;
}
