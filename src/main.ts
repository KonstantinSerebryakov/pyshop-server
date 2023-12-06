import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      skipMissingProperties: false,
      whitelist: true,
      transform: true,
    }),
  );
  const configSwagger = new DocumentBuilder()
    .setTitle('PyShop - Konstantin Serebryakov - API')
    .setDescription('The PyShop API description')
    .setVersion('1.0')
    .addTag('PyShop')
    .build();
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('apiref', app, documentSwagger);

  const PORT = process.env.PORT ?? '3333';
  app.enableCors(); // TODO: disable in production
  await app.listen(PORT);
  Logger.log(`the application is running on the localhost:${PORT}`);
}
bootstrap();
