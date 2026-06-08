import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ClinicListScreen from '../screens/clinics/ClinicListScreen';
import ClinicVisitsScreen from '../screens/clinics/ClinicVisitsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import NotificationDetailScreen from '../screens/notifications/NotificationDetailScreen';
import NotificationsScreen from '../screens/notifications/NotificationScreen';

import AppointmentsScreen from '../screens/Appointments/AppointmentsScreen';
import EducationScreen from '../screens/Education/EducationScreen';
import ReportDetailsScreen from '../screens/ReportDetails/ReportDetailsScreen';
import type { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

/**
 * AppNavigator — authenticated screens only.
 * GeneralHealthQuestions has been moved to the Root stack since it's a
 * one-time post-registration bridge, not a recurring in-app screen.
 */
export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
      <Stack.Screen name="ClinicList" component={ClinicListScreen} />
      <Stack.Screen name="ClinicVisits" component={ClinicVisitsScreen} />
      <Stack.Screen name="ReportDetails" component={ReportDetailsScreen} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="Education" component={EducationScreen} />
    </Stack.Navigator>
  );
}
