/**
 * Domain Model: Appointment
 */
export type AppointmentType = 'Retinal Screening' | 'Follow-up' | 'Consultation';

export interface Appointment {
  id: string;
  userId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarUrl: string;
  dateTime: string; // ISO date string
  location: string;
  address: string;
  type: AppointmentType;
  daysAway: number;
  isConfirmed: boolean;
}
