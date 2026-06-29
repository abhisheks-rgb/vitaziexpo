import type { AuthSession } from '../../../domain/Auth/models/AuthSession';
import type { AuthResponseDTO } from '../dtos/AuthDTO';

/**
 * The Vitazi API returns a JWT but no explicit expiry field.
 * We decode the `exp` claim from the JWT payload to get the real expiry.
 * Falls back to 2 hours if decoding fails.
 */
function extractExpiry(jwt: string): number {
  try {
    const payload = jwt.split('.')[1];
    // atob works in React Native (JSC/Hermes); replace with Buffer on Node if needed
    const decoded = JSON.parse(atob(payload));
    if (decoded.exp) {
      return decoded.exp * 1000; // convert seconds → ms
    }
  } catch {
    // fall through
  }
  return Date.now() + 2 * 60 * 60 * 1000; // 2-hour fallback
}

export const AuthMapper = {
  toDomain(dto: AuthResponseDTO): AuthSession {
    const accessToken = dto['Access Key'];
    return {
      accessToken,
      refreshToken: '', // Vitazi API issues no refresh token
      userId: '', // userId is resolved separately via /users/profile
      expiresAt: extractExpiry(accessToken),
    };
  },
};
