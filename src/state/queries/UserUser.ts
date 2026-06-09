import { useQuery } from '@tanstack/react-query';

import { userRepository } from '../../infrastructure/Auth/repository/UserRepository';

import { queryKeys } from './queryKeys';

/**
 * useUser — fetches the current user profile.
 * Works identically in mock and real API mode.
 */
export const useUser = (userId: string) =>
  useQuery({
    queryKey: queryKeys.user.byId(userId),
    queryFn: () => userRepository.getById(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
