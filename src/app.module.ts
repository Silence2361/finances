import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from 'nestjs-objection';
import { AuthModule } from './rest/auth/auth.module';
import { UsersModule } from './rest/users/users.module';
import { CategoriesModule } from './rest/categories/categories.module';
import { FinancesModule } from './rest/finances/finances.module';
import { DatabaseModule } from './database/repositories/repositories.module';
import { JwtModule } from './third-party/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    ObjectionModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          config: {
            client: 'pg',
            connection: {
              host: configService.get<string>('DATABASE_HOST'),
              port: configService.get<number>('DATABASE_PORT'),
              user: configService.get<string>('DATABASE_USER'),
              password: configService.get<string>('DATABASE_PASSWORD'),
              database: configService.get<string>('DATABASE_NAME'),
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    FinancesModule,
    JwtModule,
  ],
  controllers: [],
})
export class AppModule {}
