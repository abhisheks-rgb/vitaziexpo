import Constants from 'expo-constants';
import { z } from 'zod';

console.log('ENV DEBUG:', Constants.expoConfig?.extra);

// ✅ Get env from Expo config
const extra = Constants.expoConfig?.extra ?? {};

// ─── Schema ─────────────────────────────────────────────────────

const EnvSchema = z.object({
  EXPO_PUBLIC_ENV: z.enum(['mock', 'dev', 'prod']),
  EXPO_PUBLIC_API_BASE_URL: z.string().optional(),
  EXPO_PUBLIC_MOCK_DELAY_MS: z.number().optional(),
});

// ─── Parse ──────────────────────────────────────────────────────

const parsed = EnvSchema.safeParse({
  EXPO_PUBLIC_ENV: extra.env,
  EXPO_PUBLIC_API_BASE_URL: extra.apiBaseUrl,
  EXPO_PUBLIC_MOCK_DELAY_MS: extra.mockDelayMs, // ✅ ADD
});

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  throw new Error('Invalid environment variables');
}

// ─── Export ─────────────────────────────────────────────────────

const env = parsed.data;

export const ENV = env.EXPO_PUBLIC_ENV;
export const API_BASE_URL = env.EXPO_PUBLIC_API_BASE_URL ?? 'http://mock.api'; // fallback for mock
export const MOCK_DELAY_MS = parsed.data.EXPO_PUBLIC_MOCK_DELAY_MS ?? 500;

export const IS_MOCK = ENV === 'mock';
export const IS_DEV = ENV === 'dev';
export const IS_PROD = ENV === 'prod';
