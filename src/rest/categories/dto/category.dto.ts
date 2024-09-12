import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;
}
