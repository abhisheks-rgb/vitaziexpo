import type { Notification } from '../domain/Notifications/models/Notification';

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    userId: 'user-001',
    type: 'appointment_reminder',
    title: 'Upcoming Retinal Screening',
    body: 'Hi, you have an upcoming retinal screening appointment. Please arrive 10 minutes early and bring your insurance card.',
    isRead: false,
    createdAt: new Date().toISOString(),
    appointmentId: 'appt-001',
  },
  {
    id: 'notif-002',
    userId: 'user-001',
    type: 'result_ready',
    title: 'Your Screening Results Are Ready',
    body: 'Your latest retinal screening results have been reviewed by Dr. Priya Nair. Please log in to view.',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // yesterday
  },
  {
    id: 'notif-003',
    userId: 'user-001',
    type: 'general',
    title: 'Follow-up Recommended',
    body: 'Based on your last visit, a follow-up has been recommended in 6 months. Your appointment has been pre-scheduled.',
    isRead: true,
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
];
