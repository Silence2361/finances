import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserDto } from './user.dto';

@ObjectType()
export class UsersListResponseDto {
  @Field(() => [UserDto])
  docs: UserDto[];

  @Field(() => Int)
  count: number;
}
