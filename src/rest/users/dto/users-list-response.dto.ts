import { UserRole } from '../../../database/users-database/users.model';

export class UsersListResponseDto {
  id: number;
  email: string;
  role: UserRole;
}
