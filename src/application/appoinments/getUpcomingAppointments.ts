import { appointmentRepository } from '../../infrastructure/Appointments/repository/AppointmentRepository';

export const getUpcomingAppointments = (userId: string) =>
  appointmentRepository.getUpcoming(userId);
