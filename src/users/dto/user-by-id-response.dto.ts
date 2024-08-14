import { UserRole } from '../users.model';

export class UserByIdResponseDto {
  id: number;
  email: string;
  role: UserRole;
}
