import { authRepository } from '../../infrastructure/Auth/repository/AuthRepository';
import { useAuthStore } from '../../state/store/authStore';

/**
 * logoutUseCase
 *
 * Calls the server logout endpoint (no-op in mock mode),
 * then wipes session + currentUser from Zustand + AsyncStorage.
 * RootNavigator sees session=null and swaps to the Auth stack automatically.
 */
export const logoutUseCase = async (): Promise<void> => {
  try {
    await authRepository.logout();
  } finally {
    useAuthStore.getState().clearSession();
  }
};
