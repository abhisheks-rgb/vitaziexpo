import type { LoginCredentials } from '../../domain/Auth/repository/IAuthRepository';
import { authRepository } from '../../infrastructure/Auth/repository/AuthRepository';
import { useAuthStore } from '../../state/store/authStore';

/**
 * loginUseCase
 *
 * Validates credentials, calls the repository, then stores both the
 * session token and the full user object in Zustand (persisted).
 *
 * The stored user drives:
 *   - Display name in HomeHeader
 *   - Health questions routing in RootNavigator
 *   - Any other personalised UI
 */
export const loginUseCase = async (credentials: LoginCredentials) => {
  if (!credentials.email.trim() || !credentials.password) {
    throw new Error('Please enter your email and password.');
  }

  const { session, user } = await authRepository.login(credentials);
  useAuthStore.getState().setSession(session, user);

  return { session, user };
};
