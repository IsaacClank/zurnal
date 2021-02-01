import { NextFunction, Request, Response } from 'express';

export const errorHandler = (_req: Request, res: Response, next: NextFunction) => {
  if (res.locals.err) {
    console.log(`\n\x1B[31m${res.locals.err}`);
  }
  return next();
};

export const messageHandler = (_: Request, res: Response) => {
  if (res.locals.msg) res.json(res.locals.msg);
  res.end();
};
