import { Game } from '@prisma/client';
import { Router } from 'express';

import * as JournalService from '../lib/journal';
import { ErrorObject, PlainObject } from '../lib/type';

const router = Router();

router.get('/', async (req, res, next) => {
  let sessUser = (req.session as PlainObject).user;
  JournalService.get(sessUser.email as string)
    .then(
      journals =>
        (res.locals.msg = {
          journals: journals,
        })
    )
    .catch(
      err =>
        ({
          status: 500,
          detail: err,
          error: 'Failed to retrieve journals',
        } as ErrorObject)
    )
    .finally(() => next());
});

router.post('/new', (req, res, next) => {
  let sessUser = (req.session as PlainObject).user;
  let details = req.body.details as PlainObject;
  let game = req.body.game as Game;

  JournalService.create(sessUser, details, game)
    .then(j => (res.locals.msg = { newJournal: j }))
    .catch(
      err =>
        (res.locals.err = {
          status: 500,
          error: 'Failed to create new journal',
          detail: err,
        } as ErrorObject)
    )
    .finally(() => next());
});

export { router as journalRouter };
