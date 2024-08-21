import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../../../database/users/users.model';

export class UsersListResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: UserRole;
}
