import { ApiProperty } from '@nestjs/swagger';
import { GetFinancesFeatureResult } from '../../../features/finances/find-finances/find-finances.types';

export enum FinanceType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export class FinanceDetailsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  categoryId: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  type: FinanceType;
}

export class GetFinancesListResponseDto implements GetFinancesFeatureResult {
  docs: FinanceDetailsDto[];
  count: number;
}
