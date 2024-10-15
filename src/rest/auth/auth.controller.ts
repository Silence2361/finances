import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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
import { RefreshTokenHandlerFeature } from '../../features/auth/refresh-token/refresh-token-handler.feature';
import { RefreshTokenCommandResponseDto } from './dto/refresh-token-response.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { Request, Response } from 'express';
import { GenerateTokenHandlerFeature } from '../../features/auth/generate-refresh-token/refresh-token.feature';
import { GenerateTokenResponseDto } from './dto/generate-token-response.dto';
import { GenerateTokenDto } from './dto/generate-token.dto';
import { ResendActivationCodeFeature } from '../../features/auth/resend-activation-code/resend-activation-code.feature';
import { ResendActivationCodeDto } from './dto/resend-activatation-code.dto';
import { SendPasswordResetCodeDto } from './dto/send-password-reset-code.dto';
import { SendPasswordResetCodeFeature } from '../../features/auth/send-password-reset-code/send-password-reset-code.feature';
import { ResetPasswordFeature } from '../../features/auth/reset-password/reset-password.feature';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { JwtAuthGuard } from '../../third-party/jwt/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
export class AuthController {
  constructor(
    private readonly registerUserFeature: RegisterUserFeature,
    private readonly loginUserFeature: LoginUserFeature,
    private readonly refreshTokenFeature: RefreshTokenHandlerFeature,
    private readonly generateTokenHandlerFeature: GenerateTokenHandlerFeature,
    private readonly resendActivationCodeFeature: ResendActivationCodeFeature,
    private readonly sendPasswordResetCodeFeature: SendPasswordResetCodeFeature,
    private readonly resetPasswordFeature: ResetPasswordFeature,
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
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<LoginResponseDto> {
    return this.loginUserFeature.execute(dto);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate token' })
  @ApiOkResponse({ type: GenerateTokenResponseDto })
  @ApiResponse({ status: 200, description: 'Token successfully generated.' })
  @HttpCode(HttpStatus.OK)
  async generateToken(
    @Body() generateTokenDto: GenerateTokenDto,
  ): Promise<GenerateTokenResponseDto> {
    return this.generateTokenHandlerFeature.execute(generateTokenDto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiOkResponse({ type: RefreshTokenCommandResponseDto })
  @ApiResponse({ status: 200, description: 'Token successfully refreshed.' })
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<RefreshTokenCommandResponseDto> {
    return this.refreshTokenFeature.execute(refreshTokenDto, req, res);
  }

  @Post('resend-activation')
  @ApiOperation({ summary: 'Resend activation' })
  @HttpCode(HttpStatus.OK)
  async resendActivationCode(
    @Body() resendActivationCode: ResendActivationCodeDto,
  ): Promise<void> {
    await this.resendActivationCodeFeature.execute(resendActivationCode);
  }

  @Post('send-password-reset-code')
  @ApiOperation({ summary: 'Send password reset code' })
  @HttpCode(HttpStatus.OK)
  async sendPasswordResetCode(
    @Body() sendPasswordResetCode: SendPasswordResetCodeDto,
  ): Promise<void> {
    await this.sendPasswordResetCodeFeature.execute(sendPasswordResetCode);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPassword: ResetPasswordDto): Promise<void> {
    await this.resetPasswordFeature.execute(resetPassword);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req: Request) {
    return {
      message: 'User information from Google',
      user: req.user,
    };
  }
}
