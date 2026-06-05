import type { AuthSession } from '../../../domain/Auth/models/AuthSession';
import type { AuthResponseDTO } from '../dtos/AuthDTO';

export const AuthMapper = {
  toDomain(dto: AuthResponseDTO): AuthSession {
    return {
      accessToken: dto.access_token,
      refreshToken: dto.refresh_token,
      userId: dto.user_id,
      expiresAt: Date.now() + dto.expires_in * 1000,
    };
  },
};
