import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

import { morganMiddleware } from './morganLogging.middleware'; 


@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
  	morganMiddleware(req, res, next)
  }
}