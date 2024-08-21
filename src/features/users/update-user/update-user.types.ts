import { UserRole } from '../../../database/users/users.model';

export interface UpdateUserFeatureParams {
  email?: string;
  password?: string;
  role?: UserRole;
}

export interface UpdateUserFeatureResult {
  id: number;
  email: string;
  role: UserRole;
}
