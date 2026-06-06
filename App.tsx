import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppFontAssets } from './src/constants';
import RootNavigator from './src/navigation/RootNavigator';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
});

export default function App() {
  const [fontsLoaded] = useFonts(AppFontAssets);
  const scheme = useColorScheme();

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
