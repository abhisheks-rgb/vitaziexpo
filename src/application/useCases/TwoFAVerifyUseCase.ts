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

  const { data: rawResponse } = await apiClient.post<any>('/2fa/verify', {
    pre_auth_token: params.preAuthToken,
    verification_code: params.verificationCode,
  });

  const payload = rawResponse.data || rawResponse;
  const session = AuthMapper.toDomain(payload as AuthResponseDTO);

  const { data: profileData } = await apiClient.get<UserProfileResponseDTO>('/users/profile', {
    params: { email: params.email },
    headers: { Authorization: `Bearer ${session.accessToken}` },
  });

  const profilePayload = (profileData as any).data?.body || profileData.body || profileData;
  const user = UserMapper.toDomain(profilePayload);
  const hydratedSession = { ...session, userId: user.id };

  useAuthStore.getState().setSession(hydratedSession, user);
};
