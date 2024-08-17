import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryResponseDto {
  @ApiProperty()
  id: number;
}
