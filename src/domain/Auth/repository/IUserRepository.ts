import type { User } from '../models/User';

/**
 * IUserRepository
 * Contract for user profile operations.
 */
export interface IUserRepository {
  getById(userId: string): Promise<User>;
  updateProfile(userId: string, updates: Partial<User>): Promise<User>;
  markHealthQuestionsComplete(userId: string): Promise<void>;
}
