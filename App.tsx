import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/Onboarding/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';

import { AppFontAssets } from './src/constants';

type Screen = 'splash' | 'onboarding' | 'home';

export default function App() {
  const [fontsLoaded] = useFonts(AppFontAssets);
  const [screen, setScreen] = useState<Screen>('splash');

  const scheme = useColorScheme();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        style={scheme === 'dark' ? 'light' : 'dark'}
      />

      {screen === 'splash' && (
        <SplashScreen
          onFinish={() =>
            setScreen('onboarding')
          }
        />
      )}

      {screen === 'onboarding' && (
        <OnboardingScreen
          onFinish={() =>
            setScreen('home')
          }
        />
      )}

      {screen === 'home' && <HomeScreen />}
    </SafeAreaProvider>
  );
}