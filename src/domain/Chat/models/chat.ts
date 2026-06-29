// ─── Attachment ───────────────────────────────────────────────────────────────

export type AttachmentType = 'image' | 'pdf' | 'doc' | 'report';

export interface ChatAttachment {
  id: string;
  type: AttachmentType;
  url: string; // remote URL (or local uri before upload)
  thumbnailUrl?: string; // for image/report types
  fileName: string;
  fileSize?: number; // bytes
}

// ─── Message ─────────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant' | 'doctor';

export type MessageStatus =
  | 'sending' // optimistic — not yet confirmed by server
  | 'sent' // server acknowledged (single tick)
  | 'delivered' // delivered to recipient device (double tick)
  | 'read'; // recipient opened it (double tick, filled/colored)

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: MessageRole;
  content: string;
  attachments?: ChatAttachment[];
  replyTo?: Pick<ChatMessage, 'id' | 'content' | 'role'>; // quoted reply
  timestamp: string; // ISO string
  displayTime: string; // pre-formatted e.g. "9:47 AM"
  displayDate: string; // pre-formatted e.g. "21 January, 2026"
  status: MessageStatus; // only meaningful for role === 'user' | 'doctor'
  isRead: boolean; // from recipient's perspective
}

// ─── Chat Session (used in history list) ─────────────────────────────────────

export type SessionParticipantRole = 'ai' | 'doctor';

export interface ChatSession {
  id: string;
  participantRole: SessionParticipantRole;
  clinicName: string;
  doctorName?: string; // populated when participantRole === 'doctor'
  avatarSource?: string; // remote URL or local require()
  lastMessage: string;
  lastMessageTime: string; // ISO string — for sorting
  lastMessageDisplay: string; // pre-formatted e.g. "9:47 AM" or "Mon"
  lastImageSource?: string; // thumbnail of last image attachment
  unreadCount: number;
  lastMessageStatus: MessageStatus; // for outgoing tick display
  lastMessageRole: MessageRole; // to decide whether to show ticks
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  nextCursor: string | null; // null = no more pages
  total: number;
}

// ─── Socket events ────────────────────────────────────────────────────────────

export type SocketIncomingEvent =
  | { type: 'new_message'; payload: ChatMessage }
  | { type: 'message_delivered'; payload: { messageId: string; sessionId: string } }
  | { type: 'message_read'; payload: { messageId: string; sessionId: string } }
  | { type: 'typing_start'; payload: { sessionId: string } }
  | { type: 'typing_stop'; payload: { sessionId: string } };

export type SocketOutgoingEvent =
  | {
      type: 'send_message';
      payload: {
        sessionId: string;
        content: string;
        attachments?: ChatAttachment[];
        replyToId?: string;
      };
    }
  | { type: 'mark_read'; payload: { sessionId: string; messageId: string } }
  | { type: 'typing_start'; payload: { sessionId: string } }
  | { type: 'typing_stop'; payload: { sessionId: string } };
