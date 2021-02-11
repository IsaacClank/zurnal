import { Router } from 'express';

const router = Router();

router.get('/', (_, res, next) => {
  res.locals.msg = {
    message: 'Hello World!',
  };
  return next();
});

export { router as indexRouter };
