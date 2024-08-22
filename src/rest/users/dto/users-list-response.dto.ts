import { GetUsersFeatureResult } from '../../../features/users/get-users/get-users.types';
import { IUser } from '../../../database/users/user.interface';

export class UsersListResponseDto implements GetUsersFeatureResult {
  docs: Omit<IUser, 'password'>[];
  count: number;
}
