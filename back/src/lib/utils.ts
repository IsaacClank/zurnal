import { NextFunction, Request, Response } from 'express';
import { ErrorObject } from './type';

export const errorHandler = (_req: Request, res: Response, next: NextFunction) => {
  const errorObj = res.locals.err as ErrorObject;
  if (errorObj) {
    console.log(`\n\x1B[31m${errorObj.error}`);
    console.log(`\n\x1B[31m${errorObj.detail}`);
    console.log('\x1B[0m');
    res.status(errorObj.status).json(errorObj);
  } else return next();
};

export const messageHandler = (_: Request, res: Response) => {
  if (res.locals.msg) res.status(200).json(res.locals.msg);
  res.end();
};
