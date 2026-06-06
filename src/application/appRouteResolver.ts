import { useAuthStore } from '../state/store/authStore';

export type AppRoute = 'Auth' | 'GeneralHealthQuestions' | 'Onboarding' | 'App';
/**
 * resolveAppRoute
 *
 * Called by SplashScreen. Reads the persisted Zustand store
 * (already hydrated from AsyncStorage by the time Splash runs).
 *
 *   No session                              → Auth (Login)
 *   Session valid + health Qs not done      → GeneralHealthQuestions
 *   Session valid + health Qs done          → App (Home)
 *
 * Session persistence is handled entirely by Zustand + AsyncStorage.
 * authRepository.getStoredSession() is intentionally unused here.
 */

export const resolveAppRoute = (): AppRoute => {
  const { session, currentUser, hasSeenOnboarding } = useAuthStore.getState();

  if (!session || session.expiresAt < Date.now()) {
    return 'Auth';
  }

  if (!currentUser?.hasCompletedHealthQuestions) {
    return 'GeneralHealthQuestions';
  }

  if (!hasSeenOnboarding) {
    return 'Onboarding';
  }

  return 'App';
};
