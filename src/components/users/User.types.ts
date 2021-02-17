import { OAuthOptions } from '../auth/Auth.types';
import { IQuestion } from '../questions/Question.types';
import { ISubmission } from '../submissions/Submission.types';

export interface IUser {
    name: string;
    email: string;
    submissions: ISubmission[];
    points: number;
    favorites: IQuestion[];
    salt: string;
    logins: {
        strategy: OAuthOptions;
        identifier: string;
        salt?: string;
    }[];
}

// `identifier` is unique id created by oauth strategies. password in case of standard login

export type IUserRegistration = Pick<IUser, 'name' | 'email'> & {
    identifier: string;
};
export type IUserLogin = Pick<IUser, 'email'> & {
    identifier: string;
};
