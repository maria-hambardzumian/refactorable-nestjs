import { Injectable } from '@nestjs/common';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

@Injectable()
export class BadUserService {
  private users = [
    {
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
    },
    {
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
    },
    {
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
    },
  ];

  private nextId = 4;

  async findAll(): Promise<any[]> {
    // Simulating async operation with setTimeout
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 100);
    });
  }

  findById(id: number): any {
    return this.users.find((user) => user.id === id);
  }

  findByEmail(email: string): any {
    return this.users.find((user) => user.email === email);
  }

  async create(userData: any) {
    const newUser = {
      id: this.nextId++,
      ...userData,
      isActive: userData.isActive !== undefined ? userData.isActive : true,
      createdAt: userData.createdAt || new Date(),
      totalPurchases: 0,
    };

    this.users.push(newUser);

    return newUser;
  }

  async update(id: number, updateData: any): Promise<any> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updateData };

    return this.users[userIndex];
  }

  async delete(id: number): Promise<boolean> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    this.users.splice(userIndex, 1);
    return true;
  }

  async promoteToAdmin(id: number) {
    const user = this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.role = 'admin';
    return user;
  }

  async calculateUserStats(id: number) {
    const user = this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Business calculations in data service
    const accountAge = Math.floor(
      (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );
    const isVip = user.totalPurchases > 1000;
    const membershipLevel =
      user.totalPurchases > 1000
        ? 'Gold'
        : user.totalPurchases > 500
          ? 'Silver'
          : 'Bronze';

    return {
      accountAgeDays: accountAge,
      isVip,
      membershipLevel,
      totalSpent: user.totalPurchases,
    };
  }

  async changePassword(id: number, newPassword: string) {
    const user = this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    user.password = newPassword;
    return true;
  }

  async updateEmailPreferences(id: number, preferences: any) {
    const user = this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    (user as any).emailPreferences = preferences;
    return user;
  }
}
