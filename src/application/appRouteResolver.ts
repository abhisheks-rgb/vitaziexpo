import { authRepository } from '../infrastructure/Auth/repository/AuthRepository';
import { userRepository } from '../infrastructure/Auth/repository/UserRepository';
import { useAuthStore } from '../state/store/authStore';

export type AppRoute =
  | 'Onboarding' // first ever launch
  | 'Auth' // not logged in
  | 'GeneralHealthQuestions' // logged in but health questions not done
  | 'App'; // fully set up — go to home

/**
 * resolveAppRoute
 *
 * Called once from SplashScreen. Determines the correct initial route
 * based on session validity and user setup state.
 *
 * Decision tree:
 *   1. Never launched before                → Onboarding
 *   2. No stored session / expired          → Auth
 *   3. Session valid, health Qs incomplete  → GeneralHealthQuestions
 *   4. Everything complete                  → App (Home)
 */
export const resolveAppRoute = async (): Promise<AppRoute> => {
  const store = useAuthStore.getState();

  // Step 1 — first launch flag
  if (store.isFirstLaunch || !store.hasSeenOnboarding) {
    return 'Onboarding';
  }

  // Step 2 — check for a stored / valid session
  let session = store.session;

  if (!session) {
    session = await authRepository.getStoredSession();
  }

  if (!session || session.expiresAt < Date.now()) {
    store.clearSession();
    return 'Auth';
  }

  store.setSession(session);

  // Step 3 — check user setup completeness
  try {
    const user = await userRepository.getById(session.userId);

    if (!user.hasCompletedHealthQuestions) {
      return 'GeneralHealthQuestions';
    }

    return 'App';
  } catch {
    // If user fetch fails, fall back to auth to be safe
    store.clearSession();
    return 'Auth';
  }
};
