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
import { UserService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { UserByIdResponseDto } from './dto/user-by-id-response.dto';
import { UserCreateResponseDto } from './dto/user-create-response.dto';
import { UserUpdateResponseDto } from './dto/user-update-response.dto';
import { UsersListResponseDto } from './dto/users-list-response.dto';
import { UsersQueryService } from './users-query.service';
import { JwtAuthGuard } from '../../third-party/jwt/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private readonly usersQueryService: UsersQueryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: UserCreateResponseDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserCreateResponseDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [UsersListResponseDto] })
  @ApiResponse({ status: 200, description: 'Users returned successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<UsersListResponseDto[]> {
    return this.usersQueryService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiOkResponse({ type: UserByIdResponseDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully returned user profile.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findUserById(
    @Param('id') userId: number,
  ): Promise<UserByIdResponseDto | null> {
    return this.usersQueryService.findUserById(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiOkResponse({ type: UserUpdateResponseDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateUserById(
    @Param('id') userId: number,
    @Body() updateUserDto: updateUserDto,
  ): Promise<UserUpdateResponseDto | null> {
    return this.usersService.updateUserById(userId, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id') userId: number): Promise<void> {
    return this.usersService.deleteUserById(userId);
  }
}
