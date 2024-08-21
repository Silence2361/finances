import { ApiProperty } from '@nestjs/swagger';

export class StatisticsResponseDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  totalAmount: number;
}
