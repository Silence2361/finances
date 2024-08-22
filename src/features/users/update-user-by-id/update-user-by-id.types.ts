import { UserRole } from '../../../database/users/users.model';

export interface UpdateUserByIdFeatureParams {
  email?: string;
  password?: string;
  role?: UserRole;
}
