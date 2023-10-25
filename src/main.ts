import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const PORT = process.env.PORT ?? '3333';
  await app.listen(PORT);
  Logger.log(`the application is running on the localhost:${PORT}`);
}
bootstrap();
