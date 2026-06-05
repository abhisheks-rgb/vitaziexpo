import type { HealthQuestionnaire } from '../models/HealthQuestionnaire';

export interface SubmitHealthQuestionnairePayload {
  userId: string;
  answers: Record<string, string>;
}

/**
 * IHealthRepository
 * Contract for health questionnaire operations.
 */
export interface IHealthRepository {
  submitQuestionnaire(payload: SubmitHealthQuestionnairePayload): Promise<HealthQuestionnaire>;
  getQuestionnaire(userId: string): Promise<HealthQuestionnaire | null>;
}
