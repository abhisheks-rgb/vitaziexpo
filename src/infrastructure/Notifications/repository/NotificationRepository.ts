import { USE_MOCKS } from '../../../config/env';
import type { Notification } from '../../../domain/Notifications/models/Notification';
import type { INotificationRepository } from '../../../domain/Notifications/repository/INotificationRepository';
import { mockDelay } from '../../../mockData/MockHelpers';
import { mockNotifications } from '../../../mockData/MockNotification';
import { apiClient } from '../../api/apiClient';
import { NotificationMapper } from '../mappers/NotificationMapper';

// ── Mock implementation ───────────────────────────────────────────────────────

class NotificationRepositoryMock implements INotificationRepository {
  private notifications: Notification[] = [...mockNotifications];

  async getAll(userId: string): Promise<Notification[]> {
    await mockDelay();
    return this.notifications.filter((n) => n.userId === userId);
  }

  async markAsRead(notificationId: string): Promise<void> {
    await mockDelay(200);
    const idx = this.notifications.findIndex((n) => n.id === notificationId);
    if (idx !== -1) this.notifications[idx].isRead = true;
  }

  async markAllAsRead(userId: string): Promise<void> {
    await mockDelay(300);
    this.notifications = this.notifications.map((n) =>
      n.userId === userId ? { ...n, isRead: true } : n,
    );
  }
}

// ── Real implementation ───────────────────────────────────────────────────────

class NotificationRepositoryImpl implements INotificationRepository {
  async getAll(userId: string): Promise<Notification[]> {
    const { data } = await apiClient.get(`/users/${userId}/notifications`);
    return (data as any[]).map(NotificationMapper.toDomain);
  }

  async markAsRead(notificationId: string): Promise<void> {
    await apiClient.patch(`/notifications/${notificationId}/read`);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await apiClient.post(`/users/${userId}/notifications/read-all`);
  }
}

// ── Export ────────────────────────────────────────────────────────────────────
export const notificationRepository: INotificationRepository = USE_MOCKS
  ? new NotificationRepositoryMock()
  : new NotificationRepositoryImpl();
