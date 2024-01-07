import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.setGlobalPrefix(process.env.API_URL ? process.env.API_URL : ''); // /api/v1 as default
  await app.enableCors({
    origin: process.env.URL_FOR_CORS,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 3600,
    credentials: true,
    // preflightContinue: true,
  }); // for unblock redirection to api from frontend

  await app.use(cookieParser());

  await app.listen(
    process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT) : 3001,
  );
}
bootstrap();
