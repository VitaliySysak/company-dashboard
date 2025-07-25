import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true}),
  );
  app.use(cookieParser());
  app.enableCors({ origin: true, credentials: true });

  await app.listen(process.env.PORT!);
  console.log('Running on port: ' + process.env.PORT!);
  console.log('Env type: ' + process.env.ENV_TYPE!);
}
bootstrap();
