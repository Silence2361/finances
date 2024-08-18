import { ApiProperty } from '@nestjs/swagger';

export class UserCreateResponseDto {
  @ApiProperty()
  id: number;
}
