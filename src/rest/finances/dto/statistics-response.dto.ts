import { ApiProperty } from '@nestjs/swagger';
import { FinanceType } from '../../../database/finances/finances.model';

export class StatisticsResponseDto {
  @ApiProperty()
  type: FinanceType;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  totalAmount: number;
}
