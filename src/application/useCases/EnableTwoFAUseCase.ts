import { apiClient } from '../../infrastructure/api/apiClient';

export const enableTwoFAUseCase = async (params: {
  accessToken: string;
  verificationCode: string;
}): Promise<void> => {
  if (params.verificationCode.length !== 6) {
    throw new Error('Please enter the 6-digit code from your authenticator app.');
  }

  await apiClient.post('/2fa/enable', {
    verification_code: params.verificationCode,
  }, {
    headers: { Authorization: `Bearer ${params.accessToken}` },
  });
};
