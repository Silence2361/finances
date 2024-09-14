import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FinanceType } from '../enums/finances.enum';

@ObjectType()
export class FinanceDetailsDto {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  date: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  categoryId: number;

  @Field(() => Int)
  userId: number;

  @Field(() => FinanceType)
  type: FinanceType;
}

@ObjectType()
export class GetFinancesListResponseDto {
  @Field(() => [FinanceDetailsDto])
  docs: FinanceDetailsDto[];

  @Field(() => Int)
  count: number;
}
