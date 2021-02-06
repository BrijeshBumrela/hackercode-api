import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import { QuestionRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());

app.use('/question', QuestionRouter);

export default app;
