/**
 * Domain Model: AuthSession
 * Represents the current authenticated session.
 */
export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  userId: string;
  expiresAt: number; // Unix timestamp (ms)
}
