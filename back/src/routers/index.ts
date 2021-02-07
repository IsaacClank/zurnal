import { Router } from 'express';

const router = Router();

router.get('/', (_, res, next) => {
  res.locals.msg = {
    message: 'Hello World!',
  };
  return next();
});

const indexRouter = router;
export default indexRouter;
