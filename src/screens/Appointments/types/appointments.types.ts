// File: Appointments/types/appointments.types.ts

export type AppointmentTab = 'Upcoming' | 'Past';

export type AppointmentStatus =
  | { kind: 'reminder'; daysUntil: number }
  | { kind: 'report_ready' }
  | { kind: 'none' };

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatarSource: any;
}

export interface Clinic {
  name: string;
  address: string;
}

export interface Appointment {
  id: string;
  doctor: Doctor;
  clinic: Clinic;
  dateTime: string; // ISO string
  displayDate: string; // e.g. "Monday, 9 June 2026"
  displayTime: string; // e.g. "12:30 PM"
  appointmentType: string; // e.g. "Retinal screening — OD & OS"
  status: AppointmentStatus;
  prepInstructions: string[];
}
