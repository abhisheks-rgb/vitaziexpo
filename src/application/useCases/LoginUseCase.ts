import type { AuthSession } from '../../domain/Auth/models/AuthSession';
import type { LoginCredentials } from '../../domain/Auth/repository/IAuthRepository';
import { authRepository } from '../../infrastructure/Auth/repository/AuthRepository';
import { useAuthStore } from '../../state/store/authStore';

/**
 * LoginUseCase
 * Orchestrates: call repository → store session → return result.
 * The screen calls this and never touches the repository directly.
 */
export const loginUseCase = async (credentials: LoginCredentials): Promise<AuthSession> => {
  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password are required.');
  }

  const session = await authRepository.login(credentials);
  useAuthStore.getState().setSession(session);
  return session;
};
