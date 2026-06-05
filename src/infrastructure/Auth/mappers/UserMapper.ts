import { User } from '../../../domain/Auth/models/User';
import { UserDTO } from '../dtos/UserDTO';

export const UserMapper = {
  toDomain(dto: UserDTO): User {
    return {
      id: dto.user_id,
      firstName: dto.first_name,
      lastName: dto.last_name,
      email: dto.email,
      dateOfBirth: dto.date_of_birth,
      organizationId: dto.org_id,
      hasCompletedHealthQuestions: dto.health_questions_completed,
      hasCompletedOnboarding: dto.onboarding_completed,
      consentGiven: dto.consent_given,
    };
  },

  toDTO(domain: User): UserDTO {
    return {
      user_id: domain.id,
      first_name: domain.firstName,
      last_name: domain.lastName,
      email: domain.email,
      date_of_birth: domain.dateOfBirth,
      org_id: domain.organizationId,
      health_questions_completed: domain.hasCompletedHealthQuestions,
      onboarding_completed: domain.hasCompletedOnboarding,
      consent_given: domain.consentGiven,
    };
  },
};
