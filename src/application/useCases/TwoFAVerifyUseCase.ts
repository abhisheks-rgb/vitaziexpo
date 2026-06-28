import { apiClient } from '../../infrastructure/api/apiClient';
import type { AuthResponseDTO } from '../../infrastructure/Auth/dtos/AuthDTO';
import type { UserProfileResponseDTO } from '../../infrastructure/Auth/dtos/UserDTO';
import { AuthMapper } from '../../infrastructure/Auth/mappers/AuthMapper';
import { UserMapper } from '../../infrastructure/Auth/mappers/UserMapper';
import { useAuthStore } from '../../state/store/authStore';

export const twoFAVerifyUseCase = async (params: {
  preAuthToken: string;
  verificationCode: string;
  email: string;
}): Promise<void> => {
  if (params.verificationCode.length !== 6) {
    throw new Error('Please enter the 6-digit code from your authenticator app.');
  }

  const { data } = await apiClient.post<AuthResponseDTO>('/2fa/verify', {
    pre_auth_token: params.preAuthToken,
    verification_code: params.verificationCode,
  });

  const session = AuthMapper.toDomain(data);

  const { data: profileData } = await apiClient.get<UserProfileResponseDTO>('/users/profile', {
    params: { email: params.email },
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  const user = UserMapper.toDomain(profileData.body);
  const hydratedSession = { ...session, userId: user.id };

  useAuthStore.getState().setSession(hydratedSession, user);
};
