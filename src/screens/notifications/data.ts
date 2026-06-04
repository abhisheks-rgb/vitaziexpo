import { AppImages } from '../../constants';

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface NotificationItem {
  id: string;
  message: string;
  time: string;
  bold?: boolean;
}

export interface NotificationGroup {
  label: string;
  items: NotificationItem[];
}

export interface AppointmentDetail {
  notificationId: string;
  title: string;
  body: string;
  doctor: {
    name: string;
    specialty: string;
    avatar?: any;
  };
  dateTime: string;
  location: string;
  address: string;
  type: string;
  daysAway: number;
}

// ─── Mock data ─────────────────────────────────────────────────────────────────

export const notificationGroups: NotificationGroup[] = [
  {
    label: 'Today',
    items: [
      {
        id: '1',
        message:
          'Upcoming retinal screening appointment at Macula & Retina Center on Monday, 9 June 2026 at 10:30 AM.',
        time: '2 mins ago',
        bold: true,
      },
      {
        id: '2',
        message:
          'Your OD (Right) retinal screening report for Eye Care Clinic Center is now available. Tap to view your results.',
        time: '1 hr ago',
      },
    ],
  },
  {
    label: '30 May, 2026',
    items: [
      {
        id: '3',
        message:
          'Follow-up recommended. Your latest screening report shows an increase in bright lesions. Please consult your doctor within 30 days.',
        time: '2 days ago',
      },
      {
        id: '4',
        message:
          'Reminder: Your annual retinal screening is due this month. Book your appointment at a clinic near you.',
        time: '2 days ago',
        bold: true,
      },
    ],
  },
  {
    label: '19 May, 2026',
    items: [
      {
        id: '5',
        message:
          'Your OS (Left) screening report from City Eye Hospital dated 25 Oct 2026 has been AI verified and is ready to view.',
        time: '6 days ago',
      },
    ],
  },
];

export const appointmentDetails: Record<string, AppointmentDetail> = {
  '1': {
    notificationId: '1',
    title: 'Upcoming Retinal Screening Appointment Reminder.',
    body: 'Hi, you have an upcoming retinal screening appointment. Please arrive 10 minutes early and bring your insurance card.',
    doctor: {
      name: 'Dr. Priya Patel',
      specialty: 'Ophthalmologist',
      avatar: AppImages.doctorAvatar,
    },
    dateTime: 'Monday, 9 June 2026  •  12:30 PM',
    location: 'Macula & Retina Center',
    address: '3891 Ranchview, California 62639',
    type: 'Retinal screening — OD & OS',
    daysAway: 11,
  },
};
