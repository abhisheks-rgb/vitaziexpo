/**
 * Domain Model: User
 * Pure business object — no API or DB concerns here.
 */
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string; // ISO date string
  organizationId: string;
  hasCompletedHealthQuestions: boolean;
  hasCompletedOnboarding: boolean;
  consentGiven: boolean;
}
