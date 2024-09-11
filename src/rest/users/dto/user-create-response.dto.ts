import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserCreateResponseDto {
  @Field(() => Int)
  id: number;
}
