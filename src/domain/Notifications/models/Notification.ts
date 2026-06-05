/**
 * Domain Model: Notification
 */
export type NotificationType = 'appointment_reminder' | 'result_ready' | 'general';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  isRead: boolean;
  createdAt: string; // ISO date string
  appointmentId?: string;
}
