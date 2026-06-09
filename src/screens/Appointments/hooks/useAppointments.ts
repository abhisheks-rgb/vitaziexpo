// File: Appointments/hooks/useAppointments.ts

import { useState } from 'react';

import { APPOINTMENTS_MOCK, PAST_APPOINTMENTS_MOCK } from '../data/appointments.mock';
import type { Appointment, AppointmentTab } from '../types/appointments.types';

export function useAppointments() {
  const [activeTab, setActiveTab] = useState<AppointmentTab>('Upcoming');

  const appointments: Appointment[] =
    activeTab === 'Upcoming' ? APPOINTMENTS_MOCK : PAST_APPOINTMENTS_MOCK;

  return {
    activeTab,
    setActiveTab,
    appointments,
  };
}
