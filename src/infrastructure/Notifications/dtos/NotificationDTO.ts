export interface NotificationDTO {
  notification_id: string;
  user_id: string;
  notification_type: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
  appointment_id?: string;
}
