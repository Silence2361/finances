import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegisterResponseDto {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  role: string;
}
