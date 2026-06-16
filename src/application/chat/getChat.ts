import type { ChatMessage, ChatSession, PaginatedResult } from '../../domain/Chat/models/chat';
import { chatRepository } from '../../infrastructure/Chat/repository/ChatRepository';

export const getChatSessions = (cursor: string | null): Promise<PaginatedResult<ChatSession>> =>
  chatRepository.getSessions(cursor);

export const getChatMessages = (
  sessionId: string,
  cursor: string | null,
): Promise<PaginatedResult<ChatMessage>> => chatRepository.getMessages(sessionId, cursor);

export const sendChatMessage = (
  sessionId: string,
  content: string,
  attachmentIds?: string[],
  replyToId?: string,
): Promise<ChatMessage> => chatRepository.sendMessage(sessionId, content, attachmentIds, replyToId);

export const markMessageRead = (sessionId: string, messageId: string): Promise<void> =>
  chatRepository.markRead(sessionId, messageId);
