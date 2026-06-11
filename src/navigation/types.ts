import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { EducationMaterial } from '../screens/Education/types/education.types';

// ─────────────────────────────────────────────────────────────
// Root Stack
// ─────────────────────────────────────────────────────────────

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;

  Auth: NavigatorScreenParams<AuthStackParamList>;
  GeneralHealthQuestions: undefined;

  App: NavigatorScreenParams<AppStackParamList>;
};

// ─────────────────────────────────────────────────────────────
// Auth Stack
// ─────────────────────────────────────────────────────────────

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;

  QRScanner: { source: 'register' | 'connectClinic' };
  ConnectClinic: { orgId: string };
  CompleteForm: { orgId: string };
};

// ─────────────────────────────────────────────────────────────
// Visits Stack
// ─────────────────────────────────────────────────────────────

export type VisitsStackParamList = {
  ClinicList: undefined;
  ClinicVisits: {
    clinicId: string;
  };
};

// ─────────────────────────────────────────────────────────────
// Education Stack
// ─────────────────────────────────────────────────────────────

export type EducationStackParamList = {
  EducationScreen: undefined;
};

// ─────────────────────────────────────────────────────────────
// Bottom Tabs
// ─────────────────────────────────────────────────────────────

export type TabParamList = {
  Home: undefined;

  // ✅ Proper nested typing
  Visits: NavigatorScreenParams<VisitsStackParamList>;

  Education: undefined;
  More: undefined;
};

// ─────────────────────────────────────────────────────────────
// App Stack (Above Tabs)
// ─────────────────────────────────────────────────────────────

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;

  Appointments: undefined;
  ChatHistory: undefined;

  MaterialDetails: {
    material: EducationMaterial;
  };

  Notifications: undefined;
  NotificationDetail: {
    notificationId: string;
  };

  ReportDetails: {
    reportId: string;
  };

  // ✅ SINGLE SOURCE OF TRUTH (matches navigator)
  AIAssistant: {
    chatId?: string;
  };
};

// ─────────────────────────────────────────────────────────────
// Screen Props
// ─────────────────────────────────────────────────────────────

// Auth Screens
export type LoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RegisterScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Register'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type QRScannerScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'QRScanner'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ConnectClinicScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'ConnectClinic'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type CompleteFormScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'CompleteForm'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Root Screens
export type GeneralHealthQuestionsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GeneralHealthQuestions'
>;

// Home (Tab + App Stack)
export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<AppStackParamList>
>;

// Visits Screens
export type ClinicListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<VisitsStackParamList, 'ClinicList'>,
  NativeStackScreenProps<AppStackParamList>
>;

export type ClinicVisitsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<VisitsStackParamList, 'ClinicVisits'>,
  NativeStackScreenProps<AppStackParamList>
>;

// Education
export type EducationScreenProps = NativeStackScreenProps<
  EducationStackParamList,
  'EducationScreen'
>;

// App Stack Screens
export type MaterialDetailsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'MaterialDetails'
>;

export type AppointmentsScreenProps = NativeStackScreenProps<AppStackParamList, 'Appointments'>;

export type ChatHistoryScreenProps = NativeStackScreenProps<AppStackParamList, 'ChatHistory'>;

export type NotificationsScreenProps = NativeStackScreenProps<AppStackParamList, 'Notifications'>;

export type NotificationDetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'NotificationDetail'
>;
