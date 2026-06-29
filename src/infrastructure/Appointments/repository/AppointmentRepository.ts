import { IS_MOCK } from '../../../config/env';
import type { Appointment } from '../../../domain/Appointments/models/Appointment';
import type { IAppointmentRepository } from '../../../domain/Appointments/repository/IAppointmentRepository';
import { APPOINTMENTS_MOCK, PAST_APPOINTMENTS_MOCK } from '../../../mockData/MockAppointment';
import { mockDelay } from '../../../mockData/MockHelpers';
import { apiClient } from '../../api/apiClient';
import { AppointmentMapper } from '../mappers/AppointmentMapper';

// ── Mock implementation ───────────────────────────────────────────────────────

class AppointmentRepositoryMock implements IAppointmentRepository {
  private appointments: Appointment[] = [...APPOINTMENTS_MOCK, ...PAST_APPOINTMENTS_MOCK];

  async getUpcoming(_userId: string): Promise<Appointment[]> {
    await mockDelay();
    return APPOINTMENTS_MOCK;
  }

  async getPast(_userId: string): Promise<Appointment[]> {
    await mockDelay();
    return PAST_APPOINTMENTS_MOCK;
  }

  async getById(appointmentId: string): Promise<Appointment> {
    await mockDelay();
    const all = [...APPOINTMENTS_MOCK, ...PAST_APPOINTMENTS_MOCK];
    const appt = all.find((a) => a.id === appointmentId);
    if (!appt) {throw new Error(`Mock: appointment ${appointmentId} not found`);}
    return appt;
  }

  async confirm(appointmentId: string): Promise<Appointment> {
    await mockDelay();
    const idx = this.appointments.findIndex((a) => a.id === appointmentId);
    if (idx === -1) {
      throw new Error(`Mock: appointment ${appointmentId} not found`);
    }
    // this.appointments[idx] = { ...this.appointments[idx], isConfirmed: true };
    return { ...this.appointments[idx] };
  }

  async reschedule(appointmentId: string, newDateTime: string): Promise<Appointment> {
    await mockDelay();
    const idx = this.appointments.findIndex((a) => a.id === appointmentId);
    if (idx === -1) {
      throw new Error(`Mock: appointment ${appointmentId} not found`);
    }
    this.appointments[idx] = { ...this.appointments[idx], dateTime: newDateTime };
    return { ...this.appointments[idx] };
  }
}

// ── Real implementation ───────────────────────────────────────────────────────

class AppointmentRepositoryImpl implements IAppointmentRepository {
  async getUpcoming(userId: string): Promise<Appointment[]> {
    const { data } = await apiClient.get(`/users/${userId}/appointments/upcoming`);
    return (data as any[]).map(AppointmentMapper.toDomain);
  }

  async getPast(userId: string): Promise<Appointment[]> {
    const { data } = await apiClient.get(`/users/${userId}/appointments/past`);
    return (data as any[]).map(AppointmentMapper.toDomain);
  }

  async getById(appointmentId: string): Promise<Appointment> {
    const { data } = await apiClient.get(`/appointments/${appointmentId}`);
    return AppointmentMapper.toDomain(data);
  }

  async confirm(appointmentId: string): Promise<Appointment> {
    const { data } = await apiClient.post(`/appointments/${appointmentId}/confirm`);
    return AppointmentMapper.toDomain(data);
  }

  async reschedule(appointmentId: string, newDateTime: string): Promise<Appointment> {
    const { data } = await apiClient.post(`/appointments/${appointmentId}/reschedule`, {
      new_date_time: newDateTime,
    });
    return AppointmentMapper.toDomain(data);
  }
}

// ── Export ────────────────────────────────────────────────────────────────────
export const appointmentRepository: IAppointmentRepository = IS_MOCK
  ? new AppointmentRepositoryMock()
  : new AppointmentRepositoryImpl();
