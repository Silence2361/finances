import { UserRole } from '../../../database/users-database/users.model';

export class UserUpdateResponseDto {
  id: number;
  email: string;
  role: UserRole;
}
