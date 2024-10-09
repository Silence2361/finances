import { Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  RefreshTokenCommand,
  RefreshTokenCommandResult,
} from './refresh-token.types';
import Redis from 'ioredis';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

export class RefreshTokenHandlerFeature {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT') private readonly redisClient: typeof Redis,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    command: RefreshTokenCommand,
    req: Request,
    res: Response,
  ): Promise<RefreshTokenCommandResult> {
    const { refreshToken } = command;

    const refreshTokenCookies = req.cookies.refreshToken;
    if (!refreshTokenCookies && !refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    let decoded;

    try {
      decoded = this.jwtService.verify(refreshToken);
    } catch (error) {
      await this.redisClient.del(`session_${decoded.sessionId}`);

      throw new UnauthorizedException(
        'Refresh token expired or invalid, session removed',
      );
    }

    const { userId, roleId, sessionId } = decoded;

    const session = await this.redisClient.get(`session_${sessionId}`);
    if (!session || session !== userId.toString()) {
      throw new UnauthorizedException('Session invalid or expired');
    }

    const accessToken = this.jwtService.sign({ userId, roleId });

    const newRefreshToken = this.jwtService.sign({ userId, roleId, sessionId });

    await this.redisClient.set(
      `session_${sessionId}`,
      userId.toString(),
      'EX',
      parseInt(this.configService.get('SESSION_EXPIRES_IN')),
    );

    res.cookie('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: parseInt(this.configService.get('COOKIE_MAX_AGE')),
    });

    res.status(200).json({ accessToken });
    return { accessToken };
  }
}
