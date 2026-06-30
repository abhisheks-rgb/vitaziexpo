import type { AuthSession } from '../../domain/Auth/models/AuthSession';
import type { User } from '../../domain/Auth/models/User';
import type { LoginCredentials } from '../../domain/Auth/repository/IAuthRepository';
import {
  authRepository,
  TwoFARequiredError,
  TwoFASetupRequiredError,
} from '../../infrastructure/Auth/repository/AuthRepository';
import { useAuthStore } from '../../state/store/authStore';

export type LoginResult =
  | { kind: 'success' }
  | { kind: '2fa_required'; preAuthToken: string }
  | {
      kind: '2fa_setup_required';
      secret: string;
      qrCode: string;
      session: AuthSession;
      user: User;
    };

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
    if (err instanceof TwoFASetupRequiredError) {
      return {
        kind: '2fa_setup_required',
        secret: err.secret,
        qrCode: err.qrCode,
        session: err.session,
        user: err.user,
      };
    }
    throw err;
  }
};
