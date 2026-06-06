import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import GeneralHealthQuestionsScreen from '../screens/generalHealthQuestions/GeneralHealthQuestionsScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import type { RootStackParamList } from './types';

import { useAuthStore } from '../state/store/authStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const session = useAuthStore((s) => s.session);
  const currentUser = useAuthStore((s) => s.currentUser);
  const hasSeenOnboarding = useAuthStore((s) => s.hasSeenOnboarding);

  // 🔥 1. Wait for hydration
  if (!hasHydrated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
      </Stack.Navigator>
    );
  }

  // 🔥 2. No session → Auth
  if (!session || session.expiresAt < Date.now()) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
      </Stack.Navigator>
    );
  }

  // 🔥 3. Needs health questions
  if (!currentUser?.hasCompletedHealthQuestions) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GeneralHealthQuestions" component={GeneralHealthQuestionsScreen} />
      </Stack.Navigator>
    );
  }

  // 🔥 4. Needs onboarding (device-level)
  if (!hasSeenOnboarding) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding">
          {() => (
            <OnboardingScreen
              onFinish={() => {
                useAuthStore.getState().setOnboardingSeen();
              }}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }

  // 🔥 5. Final App
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
}
