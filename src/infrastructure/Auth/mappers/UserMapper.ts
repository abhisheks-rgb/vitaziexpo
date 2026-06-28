import type { User } from '../../../domain/Auth/models/User';
import type { UserProfileBodyDTO } from '../dtos/UserDTO';

/**
 * Splits "Firstname Lastname" into parts.
 * Everything after the first space is treated as lastName.
 */
function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const idx = fullName.indexOf(' ');
  if (idx === -1) {
    return { firstName: fullName, lastName: '' };
  }
  return {
    firstName: fullName.slice(0, idx),
    lastName: fullName.slice(idx + 1),
  };
}

export const UserMapper = {
  toDomain(dto: UserProfileBodyDTO): User {
    const { firstName, lastName } = splitFullName(dto.full_name);
    return {
      id: dto.email, // Vitazi uses email as the stable identifier
      firstName,
      lastName,
      email: dto.email,
      dateOfBirth: '', // not returned by profile endpoint
      organizationId: dto.clinic_id,
      hasCompletedHealthQuestions: false, // not surfaced by API; default false
      hasCompletedOnboarding: true, // existing users are onboarded
      consentGiven: true, // not surfaced by API; assume true for existing users
    };
  },
};
