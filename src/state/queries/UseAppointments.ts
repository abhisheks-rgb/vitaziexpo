import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { appointmentRepository } from '../../infrastructure/Appointments/repository/AppointmentRepository';
import { queryKeys } from './queryKeys';

export const useUpcomingAppointments = (userId: string) =>
  useQuery({
    queryKey: queryKeys.appointments.upcoming(userId),
    queryFn: () => appointmentRepository.getUpcoming(userId),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000,
  });

export const useAppointment = (appointmentId: string) =>
  useQuery({
    queryKey: queryKeys.appointments.byId(appointmentId),
    queryFn: () => appointmentRepository.getById(appointmentId),
    enabled: !!appointmentId,
  });

export const useConfirmAppointment = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointmentId: string) => appointmentRepository.confirm(appointmentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.upcoming(userId) });
    },
  });
};

export const useRescheduleAppointment = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ appointmentId, newDateTime }: { appointmentId: string; newDateTime: string }) =>
      appointmentRepository.reschedule(appointmentId, newDateTime),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.appointments.upcoming(userId) });
    },
  });
};
