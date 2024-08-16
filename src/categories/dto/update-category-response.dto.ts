import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
