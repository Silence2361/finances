import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  GenerateTokenCommand,
  GenerateTokenCommandResult,
} from './refresh-token.types';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateTokenHandlerFeature {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('REDIS_CLIENT') private readonly redisService: typeof Redis,
    private readonly configService: ConfigService,
  ) {}

  async execute(
    command: GenerateTokenCommand,
  ): Promise<GenerateTokenCommandResult> {
    const { userId, roleId, sessionId } = command;

    const accessToken = this.jwtService.sign({ userId, roleId });

    const refreshToken = this.jwtService.sign({ userId, roleId, sessionId });

    await this.redisService.set(
      `session_${sessionId}`,
      userId,
      'EX',
      parseInt(this.configService.get('SESSION_EXPIRES_IN')),
    );

    return { accessToken, refreshToken };
  }
}
