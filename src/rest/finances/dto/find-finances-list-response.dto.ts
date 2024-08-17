import { ApiProperty } from '@nestjs/swagger';

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

export class FindFinancesListResponseDto {
  @ApiProperty()
  finances: FinanceDetailsDto[];
}
