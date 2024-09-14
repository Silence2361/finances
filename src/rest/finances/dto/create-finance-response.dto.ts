import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateFinanceResponseDto {
  @Field(() => Int)
  id: number;
}
