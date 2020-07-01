import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as helmet from 'helmet';

import { ValidationPipe } from './pipes/validation.pipe';

export function appSetup (app: any) {
    app.setGlobalPrefix('api/v1');
    app.use(helmet());
    app.enableCors();
    app.enable("trust proxy");
    app.useGlobalPipes(new ValidationPipe());
}
