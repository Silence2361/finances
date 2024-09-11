import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserRole } from '../../../database/users/users.model';

@ObjectType()
export class UserDto {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field(() => String)
  role: UserRole;
}
