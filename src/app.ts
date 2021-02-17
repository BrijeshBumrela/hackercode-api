import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import passport from 'passport';
import cookieSession from 'cookie-session';
import dotenv from 'dotenv';

// Always keep dotenv before, if you have any env variables used in the init script of the app
dotenv.config();

import { AuthRouter, QuestionRouter } from './routes';

const app = express();

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [process.env.SESSION_KEY!],
    }),
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/question', QuestionRouter);
app.use('/auth', AuthRouter);

export default app;
