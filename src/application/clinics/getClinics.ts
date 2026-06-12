import { clinicRepository } from '../../infrastructure/Clinic/repository/ClinicRepository';

export const getClinics = (userId: string) => clinicRepository.getClinics(userId);
