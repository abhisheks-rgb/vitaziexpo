import type { AuthSession } from '../domain/Auth/models/AuthSession';

export const mockAuthSession: AuthSession = {
  accessToken: 'mock-access-token-abc123',
  refreshToken: 'mock-refresh-token-xyz789',
  userId: 'user-001',
  expiresAt: Date.now() + 3600 * 1000, // 1 hour from now
};
