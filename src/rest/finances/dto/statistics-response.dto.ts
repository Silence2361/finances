import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FinanceType } from '../enums/finances.enum';

@ObjectType()
export class StatisticsResponseDto {
  @Field(() => FinanceType)
  type: FinanceType;

  @Field(() => Int, { nullable: true })
  categoryId?: number;

  @Field(() => Int)
  totalAmount: number;
}
