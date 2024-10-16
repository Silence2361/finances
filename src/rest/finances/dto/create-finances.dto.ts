import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  Min,
} from 'class-validator';
import { FinanceType } from '../../../database/finances/finances.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFinanceDto {
  @ApiProperty({
    example: 100.5,
    description: 'The amount of the finance record',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'Amount cannot be negative' })
  amount: number;

  @ApiProperty({
    example: '2024-07-30T10:00:00.000Z',
    description: 'The date of the finance record',
  })
  @IsNotEmpty()
  @IsString()
  date: string;

  @ApiProperty({
    example: 'Grocery shopping',
    description: 'The description of the finance record',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    description: 'The category ID of the finance record',
  })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    example: FinanceType.EXPENSE,
    description: 'The type of the finance record',
  })
  @IsNotEmpty()
  @IsEnum(FinanceType)
  type: FinanceType;
}
