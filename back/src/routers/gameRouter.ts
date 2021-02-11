import { Router } from 'express';

import * as GameService from '../lib/game';
import { ErrorObject } from '../lib/type';

const router = Router();

router.get('/', async (req, res, next) => {
  const title = req.query.title;
  console.log(title);
  try {
    let results = title ? await GameService.search(title as string) : await GameService.getAll();
    res.locals.msg = { games: results };
  } catch (err) {
    res.locals.err = {
      status: 500,
      error: 'Failed to retrive list of games',
      detail: err,
    } as ErrorObject;
  } finally {
    next();
  }
});

export { router as gameRouter };
