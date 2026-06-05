import type { Appointment, AppointmentType } from '../../../domain/Appointments/models/Appointment';
import type { AppointmentDTO } from '../dtos/AppointmentDTO';

export const AppointmentMapper = {
  toDomain(dto: AppointmentDTO): Appointment {
    return {
      id: dto.appointment_id,
      userId: dto.user_id,
      doctorName: dto.doctor.name,
      doctorSpecialty: dto.doctor.specialty,
      doctorAvatarUrl: dto.doctor.avatar_url,
      dateTime: dto.date_time,
      location: dto.location_name,
      address: dto.location_address,
      type: dto.appointment_type as AppointmentType,
      daysAway: dto.days_away,
      isConfirmed: dto.is_confirmed,
    };
  },
};
