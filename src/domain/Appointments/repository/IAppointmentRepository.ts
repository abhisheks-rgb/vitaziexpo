import type { Appointment } from '../models/Appointment';

/**
 * IAppointmentRepository
 */
export interface IAppointmentRepository {
  getUpcoming(userId: string): Promise<Appointment[]>;
  getById(appointmentId: string): Promise<Appointment>;
  confirm(appointmentId: string): Promise<Appointment>;
  reschedule(appointmentId: string, newDateTime: string): Promise<Appointment>;
}
