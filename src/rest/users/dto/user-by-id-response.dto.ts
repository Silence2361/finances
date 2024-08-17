import { UserRole } from '../../../database/users-database/users.model';

export class UserByIdResponseDto {
  id: number;
  email: string;
  role: UserRole;
}
