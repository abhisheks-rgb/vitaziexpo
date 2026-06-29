import type { ChatMessage, ChatSession, PaginatedResult } from '../domain/Chat/models/chat';

// ─── Chat Sessions (History List) ─────────────────────────────────────────────

export const CHAT_SESSIONS_MOCK: ChatSession[] = [
  {
    id: 'session-1',
    participantRole: 'ai',
    clinicName: 'Macula & Retina Center',
    lastMessage: 'No red retinal lesions were detected in your report.',
    lastMessageTime: '2026-06-16T09:45:00Z',
    lastMessageDisplay: '9:45 AM',
    lastMessageStatus: 'read',
    lastMessageRole: 'assistant',
    unreadCount: 0,
  },
  {
    id: 'session-2',
    participantRole: 'doctor',
    clinicName: 'OptiCore Medical Center',
    doctorName: 'Dr. Sarah Okafor',
    lastMessage: 'Please avoid screens for 48 hours post-procedure.',
    lastMessageTime: '2026-06-15T14:30:00Z',
    lastMessageDisplay: 'Yesterday',
    lastMessageStatus: 'delivered',
    lastMessageRole: 'doctor',
    unreadCount: 3,
  },
  {
    id: 'session-3',
    participantRole: 'ai',
    clinicName: 'Macula & Retina Center',
    lastMessage: 'Your A/V ratio is within the normal range.',
    lastMessageTime: '2026-06-14T11:00:00Z',
    lastMessageDisplay: 'Mon',
    lastMessageStatus: 'read',
    lastMessageRole: 'assistant',
    unreadCount: 0,
  },
  {
    id: 'session-4',
    participantRole: 'doctor',
    clinicName: 'OptiCore Medical Center',
    doctorName: 'Dr. James Kwon',
    lastMessage: 'I have reviewed your latest retinal images.',
    lastMessageTime: '2026-06-13T16:20:00Z',
    lastMessageDisplay: 'Sun',
    lastMessageStatus: 'read',
    lastMessageRole: 'doctor',
    unreadCount: 0,
  },
  {
    id: 'session-5',
    participantRole: 'ai',
    clinicName: 'Vision Health Clinic',
    lastMessage: 'Do you find any red lesion in my report?',
    lastMessageTime: '2026-06-12T08:10:00Z',
    lastMessageDisplay: 'Sat',
    lastImageSource: 'https://example.com/retinal-thumb.jpg',
    lastMessageStatus: 'sent',
    lastMessageRole: 'user',
    unreadCount: 1,
  },
  {
    id: 'session-6',
    participantRole: 'doctor',
    clinicName: 'ClearView Eye Clinic',
    doctorName: 'Dr. Priya Menon',
    lastMessage: 'Attached is your updated prescription.',
    lastMessageTime: '2026-06-10T13:00:00Z',
    lastMessageDisplay: '10 Jun',
    lastMessageStatus: 'read',
    lastMessageRole: 'doctor',
    unreadCount: 0,
  },
  {
    id: 'session-7',
    participantRole: 'ai',
    clinicName: 'Macula & Retina Center',
    lastMessage: 'What does fractal dimension mean?',
    lastMessageTime: '2026-05-30T10:00:00Z',
    lastMessageDisplay: '30 May',
    lastMessageStatus: 'read',
    lastMessageRole: 'user',
    unreadCount: 0,
  },
  {
    id: 'session-8',
    participantRole: 'doctor',
    clinicName: 'OptiCore Medical Center',
    doctorName: 'Dr. Sarah Okafor',
    lastMessage: 'Sending your next appointment confirmation now.',
    lastMessageTime: '2026-05-20T09:00:00Z',
    lastMessageDisplay: '20 May',
    lastMessageStatus: 'delivered',
    lastMessageRole: 'doctor',
    unreadCount: 2,
  },
];

// ─── Messages per Session ─────────────────────────────────────────────────────

