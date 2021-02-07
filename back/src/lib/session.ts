import session from 'express-session';
import { redisSecret } from '../config';
import RedisClient from './redisClient';

let RedisStore = require('connect-redis')(session);
let redisClient = RedisClient();

const sessionManager = () =>
  session({
    store: new RedisStore({ client: redisClient }),
    secret: redisSecret as string,
    resave: false,
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000,
      sameSite: 'lax',
    },
    name: 'peepoSad',
    saveUninitialized: false,
    unset: 'destroy',
  });

export default sessionManager;
