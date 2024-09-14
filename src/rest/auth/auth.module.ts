import { Module } from '@nestjs/common';
import { JwtModule } from '../../third-party/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { AuthResolver } from './auth.controller';
import { JwtStrategy } from '../../third-party/jwt/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { DatabaseModule } from '../../database/database.module';
import { UsersRepository } from '../../database/users/user.repository';
import { FeaturesModule } from '../../features/features.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    UsersModule,
    DatabaseModule,
    JwtModule,
    FeaturesModule,
  ],
  providers: [JwtStrategy, UsersRepository, AuthResolver],
})
export class AuthModule {}
