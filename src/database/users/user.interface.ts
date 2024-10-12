import { UserRole } from './users.model';

export interface IUser {
  id: number;
  email: string;
  password: string;
  role: UserRole;
  resetPasswordCode?: string;
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
  activationCode?: string;
  resetPasswordCode?: string;
}

export interface IUsersCount {
  count: number;
}
