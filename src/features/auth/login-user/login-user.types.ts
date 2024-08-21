import { UserRole } from '../../../database/users/users.model';

export interface LoginUserFeatureParams {
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginUserFeatureResult {
  accessToken: string;
}
