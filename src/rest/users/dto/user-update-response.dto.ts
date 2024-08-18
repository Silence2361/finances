import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../database/users-database/users.model';

export class UserUpdateResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: UserRole;
}
