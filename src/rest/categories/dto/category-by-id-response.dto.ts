import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryByIdResponseDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
