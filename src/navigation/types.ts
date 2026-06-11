import type { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { EducationMaterial } from '../screens/Education/types/education.types';

// ─────────────────────────────────────────────────────────────
// Root Stack
// ─────────────────────────────────────────────────────────────

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  GeneralHealthQuestions: undefined;
  App: undefined;
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
// Tab Param List
// ─────────────────────────────────────────────────────────────

export type TabParamList = {
  Home: undefined;
  Visits: undefined;
  AIAssistant: undefined;
  Education: undefined;
  More: undefined;
};

// ─────────────────────────────────────────────────────────────
// App Stack (Screens above Bottom Tabs)
// ─────────────────────────────────────────────────────────────

export type AppStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList> | undefined;

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
  AIAssistant: undefined;
};

// ─────────────────────────────────────────────────────────────
// Education Stack
// ─────────────────────────────────────────────────────────────

export type EducationStackParamList = {
  EducationScreen: undefined;
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
// Screen Props
// ─────────────────────────────────────────────────────────────

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

export type GeneralHealthQuestionsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GeneralHealthQuestions'
>;

export type EducationScreenProps = NativeStackScreenProps<
  EducationStackParamList,
  'EducationScreen'
>;

export type ClinicListScreenProps = NativeStackScreenProps<VisitsStackParamList, 'ClinicList'>;

export type ClinicVisitsScreenProps = NativeStackScreenProps<VisitsStackParamList, 'ClinicVisits'>;

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
