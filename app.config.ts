import dotenv from 'dotenv';
import { ExpoConfig } from 'expo/config';

export default (): ExpoConfig => {
  const ENV = process.env.EXPO_PUBLIC_ENV ?? 'mock';

  // 👇 THIS LINE FIXES EVERYTHING
  dotenv.config({
    path: `.env.${ENV}`,
  });

  return {
    name: 'Vitazi',
    slug: 'vitaziexpo',

    extra: {
      env: ENV,
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
    },
  };
};
