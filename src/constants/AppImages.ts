import aiBottom from '../../assets/images/svg/ai_bottom.svg';
import aiChat from '../../assets/images/svg/ai_chat.svg';
import arrowForward from '../../assets/images/svg/arrow_forward.svg';
import calendar from '../../assets/images/svg/calendar.svg';
import calendarAppt from '../../assets/images/svg/calendar_appt.svg';
import chat from '../../assets/images/svg/chat.svg';
import chatBubbleAi from '../../assets/images/svg/chat_bubble_ai.svg';
import chatSendButton from '../../assets/images/svg/chat_send_button.svg';
import clinic from '../../assets/images/svg/clinic.svg';
import clinicVector from '../../assets/images/svg/clinic_vector.svg';
import doc from '../../assets/images/svg/doc.svg';
import doctorSethoscope from '../../assets/images/svg/doctor_sethoscope.svg';
import haveAccount from '../../assets/images/svg/have_account.svg';
import location from '../../assets/images/svg/location.svg';
import needHelp from '../../assets/images/svg/need_help.svg';
import noAppointments from '../../assets/images/svg/no_appointments.svg';
import noChat from '../../assets/images/svg/no_chat.svg';
import noDoctorChat from '../../assets/images/svg/no_doctor_chat.svg';
import noNotification from '../../assets/images/svg/no_notification.svg';
import noVisits from '../../assets/images/svg/no_visits.svg';
import Notification from '../../assets/images/svg/notification.svg';
import notificationYellow from '../../assets/images/svg/notification_yellow.svg';
import pdf from '../../assets/images/svg/pdf.svg';
import print from '../../assets/images/svg/print.svg';
import report from '../../assets/images/svg/report.svg';
import ScanQRTextIcon from '../../assets/images/svg/scan_qr_text_icon.svg';
import Scanner from '../../assets/images/svg/scanner.svg';
import searchAi from '../../assets/images/svg/search_ai.svg';
import share from '../../assets/images/svg/share.svg';
import visitPlaceholder from '../../assets/images/svg/visit_placeholder.svg';

export const AppImages = {
  //PNG Images
  placeholder: require('../../assets/images/png/image-placeholder.png'),

  logoDark: require('../../assets/images/png/logo-dark.png'),
  logoLight: require('../../assets/images/png/logo-light.png'),

  onboarding1: require('../../assets/images/png/onboarding-1.png'),
  onboarding2: require('../../assets/images/png/onboarding-2.png'),
  onboarding3: require('../../assets/images/png/onboarding-3.png'),
  eyeHero: require('../../assets/images/png/eye-hero.png'),
  retinalImage: require('../../assets/images/png/retinal-image.jpg'),
  avatar: require('../../assets/images/png/avatar.png'),
  doctorAvatar: require('../../assets/images/png/doctor-avatar.png'),
  noUpcomingAppointments: require('../../assets/images/png/no_upcoming_appoinment.png'),
  emptySchedule: require('../../assets/images/png/empty_schedule.png'),

  //SVG Images
  scanQRTextIcon: ScanQRTextIcon,
  scanner: Scanner,
  notification: Notification,
  searchAi: searchAi,
  clinic: clinic,
  aiBottom: aiBottom,
  aiChat: aiChat,
  chat: chat,
  clinicVector: clinicVector,
  calendar: calendar,
  report: report,
  notificationYellow: notificationYellow,
  arrowForward: arrowForward,
  doctorSethoscope: doctorSethoscope,
  location: location,
  calendarAppt: calendarAppt,
  needHelp: needHelp,
  haveAccount: haveAccount,
  visitPlaceholder: visitPlaceholder,
  share: share,
  print: print,
  doc: doc,
  pdf: pdf,
  chatBubbleAi: chatBubbleAi,
  chatSendButton: chatSendButton,
  noVisits: noVisits,
  noChat: noChat,
  noNotification: noNotification,
  noDoctorChat: noDoctorChat,
  noAppointments: noAppointments,
} as const;

export const getLogoByTheme = (isDark: boolean) =>
  isDark ? AppImages.logoDark : AppImages.logoLight;
