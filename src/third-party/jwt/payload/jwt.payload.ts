import { UserRole } from '../../../database/users/users.model';

export interface JwtPayload {
  userId: number;
  role: string;
}

export interface IValidatedUser {
  id: number;
  role: UserRole;
}
