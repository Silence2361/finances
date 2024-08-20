import { UserRole } from '../../../database/users-database/users.model';

export interface CreateUserFeatureParams {
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateUserFeatureResult {
  id: number;
}
