import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
  Min,
  IsInt,
} from 'class-validator';
import { Field, InputType, Int } from '@nestjs/graphql';
import { FinanceType } from '../enums/finances.enum';

@InputType()
export class CreateFinanceDto {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  @Min(0, { message: 'Amount cannot be negative' })
  amount: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  date: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @Field(() => FinanceType)
  @IsNotEmpty()
  @IsEnum(FinanceType)
  type: FinanceType;
}
