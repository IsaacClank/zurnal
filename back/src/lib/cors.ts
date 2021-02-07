import cors from 'cors';
import { corsOrigin } from '../config';

const corsService = () =>
  cors({
    origin: corsOrigin,
    optionsSuccessStatus: 204,
    credentials: true,
  });

export default corsService;
