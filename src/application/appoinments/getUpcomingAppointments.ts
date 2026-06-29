import type { Appointment } from '../../domain/Appointments/models/Appointment';
import { appointmentRepository } from '../../infrastructure/Appointments/repository/AppointmentRepository';

export const getUpcomingAppointments = (userId: string): Promise<Appointment[]> =>
  appointmentRepository.getUpcoming(userId);

export const getPastAppointments = (userId: string): Promise<Appointment[]> =>
  appointmentRepository.getPast(userId);

export const getAppointmentById = (appointmentId: string): Promise<Appointment> =>
  appointmentRepository.getById(appointmentId);
