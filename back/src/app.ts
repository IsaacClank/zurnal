import express from 'express';
import { port } from './config';
import compression from 'compression';
import { corsService } from './lib/cors';
import { errorHandler, messageHandler } from './lib/utils';

const app = express();

app.use(corsService);
// TODO: session manager
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.get('/', (_, res, next) => {
  res.locals.msg = {
    message: 'Hello World!',
  };
  return next();
});

app.use(errorHandler);
app.use(messageHandler);

app.listen(port, () => {
  console.log(`\nServer running at http://localhost:${port}\n`);
});
