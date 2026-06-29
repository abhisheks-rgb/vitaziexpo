import type { LoginCredentials } from '../../domain/Auth/repository/IAuthRepository';
import {
  authRepository,
  TwoFARequiredError,
} from '../../infrastructure/Auth/repository/AuthRepository';
import { useAuthStore } from '../../state/store/authStore';

export type LoginResult = { kind: 'success' } | { kind: '2fa_required'; preAuthToken: string };

export const loginUseCase = async (credentials: LoginCredentials): Promise<LoginResult> => {
  if (!credentials.email.trim() || !credentials.password) {
    throw new Error('Please enter your email and password.');
  }

  try {
    const { session, user } = await authRepository.login(credentials);
    useAuthStore.getState().setSession(session, user);
    return { kind: 'success' };
  } catch (err) {
    if (err instanceof TwoFARequiredError) {
      return { kind: '2fa_required', preAuthToken: err.preAuthToken };
    }
    throw err;
  }
};
