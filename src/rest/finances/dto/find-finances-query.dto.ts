import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { FinanceType } from '../../../database/finances/finances.model';

export class FindFinancesQueryDto {
  @ApiPropertyOptional({ enum: FinanceType, description: 'Filter by type' })
  @IsOptional()
  @IsEnum(FinanceType)
  type?: FinanceType;

  @IsInt()
  page: number;

  @IsInt()
  pageSize: number;
}
