import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// ─── Root stack ────────────────────────────────────────────────────────────────
// Splash sits at root so the resolver can replace() to any top-level route.
// GeneralHealthQuestions lives here (not inside AppStack) because it bridges
// Auth → App: the user is authenticated but not fully set up yet.
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  GeneralHealthQuestions: undefined;
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

// GeneralHealthQuestions is in the Root stack (bridges Auth → App)
export type GeneralHealthQuestionsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'GeneralHealthQuestions'
>;
export type ReportDetailsScreenProps = NativeStackScreenProps<AppStackParamList, 'ReportDetails'>;
