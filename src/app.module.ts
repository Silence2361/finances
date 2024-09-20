import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from 'nestjs-objection';
import { AuthModule } from './rest/auth/auth.module';
import { UsersModule } from './rest/users/users.module';
import { CategoriesModule } from './rest/categories/categories.module';
import { FinancesModule } from './rest/finances/finances.module';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './third-party/jwt/jwt.module';
import { FeaturesModule } from './features/features.module';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { Request } from 'express';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      path: '/graphql',
      context: ({ req }: { req: Request }) => {
        return { req };
      },
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    FinancesModule,
    JwtModule,
    FeaturesModule,
  ],
  controllers: [],
})
export class AppModule {}
