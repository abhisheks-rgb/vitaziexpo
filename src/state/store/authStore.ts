import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AuthSession } from '../../domain/Auth/models/AuthSession';
import type { User } from '../../domain/Auth/models/User';

interface AuthState {
  session: AuthSession | null;
  currentUser: User | null;

  hasHydrated: boolean;
  hasSeenOnboarding: boolean;

  setSession: (session: AuthSession, user: User) => void;
  clearSession: () => void;
  setHealthQuestionsComplete: () => void;

  setHasHydrated: (value: boolean) => void;
  setOnboardingSeen: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      currentUser: null,

      hasHydrated: false,
      hasSeenOnboarding: false,

      setSession: (session, user) => set({ session, currentUser: user }),

      clearSession: () => set({ session: null, currentUser: null }),

      setHealthQuestionsComplete: () =>
        set((state) => ({
          currentUser: state.currentUser
            ? { ...state.currentUser, hasCompletedHealthQuestions: true }
            : null,
        })),

      setHasHydrated: (value) => set({ hasHydrated: value }),

      setOnboardingSeen: () => set({ hasSeenOnboarding: true }),
    }),
    {
      name: 'vitazi-auth',
      storage: createJSONStorage(() => AsyncStorage),

      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            if (__DEV__) {
              console.warn('Auth store rehydration failed', error);
            }
          }
          // ✅ ALWAYS set hydration complete
          state?.setHasHydrated(true);
        };
      },
    },
  ),
);
