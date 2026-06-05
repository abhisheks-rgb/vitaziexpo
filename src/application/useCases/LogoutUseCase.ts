import { authRepository } from '../../infrastructure/Auth/repository/AuthRepository';
import { useAuthStore } from '../../state/store/authStore';

/**
 * LogoutUseCase
 * Clears server session and wipes local auth state.
 */
export const logoutUseCase = async (): Promise<void> => {
  try {
    await authRepository.logout();
  } finally {
    // Always clear local state, even if the server call fails
    useAuthStore.getState().clearSession();
  }
};