export const CHAT_MESSAGES_MOCK: Record<string, ChatMessage[]> = {
  'session-1': [
    {
      id: 'msg-1-1',
      sessionId: 'session-1',
      role: 'user',
      content: 'What is a red lesion?',
      timestamp: '2026-06-16T09:40:00Z',
      displayTime: '9:40 AM',
      displayDate: '16 June, 2026',
      status: 'read',
      isRead: true,
    },
    {
      id: 'msg-1-2',
      sessionId: 'session-1',
      role: 'assistant',
      content:
        'A red lesion is a small red spot or area seen in the retina. It is often related to bleeding or changes in tiny blood vessels and may be associated with certain eye conditions.',
      timestamp: '2026-06-16T09:40:30Z',
      displayTime: '9:40 AM',
      displayDate: '16 June, 2026',
      status: 'delivered',
      isRead: true,
    },
    {
      id: 'msg-1-3',
      sessionId: 'session-1',
      role: 'user',
      content: 'Do you find any red lesion in my report?',
      attachments: [
        {
          id: 'att-1',
          type: 'report',
          url: 'https://example.com/report-jan-2026.pdf',
          fileName: 'Retinal-Report-Jan-2026.pdf',
          fileSize: 204800,
        },
      ],
      timestamp: '2026-06-16T09:42:00Z',
      displayTime: '9:42 AM',
      displayDate: '16 June, 2026',
      status: 'read',
      isRead: true,
    },
    {
      id: 'msg-1-4',
      sessionId: 'session-1',
      role: 'assistant',
      content: 'According to your report, no red retinal lesions were detected.',
      timestamp: '2026-06-16T09:42:15Z',
      displayTime: '9:42 AM',
      displayDate: '16 June, 2026',
      status: 'delivered',
      isRead: true,
    },
    {
      id: 'msg-1-5',
      sessionId: 'session-1',
      role: 'user',
      content: 'What about my A/V ratio?',
      timestamp: '2026-06-16T09:44:00Z',
      displayTime: '9:44 AM',
      displayDate: '16 June, 2026',
      status: 'read',
      isRead: true,
    },
    {
      id: 'msg-1-6',
      sessionId: 'session-1',
      role: 'assistant',
      content:
        'Your A/V (Arteriovenous) ratio is 0.68, which is within the normal range of 0.67–0.75. No signs of hypertensive retinopathy were noted.',
      timestamp: '2026-06-16T09:44:30Z',
      displayTime: '9:44 AM',
      displayDate: '16 June, 2026',
      status: 'delivered',
      isRead: true,
    },
    {
      id: 'msg-1-7',
      sessionId: 'session-1',
      role: 'user',
      content: 'Should I be concerned about anything?',
      timestamp: '2026-06-16T09:45:00Z',
      displayTime: '9:45 AM',
      displayDate: '16 June, 2026',
      status: 'read',
      isRead: false,
    },
    {
      id: 'msg-1-8',
      sessionId: 'session-1',
      role: 'assistant',
      content:
        'No immediate concerns were flagged. However, I recommend scheduling your next retinal scan in 6 months to monitor any changes. Early detection is key.',
      timestamp: '2026-06-16T09:45:20Z',
      displayTime: '9:45 AM',
      displayDate: '16 June, 2026',
      status: 'delivered',
      isRead: false,
    },
  ],

  'session-2': [
    {
      id: 'msg-2-1',
      sessionId: 'session-2',
      role: 'doctor',
      content: 'Hello! I have reviewed your latest retinal scan from yesterday.',
      timestamp: '2026-06-15T14:00:00Z',
      displayTime: '2:00 PM',
      displayDate: '15 June, 2026',
      status: 'delivered',
      isRead: false,
    },
    {
      id: 'msg-2-2',
      sessionId: 'session-2',
      role: 'user',
      content: 'Thank you, Doctor. Is everything okay?',
      timestamp: '2026-06-15T14:10:00Z',
      displayTime: '2:10 PM',
      displayDate: '15 June, 2026',
      status: 'read',
      isRead: true,
    },
    {
      id: 'msg-2-3',
      sessionId: 'session-2',
      role: 'doctor',
      content:
        'There is a minor sign of early diabetic retinopathy. Nothing alarming at this stage, but we need to monitor it closely.',
      attachments: [
        {
          id: 'att-2',
          type: 'image',
          url: 'https://example.com/retinal-scan-june.jpg',
          thumbnailUrl: 'https://example.com/retinal-scan-june-thumb.jpg',
          fileName: 'retinal-scan-june.jpg',
        },
      ],
      timestamp: '2026-06-15T14:15:00Z',
      displayTime: '2:15 PM',
      displayDate: '15 June, 2026',
      status: 'delivered',
      isRead: false,
    },
    {
      id: 'msg-2-4',
      sessionId: 'session-2',
      role: 'user',
      content: 'What should I do next?',
      replyTo: {
        id: 'msg-2-3',
        content: 'There is a minor sign of early diabetic retinopathy...',
        role: 'doctor',
      },
      timestamp: '2026-06-15T14:20:00Z',
      displayTime: '2:20 PM',
      displayDate: '15 June, 2026',
      status: 'delivered',
      isRead: true,
    },
    {
      id: 'msg-2-5',
      sessionId: 'session-2',
      role: 'doctor',
      content:
        'Please avoid screens for 48 hours post-procedure. I have also attached a care guide for you.',
      attachments: [
        {
          id: 'att-3',
          type: 'pdf',
          url: 'https://example.com/care-guide.pdf',
          fileName: 'Post-Procedure-Care-Guide.pdf',
          fileSize: 512000,
        },
      ],
      timestamp: '2026-06-15T14:30:00Z',
      displayTime: '2:30 PM',
      displayDate: '15 June, 2026',
      status: 'delivered',
      isRead: false,
    },
  ],
};

// ─── Paginated helpers ─────────────────────────────────────────────────────────

const PAGE_SIZE = 4;

export const getPaginatedSessions = (cursor: string | null): PaginatedResult<ChatSession> => {
  const all = CHAT_SESSIONS_MOCK;
  const startIndex = cursor ? all.findIndex((s) => s.id === cursor) + 1 : 0;
  const page = all.slice(startIndex, startIndex + PAGE_SIZE);
  const lastItem = page[page.length - 1];
  const nextCursor = startIndex + PAGE_SIZE < all.length ? (lastItem?.id ?? null) : null;

  return { data: page, nextCursor, total: all.length };
};

export const getPaginatedMessages = (
  sessionId: string,
  cursor: string | null,
): PaginatedResult<ChatMessage> => {
  const all = (CHAT_MESSAGES_MOCK[sessionId] ?? []).slice().reverse(); // newest-first for cursor
  const startIndex = cursor ? all.findIndex((m) => m.id === cursor) + 1 : 0;
  const page = all.slice(startIndex, startIndex + PAGE_SIZE).reverse(); // back to oldest-first for display
  const lastItem = all[startIndex + PAGE_SIZE - 1];
  const nextCursor = startIndex + PAGE_SIZE < all.length ? (lastItem?.id ?? null) : null;

  return { data: page, nextCursor, total: all.length };
};
