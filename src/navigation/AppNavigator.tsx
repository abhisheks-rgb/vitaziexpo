import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatHistoryScreen from '../screens/AIAssistant/components/ChatHistory/ChatHistoryScreen';
import AppointmentsScreen from '../screens/Appointments/AppointmentsScreen';
import ClinicListScreen from '../screens/clinics/ClinicListScreen';
import ClinicVisitsScreen from '../screens/clinics/ClinicVisitsScreen';
import EducationScreen from '../screens/Education/EducationScreen';
import HomeScreen from '../screens/home/HomeScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AIAssistantScreen from '../screens/AIAssistant/AIAssistantScreen';
import BottomTabBar from '../screens/home/components/BottomTabBar';
import MoreScreen from '../screens/MoreScreen/MoreScreen';
import type { AppStackParamList } from './types';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<AppStackParamList>();

/**
 * AppNavigator — authenticated screens only.
 * GeneralHealthQuestions has been moved to the Root stack since it's a
 * one-time post-registration bridge, not a recurring in-app screen.
 */

// Visits has its own nested stack so ClinicVisits can push on top
function VisitsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClinicList" component={ClinicListScreen} />
      <Stack.Screen name="ClinicVisits" component={ClinicVisitsScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Visits" component={VisitsStack} />
      <Tab.Screen name="AIAssistant" component={AIAssistantScreen} />
      <Tab.Screen name="Education" component={EducationScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

// Root stack holds the tabs + any screens that should appear OVER the tab bar
export function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Appointments" component={AppointmentsScreen} />
      <Stack.Screen name="ChatHistory" component={ChatHistoryScreen} />
    </Stack.Navigator>
  );
}
