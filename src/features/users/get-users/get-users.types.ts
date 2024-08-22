import { IUser } from '../../../database/users/user.interface';

export interface GetUsersFeatureParams {
  page: number;
  pageSize: number;
}

export interface GetUsersFeatureResult {
  docs: Omit<IUser, 'password'>[];
  count: number;
}
