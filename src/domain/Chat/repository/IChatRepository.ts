import type { ChatMessage, ChatSession, PaginatedResult } from '../models/chat';

/**
 * IChatRepository
 *
 * History list + message pagination are REST (cursor-based).
 * sendMessage is REST for reliability + delivery confirmation.
 * markRead is REST; socket fires the 'message_read' event separately.
 * Real-time new messages arrive via socket (SocketIncomingEvent) and are
 * appended to state in the screen layer — not part of this contract.
 */
export interface IChatRepository {
  getSessions(cursor: string | null): Promise<PaginatedResult<ChatSession>>;
  getMessages(sessionId: string, cursor: string | null): Promise<PaginatedResult<ChatMessage>>;
  sendMessage(
    sessionId: string,
    content: string,
    attachmentIds?: string[],
    replyToId?: string,
  ): Promise<ChatMessage>;
  markRead(sessionId: string, messageId: string): Promise<void>;
}
