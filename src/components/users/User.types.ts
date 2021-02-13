import { IsAlphaOptions } from 'express-validator/src/options';
import { IQuestion } from '../questions/Question.types';
import { ISubmission } from '../submissions/Submission.types';

export interface IUser {
    name: string;
    email: string;
    token: string;
    salt: string;
    submissions: ISubmission[];
    points: number;
    favorites: IQuestion[];
    password: string;
}

export type IUserRegistration = Pick<IUser, 'name' | 'email' | 'password'>;
export type IUserLogin = Pick<IUser, 'email' | 'password'>;
