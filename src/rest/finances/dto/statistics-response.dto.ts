import { ApiProperty } from '@nestjs/swagger';

export class CategoryStatisticsResponseDto {
  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  totalAmount: number;
}

export class TotalStatisticsResponseDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  total: number;
}

export class MonthlyStatisticsResponseDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  total: number;
}
