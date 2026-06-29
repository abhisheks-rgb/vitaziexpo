import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert } from 'react-native';

import { logoutUseCase } from '../application/useCases/LogoutUseCase';

/**
 * useLogout
 * File location: src/hooks/useLogout.ts
 *
 * Shows a native confirmation alert.
 * On confirm: calls logoutUseCase → clears React Query cache.
 * RootNavigator reacts to session=null automatically — no navigation call needed.
 */
export const useLogout = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const performLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUseCase(); // clears Zustand session + AsyncStorage
      queryClient.clear(); // wipe all cached server data
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: performLogout },
      ],
      { cancelable: true },
    );
  };

  return { logout, isLoading };
};
