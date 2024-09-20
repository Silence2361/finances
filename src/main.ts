import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
bootstrap();
