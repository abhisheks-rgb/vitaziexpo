import type { HealthQuestionnaire } from '../../domain/HealthQuestionnaire/models/HealthQuestionnaire';
import { userRepository } from '../../infrastructure/Auth/repository/UserRepository';
import { healthRepository } from '../../infrastructure/HealthQuestionnaire/repository/HealthQuestionnaireRepository';

export interface SubmitHealthAnswers {
  userId: string;
  answers: Record<string, string>;
}

/**
 * SubmitHealthQuestionnaireUseCase
 * Validates answers, submits to repository, marks user as complete.
 */
export const submitHealthQuestionnaireUseCase = async (
  payload: SubmitHealthAnswers,
): Promise<HealthQuestionnaire> => {
  const requiredFields = ['allergies', 'medications', 'chronicConditions', 'recentSymptoms'];
  const missing = requiredFields.filter((f) => !payload.answers[f]);

  if (missing.length > 0) {
    throw new Error(`Please answer all questions before continuing.`);
  }

  const result = await healthRepository.submitQuestionnaire(payload);
  await userRepository.markHealthQuestionsComplete(payload.userId);
  return result;
};
