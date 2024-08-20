import { UserRole } from '../../../database/users-database/users.model';

export interface GetUserByIdFeatureParams {
  id: number;
}

export interface GetUserByIdFeatureResult {
  id: number;
  email: string;
  role: UserRole;
}
