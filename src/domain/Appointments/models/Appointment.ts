// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface AppointmentDoctor {
  id: string;
  name: string;
  specialty: string;
  avatarSource: string;
}

export interface AppointmentClinic {
  name: string;
  address: string;
}

export type AppointmentStatus = { kind: 'reminder'; daysUntil: number } | { kind: 'report_ready' };

// ─── Domain model ─────────────────────────────────────────────────────────────

export interface Appointment {
  id: string;
  doctor: AppointmentDoctor;
  clinic: AppointmentClinic;
  dateTime: string; // ISO date string — use for sorting / logic
  displayDate: string; // pre-formatted, e.g. "Monday, 9 June 2026"
  displayTime: string; // pre-formatted, e.g. "12:30 PM"
  appointmentType: string;
  status: AppointmentStatus;
  prepInstructions: string[];
}
