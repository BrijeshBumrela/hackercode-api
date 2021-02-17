import { Router } from 'express';
import { validateInput } from '../../helpers/middleware';
import { IUserRegistration } from '../users/User.types';
import UserCheck from './Auth.validation';
import { register } from '../users/User.service';
import { passportInit } from '../../services/passport';
import passport from 'passport';
import { OAuthOptions } from './Auth.types';

const router = Router();
const { nameCheck, emailCheck, passwordCheck } = UserCheck;

router.post(
    '/signup',
    nameCheck(),
    emailCheck(),
    passwordCheck(),
    validateInput,
    async (req, res) => {
        const { name, email, password: identifier } = req.body;

        const user: IUserRegistration = {
            name,
            email,
            identifier,
        };

        try {
            const result = await register(user, OAuthOptions.LOCAL);
            return res
                .status(201)
                .send({ message: 'created succesfully', value: result });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    },
);

router.post(
    '/login',
    emailCheck(),
    passwordCheck(),
    validateInput,
    async (req, res) => {
        return res.status(200).send({ message: 'user successfully logged in' });
    },
);

router.get(
    '/google',
    (req, res, next) => {
        passportInit();
        next();
    },
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
    '/google/redirect',
    (req, res, next) => {
        passportInit();
        next();
    },
    passport.authenticate('google'),
    (req, res) => {
        res.send('logged in');
    },
);

export default router;
