import { Injectable } from '@nestjs/common';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';
import { DbConfigService } from '../../config/database.config';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
   createMongooseOptions(): MongooseModuleOptions {
    const dbConfig = new DbConfigService;
    return {
      uri: `${dbConfig.mongoUri()}`,
      useNewUrlParser: true,
      useUnifiedTopology: true
    };
   }
}