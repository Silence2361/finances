import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Successfully returned user profile.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getProfile(@Req() req: Request) {
    const user = req.user as IUser;
    return this.userService.findByEmail(user.email);
  }
}