import dotenv from 'dotenv';
import { ExpoConfig } from 'expo/config';

export default (): ExpoConfig => {
  const ENV = process.env.EXPO_PUBLIC_ENV ?? 'mock';

  dotenv.config({
    path: `.env.${ENV}`,
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
