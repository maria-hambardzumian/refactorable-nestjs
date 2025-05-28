export class User {
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

  isVip(): boolean {
    return this.totalPurchases > 1000;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  updateEmail(newEmail: string) {
    this.email = newEmail;
    this.updatedAt = new Date();
  }

  changePassword(newPassword: string) {
    this.password = newPassword;
    this.updatedAt = new Date();
  }
}
