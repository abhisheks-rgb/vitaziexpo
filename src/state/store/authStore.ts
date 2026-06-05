import { create } from 'zustand';

import type { AuthSession } from '../../domain/Auth/models/AuthSession';

interface AuthState {
  session: AuthSession | null;
  isFirstLaunch: boolean;
  hasSeenOnboarding: boolean;

  // Actions
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
  setHasSeenOnboarding: () => void;
  setIsFirstLaunch: (value: boolean) => void;
}

/**
 * authStore — client state only (Zustand).
 * React Query handles all server-fetched data; this store holds
 * session tokens and one-time UI flags.
 */
export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  isFirstLaunch: true,
  hasSeenOnboarding: false,

  setSession: (session) => set({ session }),

  clearSession: () => set({ session: null }),

  setHasSeenOnboarding: () => set({ hasSeenOnboarding: true }),

  setIsFirstLaunch: (value) => set({ isFirstLaunch: value }),
}));
