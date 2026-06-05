import { USE_MOCKS } from '../../../config/env';
import type {
  HealthAnswer,
  HealthQuestionnaire,
} from '../../../domain/HealthQuestionnaire/models/HealthQuestionnaire';
import type {
  IHealthRepository,
  SubmitHealthQuestionnairePayload,
} from '../../../domain/HealthQuestionnaire/repository/IHealthQuestionnaireRepository';
import { mockDelay } from '../../../mockData/MockHelpers';
import { apiClient } from '../../api/apiClient';

// ── Mock implementation ───────────────────────────────────────────────────────

class HealthRepositoryMock implements IHealthRepository {
  private store: Map<string, HealthQuestionnaire> = new Map();

  async submitQuestionnaire(
    payload: SubmitHealthQuestionnairePayload,
  ): Promise<HealthQuestionnaire> {
    await mockDelay();
    const questionnaire: HealthQuestionnaire = {
      userId: payload.userId,
      allergies: (payload.answers['allergies'] ?? 'No') as HealthAnswer,
      medications: (payload.answers['medications'] ?? 'No') as HealthAnswer,
      chronicConditions: (payload.answers['chronicConditions'] ?? 'No') as HealthAnswer,
      recentSymptoms: (payload.answers['recentSymptoms'] ?? 'No') as HealthAnswer,
      submittedAt: new Date().toISOString(),
    };
    this.store.set(payload.userId, questionnaire);
    return questionnaire;
  }

  async getQuestionnaire(userId: string): Promise<HealthQuestionnaire | null> {
    await mockDelay(300);
    return this.store.get(userId) ?? null;
  }
}

// ── Real implementation ───────────────────────────────────────────────────────

class HealthRepositoryImpl implements IHealthRepository {
  async submitQuestionnaire(
    payload: SubmitHealthQuestionnairePayload,
  ): Promise<HealthQuestionnaire> {
    const { data } = await apiClient.post(`/users/${payload.userId}/health-questionnaire`, {
      answers: payload.answers,
    });
    return data as HealthQuestionnaire;
  }

  async getQuestionnaire(userId: string): Promise<HealthQuestionnaire | null> {
    try {
      const { data } = await apiClient.get(`/users/${userId}/health-questionnaire`);
      return data as HealthQuestionnaire;
    } catch (e: any) {
      if (e.response?.status === 404) return null;
      throw e;
    }
  }
}

// ── Export ────────────────────────────────────────────────────────────────────
export const healthRepository: IHealthRepository = USE_MOCKS
  ? new HealthRepositoryMock()
  : new HealthRepositoryImpl();
