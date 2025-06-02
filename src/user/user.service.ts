import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserProps } from './user.model';
import { UserQueryDto } from './dtos/user-query.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    new User({
      id: 1,
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'plaintext123',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2023-01-01'),
      totalPurchases: 1500,
    }),
    new User({
      id: 2,
      name: 'Jane Smith',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'password456',
      role: 'user',
      isActive: true,
      createdAt: new Date('2023-02-01'),
      totalPurchases: 500,
    }),
    new User({
      id: 3,
      name: 'Bob Wilson',
      firstName: 'Bob',
      lastName: 'Wilson',
      email: 'bob@example.com',
      password: 'secret789',
      role: 'user',
      isActive: false,
      createdAt: new Date('2023-03-01'),
      totalPurchases: 200,
    }),
  ];

  private nextId = 4;

  private async withDelay<T>(result: T, delay = 100): Promise<T> {
    return new Promise((resolve) => setTimeout(() => resolve(result), delay));
  }
  private async sentLogic(email: string) {
    ////logic
    return `Welcome dear ${email}`;
  }

  async findAll() {
    return this.withDelay(this.users, 100);
  }

  async findAllWithFilters(query: UserQueryDto) {
    let users = await this.findAll();

    if (query.active) {
      users = users.filter((u) => u.isActive);
    }

    if (query.role) {
      users = users.filter((u) => u.role === query.role);
    }

    if (query.sortBy) {
      const key = query.sortBy;
      users.sort((a, b) => a[key]?.localeCompare?.(b[key]));
    }

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const start = (page - 1) * limit;
    const paginated = users.slice(start, start + limit);

    return {
      data: paginated,
      page,
      total: users.length,
      totalPages: Math.ceil(users.length / limit),
    };
  }

  async findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return this.withDelay(user);
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email);
    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);
    return this.withDelay(user);
  }

  async create(userData: CreateUserDto) {
    const newUser = new User({
      createdAt: new Date(),
      ...userData,
      id: this.nextId++,
      isActive: userData.isActive ?? true,
      totalPurchases: 0,
    } as UserProps);

    this.users.push(newUser);

    return this.withDelay(newUser);
  }

  async update(id: number, updateData: any): Promise<any> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    return this.withDelay(this.users[userIndex]);
  }

  async delete(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);
    return this.withDelay(true);
  }

  async promoteToAdmin(id: number) {
    const user = await this.findById(id);
    user.promoteToAdmin();
    user.updatedAt = new Date();
    return this.withDelay(user);
  }

  async calculateUserStats(id: number) {
    const user = await this.findById(id);
    return {
      accountAgeDays: user.getAccountAgeDays(),
      isVip: user.isVip(),
      membershipLevel: user.getMembershipLevel(),
      totalSpent: user.totalPurchases,
    };
  }

  async changePassword(id: number, newPassword: string) {
    const user = await this.findById(id);
    user.updatePassword(newPassword);
    return this.withDelay(true);
  }

  async updateEmailPreferences(id: number, preferences: Object) {
    const user = await this.findById(id);
    user.updateEmailPreferences(preferences);
    return this.withDelay(user);
  }

  async sendWelcomeEmail(id: number) {
    const user = await this.findById(id);
    return this.withDelay(() => this.sentLogic(user.email), 1000);
  }
}
