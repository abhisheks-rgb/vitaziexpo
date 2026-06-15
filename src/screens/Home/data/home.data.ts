import { AppImages } from '../../../constants';

export const QUICK_ACTIONS = [
  { key: 'visits', label: 'Visits', icon: AppImages.report },
  { key: 'appts', label: 'Appts', icon: AppImages.calendar },
  { key: 'chat', label: 'Chat', icon: AppImages.chat },
  { key: 'ask_ai', label: 'Ask AI', icon: AppImages.aiChat },
] as const;
