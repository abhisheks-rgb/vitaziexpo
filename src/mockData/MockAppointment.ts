import type { Appointment } from '../domain/Appointments/models/Appointment';

export const mockAppointments: Appointment[] = [
  {
    id: 'appt-001',
    userId: 'user-001',
    doctorName: 'Dr. Priya Nair',
    doctorSpecialty: 'Retinal Specialist',
    doctorAvatarUrl: '',
    dateTime: '2026-06-18T10:30:00.000Z',
    location: 'Vitazi Eye Clinic — Downtown',
    address: '42 Vision Park, Suite 3B, New York, NY 10001',
    type: 'Retinal Screening',
    daysAway: 13,
    isConfirmed: false,
  },
  {
    id: 'appt-002',
    userId: 'user-001',
    doctorName: 'Dr. Arjun Mehta',
    doctorSpecialty: 'Ophthalmologist',
    doctorAvatarUrl: '',
    dateTime: '2026-07-05T14:00:00.000Z',
    location: 'Vitazi Eye Clinic — Midtown',
    address: '150 Park Avenue, Floor 2, New York, NY 10017',
    type: 'Follow-up',
    daysAway: 30,
    isConfirmed: true,
  },
];
