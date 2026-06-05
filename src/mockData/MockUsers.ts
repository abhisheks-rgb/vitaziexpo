import type { User } from '../domain/Auth/models/User';

export const mockUsers: User[] = [
  {
    id: 'user-001',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    email: 'sarah.mitchell@example.com',
    dateOfBirth: '1988-04-12',
    organizationId: 'org-vitazi-001',
    hasCompletedHealthQuestions: false,
    hasCompletedOnboarding: true,
    consentGiven: true,
  },
  {
    id: 'user-002',
    firstName: 'James',
    lastName: 'Carter',
    email: 'james.carter@example.com',
    dateOfBirth: '1975-09-22',
    organizationId: 'org-vitazi-001',
    hasCompletedHealthQuestions: true,
    hasCompletedOnboarding: true,
    consentGiven: true,
  },
];

export const mockCurrentUser = mockUsers[0];
