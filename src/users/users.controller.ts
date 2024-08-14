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
import { AuthGuard } from '@nestjs/passport';
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

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiCreatedResponse({ type: UserCreateResponseDto })
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserCreateResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  @ApiOkResponse({ type: [UsersListResponseDto] })
  async findAll(): Promise<UsersListResponseDto[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'Successfully returned user profile.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiOkResponse({ type: UserByIdResponseDto })
  async findUserById(
    @Param('id') id: number,
  ): Promise<UserByIdResponseDto | null> {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiOkResponse({ type: UserUpdateResponseDto })
  async updateUserById(
    @Param('id') id: number,
    @Body() updateUserDto: updateUserDto,
  ): Promise<UserUpdateResponseDto | null> {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 204, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUserById(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUserById(id);
  }
}
