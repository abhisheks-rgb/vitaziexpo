// infrastructure/clinics/ClinicRepository.ts
import { IS_MOCK } from '../../../config/env';
import type { IClinicRepository } from '../../../domain/clinics/repository/IClinicRepository';
import { mockClinics } from '../../../mockData/MockClinics';
import { mockDelay } from '../../../mockData/MockHelpers';
import { apiClient } from '../../api/apiClient';
import type { Clinic } from '../model/clinic';

class ClinicRepositoryMock implements IClinicRepository {
  async getClinics(userId: string): Promise<Clinic[]> {
    await mockDelay();
    return mockClinics;
  }
  async getClinicDetails(userId: string, clinicId: string): Promise<Clinic> {
    await mockDelay();
    const clinic = mockClinics.find(clinic => clinic.id === clinicId);
    if (!clinic) {throw new Error('Clinic not found');}
    return clinic;
  }}

class ClinicRepositoryImpl implements IClinicRepository {
  async getClinics(userId: string): Promise<Clinic[]> {
    const { data } = await apiClient.get(`/users/${userId}/clinics`);
    return data;
  }
  async getClinicDetails(userId: string, clinicId: string): Promise<Clinic> {
    const { data } = await apiClient.get(`/users/${userId}/clinics/${clinicId}`);
    return data;
  }
}

export const clinicRepository: IClinicRepository = IS_MOCK
  ? new ClinicRepositoryMock()
  : new ClinicRepositoryImpl();
