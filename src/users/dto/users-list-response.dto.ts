import { UserRole } from '../users.model';

export class UsersListResponseDto {
  id: number;
  email: string;
  role: UserRole;
}
