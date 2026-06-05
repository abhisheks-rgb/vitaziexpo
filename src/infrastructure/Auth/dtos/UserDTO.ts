/**
 * UserDTO — shape returned by the real API.
 * Deliberately separate from the domain model so API changes
 * don't bleed into business logic.
 */
export interface UserDTO {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
  org_id: string;
  health_questions_completed: boolean;
  onboarding_completed: boolean;
  consent_given: boolean;
}
