import { UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserByIdResponseDto } from './dto/user-by-id-response.dto';
import { UserCreateResponseDto } from './dto/user-create-response.dto';
import { UsersListResponseDto } from './dto/users-list-response.dto';
import { JwtAuthGuard } from '../../third-party/jwt/jwt-auth.guard';
import { CreateUserFeature } from '../../features/users/create-user/create-user.feature';
import { GetUsersFeature } from '../../features/users/get-users/get-users.feature';
import { GetUserByIdFeature } from '../../features/users/get-user-by-id/get-user-by-id.feature';
import { DeleteUserByIdFeature } from '../../features/users/delete-user-by-id/delete-user-by-id.feature';
import { UpdateUserByIdFeature } from '../../features/users/update-user-by-id/update-user-by-id.feature';
import { UsersPaginationQueryDto } from './dto/pagination-query.dto';
import { Args, Query, Mutation, Resolver, Int } from '@nestjs/graphql';

@Resolver(() => UserByIdResponseDto)
//@UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(
    private readonly createUserFeature: CreateUserFeature,
    private readonly updateUserByIdFeature: UpdateUserByIdFeature,
    private readonly getUsersFeature: GetUsersFeature,
    private readonly getUserByIdFeature: GetUserByIdFeature,
    private readonly deleteUserByIdFeature: DeleteUserByIdFeature,
  ) {}

  @Mutation(() => UserCreateResponseDto)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto,
  ): Promise<UserCreateResponseDto> {
    return this.createUserFeature.execute(createUserDto);
  }

  @Query(() => UsersListResponseDto)
  async findAll(
    @Args() paginationQuery: UsersPaginationQueryDto,
  ): Promise<UsersListResponseDto> {
    return this.getUsersFeature.execute(paginationQuery);
  }

  @Query(() => UserByIdResponseDto, { nullable: true })
  async findUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<UserByIdResponseDto | null> {
    return this.getUserByIdFeature.execute({ id });
  }

  @Mutation(() => Boolean)
  async updateUserById(
    @Args('id', { type: () => Int }) userId: number,
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
  ): Promise<boolean> {
    await this.updateUserByIdFeature.execute(userId, updateUserDto);
    return true;
  }

  @Mutation(() => Boolean)
  async deleteUserById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.deleteUserByIdFeature.execute({ id });
    return true;
  }
}
