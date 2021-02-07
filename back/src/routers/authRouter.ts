import { Router } from 'express';
import { PlainObject } from '../type';
import * as AuthService from '../lib/auth';

const router = Router();

router.get('/', (req, res, next) => {
  let user = (req.session as PlainObject).user;
  if (!res.locals.err)
    res.locals.msg = {
      authentication: user ? true : false,
      user,
    };

  return next();
});

router.post('/request', (req, res, next) => {
  let verifyId = AuthService.waitVerify(req.body.email);
  (req.session as PlainObject).user = { email: req.body.email, verifyId };
  res.locals.msg = { message: 'Waiting for email confirmation' };
  return next();
});

router.post('/signin', async (req, res, next) =>
  AuthService.signin((req.session as PlainObject).user.email, req.body.verifyId)
    .then(info => {
      (req.session as PlainObject).user = info;
      res.locals.msg = { authenticated: true };
    })
    .catch(error => res.locals.err({ authenticated: false, error }))
    .finally(() => next())
);

router.get('/signout', (req, res, next) =>
  req.session.destroy(error => {
    if (error) res.locals.err = { error };
    else res.locals.msg = { authentication: false };
    return next();
  })
);

const authRouter = router;
export default authRouter;
