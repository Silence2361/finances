import { UserRole } from '../users.model';

export class UserUpdateResponseDto {
  id: number;
  email: string;
  role: UserRole;
}
