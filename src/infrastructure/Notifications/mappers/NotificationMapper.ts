import type {
  Notification,
  NotificationType,
} from '../../../domain/Notifications/models/Notification';
import type { NotificationDTO } from '../dtos/NotificationDTO';

export const NotificationMapper = {
  toDomain(dto: NotificationDTO): Notification {
    return {
      id: dto.notification_id,
      userId: dto.user_id,
      type: dto.notification_type as NotificationType,
      title: dto.title,
      body: dto.body,
      isRead: dto.is_read,
      createdAt: dto.created_at,
      appointmentId: dto.appointment_id,
    };
  },
};
