import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// ─── Root stack ────────────────────────────────────────────────────────────────
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  App: undefined;
};

// ─── Auth stack ────────────────────────────────────────────────────────────────
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  QRScanner: { source: 'register' | 'connectClinic' };
  ConnectClinic: { orgId: string };
  CompleteForm: { orgId: string };
};

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

// ─── App (authenticated) stack ─────────────────────────────────────────────────
export type AppStackParamList = {
  Home: undefined;
  Notifications: undefined;
  NotificationDetail: { notificationId: string };
  ClinicList: undefined;
  ClinicVisits: { clinicId: string };
  GeneralHealthQuestions: undefined;
  ReportDetails: { reportId: string };
};

export type HomeScreenProps = NativeStackScreenProps<AppStackParamList, 'Home'>;
export type NotificationsScreenProps = NativeStackScreenProps<AppStackParamList, 'Notifications'>;
export type NotificationDetailScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'NotificationDetail'
>;
export type ClinicListScreenProps = NativeStackScreenProps<AppStackParamList, 'ClinicList'>;
export type ClinicVisitsScreenProps = NativeStackScreenProps<AppStackParamList, 'ClinicVisits'>;
export type GeneralHealthQuestionsScreenProps = NativeStackScreenProps<
  AppStackParamList,
  'GeneralHealthQuestions'
>;
export type ReportDetailsScreenProps = NativeStackScreenProps<AppStackParamList, 'ReportDetails'>;
