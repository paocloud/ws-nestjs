import { Module, NestModule ,MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { UserModule } from './modules/user.module';
import { HealthCheckModule } from './modules/healthcheck.module';
import { AppService } from './app.service';
import { MongooseConfigService } from "./database/app.database.configService";
import { AuthModule } from './auth/auth.module';
import { AddHeaderMiddleware } from './middlewares/add-header.middleware';
import { LoggerMiddleware } from './middlewares/logger.middleware';

import { AppGateway } from './gateway/app.gateway';

@Module({
  imports: [
  	ConfigModule.forRoot({
  		envFilePath: '.env',
  		isGlobal: true,
  	}),
  	MongooseModule.forRootAsync({
  		useClass: MongooseConfigService,
	}),
  ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documentation'),
  }),
  UserModule,
  HealthCheckModule,
  AuthModule
  ],
  controllers: [
  	AppController,
  ],
  providers: [
    AppService,
    AppGateway
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    if(process.env.STAGE === 'develop'){
      consumer
        .apply(AddHeaderMiddleware, LoggerMiddleware)
        .forRoutes('*');
    }
    else {
      consumer
        .apply(AddHeaderMiddleware)
        .forRoutes('*');
    }
  }
}

