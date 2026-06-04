import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ClinicListScreen from '../screens/clinics/ClinicListScreen';
import ClinicVisitsScreen from '../screens/clinics/ClinicVisitsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import NotificationDetailScreen from '../screens/notifications/NotificationDetailScreen';
import NotificationsScreen from '../screens/notifications/NotificationScreen';

import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
      <Stack.Screen name="ClinicList" component={ClinicListScreen} />
      <Stack.Screen name="ClinicVisits" component={ClinicVisitsScreen} />
    </Stack.Navigator>
  );
}
