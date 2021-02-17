import crypto from 'crypto';
import User from './User.model';
import { IUserRegistration } from './User.types';
import { OAuthOptions } from '../auth/Auth.types';

const register = async (user: IUserRegistration, type: OAuthOptions) => {
    const { email, name } = user;
    let { identifier } = user;

    const newUser = new User();

    if (type === OAuthOptions.LOCAL) {
        const salt = crypto.randomBytes(16).toString('hex');
        identifier = crypto
            .pbkdf2Sync(identifier, salt, 1000, 64, `sha512`)
            .toString('hex');
    }

    newUser.email = email;
    newUser.name = name;
    newUser.logins.push({
        strategy: type,
        identifier,
    });

    try {
        await newUser.save();
        return user;
    } catch (e) {
        throw new Error(e);
    }
};

export { register };
