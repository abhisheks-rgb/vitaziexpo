import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CompleteFormScreen from '../screens/Auth/CompleteFormScreen';
import ConnectClinicScreen from '../screens/Auth/ConnectClinicScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import QRScannerScreen from '../screens/Auth/QrScannerScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';

import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="QRScanner"
        component={QRScannerScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="ConnectClinic" component={ConnectClinicScreen} />
      <Stack.Screen name="CompleteForm" component={CompleteFormScreen} />
    </Stack.Navigator>
  );
}
