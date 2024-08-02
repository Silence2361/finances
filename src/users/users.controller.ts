import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create.user.dto';
import { User } from './users.model';
import { updateUserDto } from './dto/update.user.dto';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async createUser(@Body() createUserDto: CreateUserDto): Promise <IUser>{
    return this.userService.createUser(createUserDto)
  }
  
  
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  async findAll(): Promise<IUser[]>{
    return this.userService.findAll()
  }
  
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Successfully returned user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async findUser(@Req() req: Request): Promise<IUser>{
    const user = req.user as IUser;
    return this.userService.findById(user.id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(@Param('id') id: number, @Body() updateUserDto: updateUserDto): Promise<IUser>{
    return this.userService.updateUser(id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async delete(@Param('id') id: number): Promise <{message: string}>{
    await this.userService.deleteUser(id)
    return { message: 'User successfully deleted' }
  }
}