import { ApiProperty } from '@nestjs/swagger';

export class CategoryByIdResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
