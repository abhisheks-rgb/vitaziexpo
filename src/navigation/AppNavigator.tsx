import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AIAssistantScreen from '../screens/AIAssistant/AIAssistantScreen';
import AppointmentsScreen from '../screens/Appointments/AppointmentsScreen';
import ChatHistoryScreen from '../screens/ChatHistory/ChatHistoryScreen';
import ClinicListScreen from '../screens/clinics/ClinicListScreen';
import ClinicVisitsScreen from '../screens/clinics/ClinicVisitsScreen';
import MaterialDetailsScreen from '../screens/Education/components/MaterialDetails/MaterialDetailsScreen';
import EducationScreen from '../screens/Education/EducationScreen';
import BottomTabBar from '../screens/home/components/BottomTabBar';
import HomeScreen from '../screens/home/HomeScreen';
import MoreScreen from '../screens/MoreScreen/MoreScreen';

import NotificationDetailScreen from '../screens/notifications/NotificationDetailScreen';
import NotificationsScreen from '../screens/notifications/NotificationScreen';
import type { AppStackParamList, EducationStackParamList, VisitsStackParamList } from './types';

const Tab = createBottomTabNavigator();

const AppStack = createNativeStackNavigator<AppStackParamList>();

const EducationStackNav = createNativeStackNavigator<EducationStackParamList>();

const VisitsStackNav = createNativeStackNavigator<VisitsStackParamList>();

function VisitsStack() {
  return (
    <VisitsStackNav.Navigator screenOptions={{ headerShown: false }}>
      <VisitsStackNav.Screen name="ClinicList" component={ClinicListScreen} />
      <VisitsStackNav.Screen name="ClinicVisits" component={ClinicVisitsScreen} />
      {/* <AppStack.Screen name="ReportDetails" component={ReportDetailsScreen} /> */}
    </VisitsStackNav.Navigator>
  );
}

function EducationStack() {
  return (
    <EducationStackNav.Navigator screenOptions={{ headerShown: false }}>
      <EducationStackNav.Screen name="EducationScreen" component={EducationScreen} />
    </EducationStackNav.Navigator>
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
      {/* <Tab.Screen name="AIAssistant" component={AIAssistantScreen} /> */}
      <Tab.Screen name="Education" component={EducationStack} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Tabs" component={TabNavigator} />
      <AppStack.Screen name="Appointments" component={AppointmentsScreen} />
      <AppStack.Screen name="ChatHistory" component={ChatHistoryScreen} />
      <AppStack.Screen name="MaterialDetails" component={MaterialDetailsScreen} />
      <AppStack.Screen name="Notifications" component={NotificationsScreen} />
      <AppStack.Screen name="NotificationDetail" component={NotificationDetailScreen} />
      <AppStack.Screen
        name="AIAssistant"
        component={AIAssistantScreen}
        options={{
          presentation: 'card',
          animation: 'slide_from_bottom',
        }}
      />
    </AppStack.Navigator>
  );
}
