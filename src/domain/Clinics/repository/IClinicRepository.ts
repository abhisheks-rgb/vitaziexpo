import { Clinic } from '../../../infrastructure/Clinic/model/clinic';

export interface IClinicRepository {
  getClinics(userId: string): Promise<Clinic[]>;
}
