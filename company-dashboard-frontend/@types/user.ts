export interface User {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export interface ReginsterUser {
  fullName?: string;
  email: string;
  password: string;
}

export interface LoginUser {
  fullName?: string;
  email: string;
  password: string;
}
