import { MOCK_DELAY_MS } from '../config/env';

/**
 * Simulates network latency in mock mode.
 * Keeps loading states and React Query behavior realistic during development.
 */
export const mockDelay = (ms: number = MOCK_DELAY_MS): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulates a random failure to test error handling flows.
 * @param failureRate — 0.0 (never) to 1.0 (always). Default: 0 (disabled).
 */
export const mockMaybeThrow = async (
  message = 'Mock network error',
  failureRate = 0,
): Promise<void> => {
  await mockDelay();
  if (Math.random() < failureRate) {
    throw new Error(message);
  }
};
