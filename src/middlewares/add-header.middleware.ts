import { NestMiddleware, Injectable } from "@nestjs/common";
import { Request, Response } from 'express';

@Injectable()
export class AddHeaderMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        res.header("X-PaOCLOUD-PJ", "paonest");
        next();
    }
}