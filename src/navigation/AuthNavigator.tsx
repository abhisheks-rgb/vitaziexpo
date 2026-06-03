import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AuthStackParamList } from './types';
import LoginScreen       from '../screens/auth/LoginScreen';
import RegisterScreen    from '../screens/auth/RegisterScreen';
import QRScannerScreen   from '../screens/auth/QrScannerScreen';
import ConnectClinicScreen from '../screens/auth/ConnectClinicScreen';
import CompleteFormScreen from '../screens/auth/CompleteFormScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login"         component={LoginScreen} />
      <Stack.Screen name="Register"      component={RegisterScreen} />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="ConnectClinic" component={ConnectClinicScreen} />
      <Stack.Screen name="CompleteForm"  component={CompleteFormScreen} />
    </Stack.Navigator>
  );
}