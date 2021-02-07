import { Router } from 'express';
import * as AuthService from '../lib/auth';
import { ErrorObject, isErrorObject, PlainObject } from '../lib/type';

const router = Router();

router.get('/', (req, res, next) => {
  let user = (req.session as PlainObject).user;
  if (!res.locals.err)
    res.locals.msg = {
      isAuthenticated: user ? true : false,
      user,
    };

  return next();
});

router.post('/request', (req, res, next) => {
  AuthService.waitVerify(req.body.email, (errorObj, id) => {
    if (errorObj) res.locals.err = errorObj;
    else {
      (req.session as PlainObject).user = { email: req.body.email, verifyId: id };
      res.locals.msg = { message: 'Waiting for email confirmation.' };
    }
    next();
  });
});

router.get('/signin/:id', async (req, res, next) => {
  AuthService.signin((req.session as PlainObject).user.email, req.params.id)
    .then(u => {
      res.locals.msg = { isAuthenticated: true, user: u };
      (req.session as PlainObject).user = u;
    })
    .catch(
      error =>
        (res.locals.err = isErrorObject(error)
          ? error
          : ({
              error: 'Failed to authenticate. Internal error.',
              status: 500,
              detail: error,
            } as ErrorObject))
    )
    .finally(() => next());
});

router.get('/signout', (req, res, next) =>
  req.session.destroy(error => {
    if (error) res.locals.err = { error };
    else res.locals.msg = { isAuthenticated: false };
    return next();
  })
);

const authRouter = router;
export default authRouter;
