import { AppImages } from '../../../constants';
import type { Appointment } from '../../../domain/Appointments/models/Appointment';

export class AppointmentMapper {
  static toDomain(raw: any): Appointment {
    const d = new Date(raw.date_time ?? raw.dateTime);

    const displayDate = d.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const displayTime = d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    return {
      id: String(raw.id),
      doctor: {
        id: String(raw.doctor?.id ?? raw.doctor_id ?? ''),
        name: raw.doctor?.name ?? raw.doctor_name ?? '',
        specialty: raw.doctor?.specialty ?? raw.doctor_specialty ?? '',
        avatarSource: raw.doctor?.avatar_url
          ? { uri: raw.doctor.avatar_url }
          : AppImages.doctorAvatar,
      },
      clinic: {
        name: raw.clinic?.name ?? raw.clinic_name ?? '',
        address: raw.clinic?.address ?? raw.clinic_address ?? '',
      },
      dateTime: raw.date_time ?? raw.dateTime ?? '',
      displayDate,
      displayTime,
      appointmentType: raw.appointment_type ?? raw.appointmentType ?? '',
      status: raw.status ?? { kind: 'reminder', daysUntil: 0 },
      prepInstructions: raw.prep_instructions ?? raw.prepInstructions ?? [],
    };
  }
}
