import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
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

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class UserController {
  constructor(
    private readonly createUserFeature: CreateUserFeature,
    private readonly updateUserByIdFeature: UpdateUserByIdFeature,
    private readonly getUsersFeature: GetUsersFeature,
    private readonly getUserByIdFeature: GetUserByIdFeature,
    private readonly deleteUserByIdFeature: DeleteUserByIdFeature,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: UserCreateResponseDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserCreateResponseDto> {
    return this.createUserFeature.execute(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [UsersListResponseDto] })
  @ApiResponse({ status: 200, description: 'Users returned successfully' })
  async findAll(): Promise<UsersListResponseDto[]> {
    return this.getUsersFeature.execute({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ type: UserByIdResponseDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully returned user profile.',
  })
  async findUserById(
    @Param('id') id: number,
  ): Promise<UserByIdResponseDto | null> {
    return this.getUserByIdFeature.execute({ id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateUserById(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.updateUserByIdFeature.execute(userId, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id') id: number): Promise<void> {
    await this.deleteUserByIdFeature.execute({ id });
  }
}
