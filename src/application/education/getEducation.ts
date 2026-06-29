import { educationRepository } from '../../infrastructure/education/repository/educationRepository';

export const getEducationList = (userId: string) => educationRepository.getEducationMetirals(userId);
