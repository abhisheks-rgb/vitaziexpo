import { clinicRepository } from '../../infrastructure/Clinic/repository/ClinicRepository';

export const getClinics = (userId: string) => clinicRepository.getClinics(userId);
export const getClinicDetails = (userId: string, clinicId: string) => clinicRepository.getClinicDetails(userId, clinicId);
