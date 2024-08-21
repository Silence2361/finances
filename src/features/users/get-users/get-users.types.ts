import { UserRole } from '../../../database/users/users.model';

export interface GetUsersFeatureParams {}

export interface GetUsersFeatureResult {
  id: number;
  email: string;
  role: UserRole;
}
