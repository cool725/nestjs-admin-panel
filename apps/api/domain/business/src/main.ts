/**
 * Load ENV
 * **/
import { env } from '@movit/api/utils';
env.load();

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BusinessAPIModule } from './app/business.module';
import * as cookieParser from 'cookie-parser';
import { CorsMiddleware } from '@movit/api/middleware';

async function bootstrap() {
  const app = await NestFactory.create(BusinessAPIModule);
  const globalPrefix = 'api';

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  app.use(cookieParser());
  app.use(CorsMiddleware());

  const port = process.env['PORT'] || 3003;
  await app.listen(port);

  listRoutes(app.getHttpServer());

  Logger.log(
    process.env['APP_ENV'] +
    `: 🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

const listRoutes = (server) => {
  const router = server._events.request._router;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const availableRoutes: [] = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          route: {
            path: layer.route?.path,
            method: layer.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);
};

bootstrap();

