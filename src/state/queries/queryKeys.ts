/**
 * queryKeys — single source of truth for all React Query cache keys.
 * Import these everywhere instead of inline strings.
 */
export const queryKeys = {
  user: {
    all: ['user'] as const,
    byId: (userId: string) => ['user', userId] as const,
  },
  appointments: {
    all: ['appointments'] as const,
    upcoming: (userId: string) => ['appointments', 'upcoming', userId] as const,
    byId: (appointmentId: string) => ['appointments', appointmentId] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    byUser: (userId: string) => ['notifications', userId] as const,
  },
  health: {
    questionnaire: (userId: string) => ['health', 'questionnaire', userId] as const,
  },
};
