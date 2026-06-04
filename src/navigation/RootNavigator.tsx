import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

// These screens use onFinish — we bridge via the children render prop
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import SplashScreen from '../screens/SplashScreen';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'fade' }}
    >
      {/* Bridge onFinish-based screens via children render prop */}
      <Stack.Screen name="Splash">
        {({ navigation }: SplashProps) => (
          <SplashScreen onFinish={() => navigation.replace('Onboarding')} />
        )}
      </Stack.Screen>

      <Stack.Screen name="Onboarding">
        {({ navigation }: OnboardingProps) => (
          <OnboardingScreen onFinish={() => navigation.replace('Auth')} />
        )}
      </Stack.Screen>

      {/* Standard navigator screens */}
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  );
}
