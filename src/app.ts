import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import { QuestionRouter, UserRouter } from './routes';

const app = express();
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());

app.use('/question', QuestionRouter);
app.use('/users', UserRouter);

export default app;
