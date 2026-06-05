import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { notificationRepository } from '../../infrastructure/Notifications/repository/NotificationRepository';
import { queryKeys } from './queryKeys';

export const useNotifications = (userId: string) =>
  useQuery({
    queryKey: queryKeys.notifications.byUser(userId),
    queryFn: () => notificationRepository.getAll(userId),
    enabled: !!userId,
    staleTime: 60 * 1000, // 1 minute — notifications are relatively fresh
  });

export const useMarkNotificationRead = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (notificationId: string) => notificationRepository.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.byUser(userId) });
    },
  });
};

export const useMarkAllNotificationsRead = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => notificationRepository.markAllAsRead(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.byUser(userId) });
    },
  });
};
