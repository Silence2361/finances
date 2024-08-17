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

export interface ICreateUserResponse {
  id: number;
}

export interface IUpdateUser {
  email?: string;
  password?: string;
  role?: UserRole;
}

export interface IUpdateUserResponse {
  id: number;
  email: string;
  role: UserRole;
}

export interface IFindAllUsersResponse {
  id: number;
  email: string;
  role: UserRole;
}

export interface IFindUserByIdResponse {
  id: number;
  email: string;
  role: UserRole;
}

export interface IFindUserByEmailResponse {
  id: number;
  email: string;
  role: UserRole;
}
