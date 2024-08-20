import { UserRole } from '../users.model';

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
}

export interface ICreateUser {
  email: string;
  password: string;
  role: UserRole;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
  role?: UserRole;
}
