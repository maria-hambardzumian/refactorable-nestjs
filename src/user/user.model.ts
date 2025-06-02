export const enum MembershipLevel {
  Gold = 'Gold',
  Silver = 'Silver',
  Bronze = 'Bronze',
}
export interface UserProps {
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
  totalPurchases: number;
  emailPreferences?: any;
}
export class User {
  id: number;
  totalPurchases: number;
  firstName: string;
  lastName: string;
  createdAt: Date;
  emailPreferences?: Object | string;
  role: string;
  email: string;
  updatedAt?: Date;
  password: string;
  isActive: boolean;

  constructor(params: UserProps) {
    Object.assign(this, params);
  }
  isVip(): boolean {
    return this.totalPurchases > 1000;
  }

  getMembershipLevel(): MembershipLevel {
    if (this.totalPurchases > 1000) return MembershipLevel.Gold;
    if (this.totalPurchases > 500) return MembershipLevel.Silver;
    return MembershipLevel.Bronze;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getAccountAgeDays(): number {
    return Math.floor(
      (Date.now() - this.createdAt.getTime()) / (1000 * 60 * 60 * 24),
    );
  }

  promoteToAdmin() {
    this.role = 'admin';
  }

  updateEmailPreferences(preferences: Object) {
    this.emailPreferences = preferences;
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  updatePassword(newPassword: string) {
    this.password = newPassword;
    this.updatedAt = new Date();
  }
}
