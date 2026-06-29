import dotenv from 'dotenv';
import type { ExpoConfig } from 'expo/config';

// Load default .env first
dotenv.config();

export default (): ExpoConfig => {
  const ENV = process.env.EXPO_PUBLIC_ENV ?? 'mock';

  // Then load environment-specific file
  dotenv.config({
    path: `.env.${ENV}`,
    override: true,
  });

  return {
    name: 'Vitazi',
    slug: 'vitaziexpo',

    extra: {
      env: ENV,
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
      mockDelayMs: Number(process.env.EXPO_PUBLIC_MOCK_DELAY_MS) || 0,
    },
  };
};
