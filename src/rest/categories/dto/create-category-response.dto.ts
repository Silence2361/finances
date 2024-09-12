import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateCategoryResponseDto {
  @Field(() => Int)
  id: number;
}
