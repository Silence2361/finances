import { UserRole } from '../../../database/users/users.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserByIdResponseDto {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field(() => String)
  role: UserRole;
}
