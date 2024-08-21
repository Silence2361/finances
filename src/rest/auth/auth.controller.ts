import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { RegisterUserFeature } from '../../features/auth/register-user/register-user.feature';
import { LoginUserFeature } from '../../features/auth/login-user/login-user.feature';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserFeature: RegisterUserFeature,
    private readonly loginUserFeature: LoginUserFeature,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registration of new user' })
  @ApiOkResponse({ type: RegisterResponseDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: AuthDto): Promise<RegisterResponseDto> {
    return this.registerUserFeature.execute(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiResponse({ status: 200, description: 'Successfully logged in.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<LoginResponseDto> {
    return this.loginUserFeature.execute(dto);
  }
}
