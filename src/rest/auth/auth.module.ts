import { Module } from '@nestjs/common';
import { JwtModule } from '../../third-party/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../third-party/jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../database/repositories/repositories.module';
import { UsersRepository } from '../../database/repositories/user.repository';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UsersModule,
    DatabaseModule,
    JwtModule,
  ],
  providers: [AuthService, JwtStrategy, UsersRepository],
  controllers: [AuthController],
})
export class AuthModule {}
