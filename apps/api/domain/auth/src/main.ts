/**
 * Load ENV
 * **/
import { env } from '@movit/api/utils';
env.load();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { CorsMiddleware } from '@movit/api/middleware';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.use(CorsMiddleware());

  const port = process.env.SERVER_PORT || 3333;
  await app.listen(port);
  Logger.log(
    process.env.APP_ENV +
      `: 🚀 Application is now running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
