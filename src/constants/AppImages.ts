import ScanQRTextIcon from '../../assets/images/svg/scan_qr_text_icon.svg';
import Scanner from '../../assets/images/svg/scanner.svg';
import Notification from '../../assets/images/svg/notification.svg';
import searchAi from '../../assets/images/svg/search_ai.svg';
import clinic from '../../assets/images/svg/clinic.svg';
import aiBottom from '../../assets/images/svg/ai_bottom.svg';
import aiChat from '../../assets/images/svg/ai_chat.svg';
import chat from '../../assets/images/svg/chat.svg';
import clinicVector from '../../assets/images/svg/clinic_vector.svg';
import calendar from '../../assets/images/svg/calendar.svg';
import report from '../../assets/images/svg/report.svg';

export const AppImages = {
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

} as const;