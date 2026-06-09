import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userRepository } from '../../infrastructure/Auth/repository/UserRepository';
import { healthRepository } from '../../infrastructure/HealthQuestionnaire/repository/HealthQuestionnaireRepository';

import { queryKeys } from './queryKeys';

export const useHealthQuestionnaire = (userId: string) =>
  useQuery({
    queryKey: queryKeys.health.questionnaire(userId),
    queryFn: () => healthRepository.getQuestionnaire(userId),
    enabled: !!userId,
  });

export const useSubmitHealthQuestionnaire = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (answers: Record<string, string>) =>
      healthRepository.submitQuestionnaire({ userId, answers }),
    onSuccess: async () => {
      // Mark the user's flag and invalidate user cache so the app route resolver re-evaluates
      await userRepository.markHealthQuestionsComplete(userId);
      queryClient.invalidateQueries({ queryKey: queryKeys.user.byId(userId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.health.questionnaire(userId) });
    },
  });
};
