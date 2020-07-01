import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as chalk from "chalk";

import { appSetup } from './app.setup';
import { AppModule } from './app.module';
import { createSwaggerDoc } from './swagger/swagger.doc';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = Number(process.env.PORT) || 3000

  appSetup(app)
  createSwaggerDoc(app)
  
  await app.listen(port, '0.0.0.0',() => {
  	console.log(chalk.hex('#07F3E9').bold(`\n ⭐ NestJS API Server running at port `) + chalk.hex('#F32F07').bold(`${port}`) + '\n')
  });
}

bootstrap();
