import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';

type Screen = 'splash' | 'onboarding' | 'home';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const scheme = useColorScheme();

  return (
    <>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      {screen === 'splash'      && <SplashScreen      onFinish={() => setScreen('onboarding')} />}
      {screen === 'onboarding'  && <OnboardingScreen  onFinish={() => setScreen('home')} />}
      {screen === 'home'        && <HomeScreen />}
    </>
  );
}
