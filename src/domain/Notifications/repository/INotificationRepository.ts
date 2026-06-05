import type { Notification } from '../models/Notification';

/**
 * INotificationRepository
 */
export interface INotificationRepository {
  getAll(userId: string): Promise<Notification[]>;
  markAsRead(notificationId: string): Promise<void>;
  markAllAsRead(userId: string): Promise<void>;
}
