/**
 * Global feature flags.
 *
 * Set USE_MOCKS=true during development (APIs not ready).
 * Flip to false when the real backend is available — zero UI changes required.
 */
export const USE_MOCKS = true;

export const API_BASE_URL = 'https://api.vitazi.ai/v1';

export const MOCK_DELAY_MS = 600; // simulates network latency in mock mode
