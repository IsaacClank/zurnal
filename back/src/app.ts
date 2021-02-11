import express from 'express';
import compression from 'compression';
import corsService from './lib/cors';
import sessionManager from './lib/session';
import { port } from './config';
import { errorHandler, messageHandler } from './lib/utils';
import { authRouter } from './routers/authRouter';
import { indexRouter } from './routers';
import { journalRouter } from './routers/journalRouter';
import { gameRouter } from './routers/gameRouter';

const app = express();

app.use(corsService());
app.use(sessionManager());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/journal', journalRouter);
app.use('/game', gameRouter);

app.use(errorHandler);
app.use(messageHandler);

app.listen(port, () => {
  console.clear();
  console.log(`\nServer running at http://localhost:${port}\n`);
});
