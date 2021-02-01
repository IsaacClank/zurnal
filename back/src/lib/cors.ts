import cors from 'cors';
import { corsOrigin } from '../config';

export const corsService = cors({
  origin: corsOrigin,
});
