import { IS_MOCK } from '../../../config/env';
import type { User } from '../../../domain/Auth/models/User';
import type { IUserRepository } from '../../../domain/Auth/repository/IUserRepository';
import { mockDelay } from '../../../mockData/MockHelpers';
import { mockUsers } from '../../../mockData/MockUsers';
import { apiClient } from '../../api/apiClient';
import { UserMapper } from '../mappers/UserMapper';

// ── Mock implementation ───────────────────────────────────────────────────────

class UserRepositoryMock implements IUserRepository {
  private users: User[] = [...mockUsers];

  async getById(userId: string): Promise<User> {
    await mockDelay();
    const user = this.users.find((u) => u.id === userId);
    if (!user) {throw new Error(`Mock: user ${userId} not found`);}
    return { ...user };
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    await mockDelay();
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx === -1) {throw new Error(`Mock: user ${userId} not found`);}
    this.users[idx] = { ...this.users[idx], ...updates };
    return { ...this.users[idx] };
  }

  async markHealthQuestionsComplete(userId: string): Promise<void> {
    await mockDelay(300);
    const idx = this.users.findIndex((u) => u.id === userId);
    if (idx !== -1) {
      this.users[idx].hasCompletedHealthQuestions = true;
    }
  }
}

// ── Real implementation ───────────────────────────────────────────────────────

class UserRepositoryImpl implements IUserRepository {
  async getById(userId: string): Promise<User> {
    const { data } = await apiClient.get(`/users/${userId}`);
    return UserMapper.toDomain(data);
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<User> {
    const { data } = await apiClient.patch(`/users/${userId}`, UserMapper.toDTO(updates as User));
    return UserMapper.toDomain(data);
  }

  async markHealthQuestionsComplete(userId: string): Promise<void> {
    await apiClient.post(`/users/${userId}/health-questions-complete`);
  }
}

// ── Export ────────────────────────────────────────────────────────────────────
export const userRepository: IUserRepository = IS_MOCK
  ? new UserRepositoryMock()
  : new UserRepositoryImpl();
