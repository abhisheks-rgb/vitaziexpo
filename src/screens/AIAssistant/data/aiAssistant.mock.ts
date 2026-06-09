// File: AIAssistant/data/aiAssistant.mock.ts

import { AppImages } from '../../../constants';
import type {
  ChatMessage,
  ChatSession,
  PhotoOption,
  ReportOption,
} from '../types/aiAssistant.types';

export const INITIAL_MESSAGES_MOCK: ChatMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'What is a red lesion?',
    timestamp: '21 January, 2026',
  },
  {
    id: '2',
    role: 'assistant',
    content:
      'A red lesion is a small red spot or area seen in the retina. It is often related to bleeding or changes in tiny blood vessels and may be associated with certain eye conditions.',
    timestamp: '21 January, 2026',
  },
  {
    id: '3',
    role: 'user',
    content: 'Do you find any red lesion in my report?',
    timestamp: '21 January, 2026',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'According to your report, no red retinal lesions were detected.',
    timestamp: '21 January, 2026',
  },
];

export const SUGGESTED_ACTIONS_MOCK = [
  { id: '1', label: 'Next steps' },
  { id: '2', label: 'Vision health status' },
  { id: '3', label: 'Recommended actions after screening' },
  { id: '4', label: 'Current overall eye condition' },
];

export const REPORT_OPTIONS_MOCK: ReportOption[] = [
  { id: '1', clinicName: 'Macula & Retina Center', date: 'Thursday, 30 Nov 2026' },
  { id: '2', clinicName: 'Macula & Retina Center', date: 'Thursday, 30 Nov 2026' },
  { id: '3', clinicName: 'Macula & Retina Center', date: 'Thursday, 30 Nov 2026' },
  { id: '4', clinicName: 'Macula & Retina Center', date: 'Thursday, 30 Nov 2026' },
  { id: '5', clinicName: 'Macula & Retina Center', date: 'Thursday, 30 Nov 2026' },
  { id: '6', clinicName: 'Macula & Retina Center', date: 'Thursday, 30 Nov 2026' },
];

export const PHOTO_OPTIONS_MOCK: PhotoOption[] = [
  { id: '1', source: AppImages.retinalImage },
  { id: '2', source: AppImages.retinalImage },
  { id: '3', source: AppImages.retinalImage },
  { id: '4', source: AppImages.retinalImage },
  { id: '5', source: AppImages.retinalImage },
  { id: '6', source: AppImages.retinalImage },
];

export const CHAT_HISTORY_MOCK: ChatSession[] = [
  {
    id: '1',
    clinicName: 'Macula & Retina Center',
    date: 'Thursday, 20 November 2026',
    lastMessage: '',
  },
  {
    id: '2',
    clinicName: 'Macula & Retina Center',
    date: 'Thursday, 20 November 2026',
    lastMessage: '',
  },
  {
    id: '3',
    clinicName: 'Macula & Retina Center',
    date: 'Thursday, 20 November 2026',
    lastMessage: '',
  },
  {
    id: '4',
    clinicName: 'Macula & Retina Center',
    date: 'Thursday, 20 November 2026',
    lastMessage: '',
  },
  {
    id: '5',
    clinicName: 'Macula & Retina Center',
    date: 'Thursday, 20 November 2026',
    lastMessage: 'Do you find any red lesion in my report?',
    lastImageSource: AppImages.retinalImage,
  },
];
