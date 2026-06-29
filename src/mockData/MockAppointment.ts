// File: mockData/appointments.mock.ts

import { AppImages } from '../constants';
import type { Appointment } from '../domain/Appointments/models/Appointment';

export const APPOINTMENTS_MOCK: Appointment[] = [
  {
    id: '1',
    doctor: {
      id: 'd1',
      name: 'Dr. Priya Patel',
      specialty: 'Ophthalmologist',
      avatarSource: AppImages.doctorAvatar, // ← real asset, not ''
    },
    clinic: {
      name: 'Macula & Retina Center',
      address: '3891 Ranchview, California 62639',
    },
    dateTime: '2026-06-09T12:30:00',
    displayDate: 'Monday, 9 June 2026',
    displayTime: '12:30 PM',
    appointmentType: 'Retinal screening — OD & OS',
    status: { kind: 'reminder', daysUntil: 1 },
    prepInstructions: [
      'Avoid wearing contact lenses on the day of your screening. Bring your spectacles if you use them.',
      'Your pupils may be dilated during the exam. Arrange transport home — do not drive immediately after.',
      'Bring your insurance card and a valid photo ID. Arrive at least 10 minutes before your appointment time.',
      'If you have diabetes, take your regular medication and eat a light meal before the visit.',
    ],
  },
  {
    id: '2',
    doctor: {
      id: 'd2',
      name: 'Dr. Sachreet K. Sidhu',
      specialty: 'Ophthalmologist & Eye Squint Surgeon',
      avatarSource: AppImages.doctorAvatar,
    },
    clinic: {
      name: 'Neo Eye9 Hospital & Retina Centre',
      address: '6391 Elgin St. Celina, Delaware 10299',
    },
    dateTime: '2026-06-10T10:00:00',
    displayDate: 'Tuesday, 10 June 2026',
    displayTime: '10:00 AM',
    appointmentType: 'Comprehensive Eye Exam',
    status: { kind: 'reminder', daysUntil: 2 },
    prepInstructions: [
      'Avoid wearing contact lenses on the day of your screening. Bring your spectacles if you use them.',
      'Your pupils may be dilated during the exam. Arrange transport home — do not drive immediately after.',
      'Bring your insurance card and a valid photo ID. Arrive at least 10 minutes before your appointment time.',
      'If you have diabetes, take your regular medication and eat a light meal before the visit.',
    ],
  },
  {
    id: '3',
    doctor: {
      id: 'd3',
      name: 'Dr. Ravinder K. Malhi',
      specialty: 'Ophthalmologist (MS, Ophthalmology)',
      avatarSource: AppImages.retinalImage,
    },
    clinic: {
      name: 'Kaddon Eye Care Centre',
      address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    },
    dateTime: '2026-06-18T09:00:00',
    displayDate: 'Wednesday, 18 June 2026',
    displayTime: '9:00 AM',
    appointmentType: 'Glaucoma Screening',
    status: { kind: 'reminder', daysUntil: 10 },
    prepInstructions: [
      'Avoid wearing contact lenses on the day of your screening. Bring your spectacles if you use them.',
      'Your pupils may be dilated during the exam. Arrange transport home — do not drive immediately after.',
      'Bring your insurance card and a valid photo ID. Arrive at least 10 minutes before your appointment time.',
    ],
  },
];

export const PAST_APPOINTMENTS_MOCK: Appointment[] = [
  {
    id: '4',
    doctor: {
      id: 'd2',
      name: 'Dr. Sachreet K. Sidhu',
      specialty: 'Ophthalmologist & Eye Squint Surgeon',
      avatarSource: AppImages.retinalImage,
    },
    clinic: {
      name: 'Neo Eye9 Hospital & Retina Centre',
      address: '6391 Elgin St. Celina, Delaware 10299',
    },
    dateTime: '2026-05-20T12:30:00',
    displayDate: 'Tuesday, 20 May 2026',
    displayTime: '12:30 PM',
    appointmentType: 'Retinal screening — OD & OS',
    status: { kind: 'report_ready' },
    prepInstructions: [],
  },
  {
    id: '5',
    doctor: {
      id: 'd1',
      name: 'Dr. Priya Patel',
      specialty: 'Ophthalmologist',
      avatarSource: AppImages.retinalImage,
    },
    clinic: {
      name: 'Macula & Retina Center',
      address: '3891 Ranchview, California 62639',
    },
    dateTime: '2026-04-15T10:00:00',
    displayDate: 'Wednesday, 15 April 2026',
    displayTime: '10:00 AM',
    appointmentType: 'Follow-up Exam',
    status: { kind: 'report_ready' },
    prepInstructions: [],
  },
  {
    id: '6',
    doctor: {
      id: 'd3',
      name: 'Dr. Ravinder K. Malhi',
      specialty: 'Ophthalmologist (MS, Ophthalmology)',
      avatarSource: AppImages.retinalImage,
    },
    clinic: {
      name: 'Kaddon Eye Care Centre',
      address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    },
    dateTime: '2026-03-10T09:00:00',
    displayDate: 'Monday, 10 March 2026',
    displayTime: '9:00 AM',
    appointmentType: 'Glaucoma Screening',
    status: { kind: 'report_ready' },
    prepInstructions: [],
  },
];
