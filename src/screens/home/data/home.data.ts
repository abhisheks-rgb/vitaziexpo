import { AppImages } from '../../../constants';

export const QUICK_ACTIONS = [
  { key: 'visits', label: 'Visits', icon: AppImages.report },
  { key: 'appts', label: 'Appts', icon: AppImages.calendar },
  { key: 'chat', label: 'Chat', icon: AppImages.chat },
  { key: 'ask_ai', label: 'Ask AI', icon: AppImages.aiChat },
] as const;

export const getAppointmentDetails = (t: any) => [
  {
    icon: '🗓',
    label: t('home.dateTime'),
    value: 'Monday, 9 June 2026 • 12:30 PM',
  },
  {
    icon: '📍',
    label: t('home.location'),
    value: '3891 Ranchview, California 62839',
  },
  {
    icon: '⚕️',
    label: t('home.appointmentType'),
    value: 'Retinal screening — OD & OS',
  },
];
