import { IS_MOCK } from '../../../config/env';
import { EducationMaterial } from '../../../domain/education/models/educationMaterial';
import { IEducationRepository } from '../../../domain/education/repository/iEducationRepository';
import { mockEducationList } from '../../../mockData/mockEducation';
import { mockDelay } from '../../../mockData/MockHelpers';
import { apiClient } from '../../api/apiClient';
import { EducationMaterialMapper } from '../mappers/educationMaterialMapper';


// ── Mock implementation ───────────────────────────────────────────────────────

class EducationRepositoryMock implements IEducationRepository {
  private educationList: EducationMaterial[] = [...mockEducationList];

  async getEducationMetirals(userId: string): Promise<EducationMaterial[]>{
    await mockDelay();
    return this.educationList;
  }

}

// ── Real implementation ───────────────────────────────────────────────────────

class EducationRepositoryImpl implements IEducationRepository {
  async getEducationMetirals(userId: string):  Promise<EducationMaterial[]> {
    const { data } = await apiClient.get(`/users/${userId}/notifications`);
    return (data as any[]).map(EducationMaterialMapper.toDomain);
  }
}

// ── Export ────────────────────────────────────────────────────────────────────
export const educationRepository: IEducationRepository = IS_MOCK
  ? new EducationRepositoryMock()
  : new EducationRepositoryImpl();
