import { ApiProperty } from '@nestjs/swagger';

export class CategoriesListResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
