import { IS_MOCK } from '../../../config/env';
import type { ChatMessage, ChatSession, PaginatedResult } from '../../../domain/Chat/models/chat';
import { IChatRepository } from '../../../domain/Chat/repository/IChatRepository';
import { getPaginatedMessages, getPaginatedSessions } from '../../../mockData/MockChat';
import { mockDelay } from '../../../mockData/MockHelpers';
import { apiClient } from '../../api/apiClient';

// ─── Mock ─────────────────────────────────────────────────────────────────────

class ChatRepositoryMock implements IChatRepository {
  async getSessions(cursor: string | null): Promise<PaginatedResult<ChatSession>> {
    await mockDelay();
    return getPaginatedSessions(cursor);
  }

  async getMessages(
    sessionId: string,
    cursor: string | null,
  ): Promise<PaginatedResult<ChatMessage>> {
    await mockDelay();
    return getPaginatedMessages(sessionId, cursor);
  }

  async sendMessage(
    sessionId: string,
    content: string,
    _attachmentIds?: string[],
    _replyToId?: string,
  ): Promise<ChatMessage> {
    await mockDelay(300);
    return {
      id: `msg-mock-${Date.now()}`,
      sessionId,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
      displayTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      displayDate: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      status: 'sending',
      isRead: false,
    };
  }

  async markRead(_sessionId: string, _messageId: string): Promise<void> {
    await mockDelay(100);
  }
}

// ─── Real ─────────────────────────────────────────────────────────────────────

class ChatRepositoryImpl implements IChatRepository {
  async getSessions(cursor: string | null): Promise<PaginatedResult<ChatSession>> {
    const { data } = await apiClient.get('/chat/sessions', {
      params: { cursor, limit: 4 },
    });
    return data as PaginatedResult<ChatSession>;
  }

  async getMessages(
    sessionId: string,
    cursor: string | null,
  ): Promise<PaginatedResult<ChatMessage>> {
    const { data } = await apiClient.get(`/chat/sessions/${sessionId}/messages`, {
      params: { cursor, limit: 4 },
    });
    return data as PaginatedResult<ChatMessage>;
  }

  async sendMessage(
    sessionId: string,
    content: string,
    attachmentIds?: string[],
    replyToId?: string,
  ): Promise<ChatMessage> {
    const { data } = await apiClient.post(`/chat/sessions/${sessionId}/messages`, {
      content,
      attachment_ids: attachmentIds,
      reply_to_id: replyToId,
    });
    return data as ChatMessage;
  }

  async markRead(sessionId: string, messageId: string): Promise<void> {
    await apiClient.post(`/chat/sessions/${sessionId}/messages/${messageId}/read`);
  }
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const chatRepository: IChatRepository = IS_MOCK
  ? new ChatRepositoryMock()
  : new ChatRepositoryImpl();
