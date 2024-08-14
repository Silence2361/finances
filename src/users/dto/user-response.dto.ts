import { UserRole } from '../users.model';

export class UserResponseDto {
  id: number;
  email: string;
  role: UserRole;
}
