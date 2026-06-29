import type { Clinic } from '../../../infrastructure/Clinic/model/clinic';

export interface IClinicRepository {
  getClinics(userId: string): Promise<Clinic[]>;
  getClinicDetails(userId: string, clinicId: string): Promise<Clinic>;
}
