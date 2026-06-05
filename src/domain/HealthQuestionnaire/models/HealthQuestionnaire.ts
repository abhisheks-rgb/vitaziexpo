/**
 * Domain Model: HealthQuestionnaire
 * Represents the answers to the General Health Questions screen.
 */
export type HealthAnswer = 'Yes' | 'No' | 'Not Sure';

export interface HealthQuestionnaire {
  userId: string;
  allergies: HealthAnswer;
  medications: HealthAnswer;
  chronicConditions: HealthAnswer;
  recentSymptoms: HealthAnswer;
  submittedAt: string; // ISO date string
}
