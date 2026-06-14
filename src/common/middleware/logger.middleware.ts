import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// MIDDLEWARE is the very first thing to run — plain Express-style (req, res, next).
// It has no idea which controller/handler will run; use it for cross-cutting
// concerns like logging, request IDs, raw-body parsing. Call next() to continue.
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Request');

  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log(`-> ${req.method} ${req.originalUrl}`);
    next();
  }
}
