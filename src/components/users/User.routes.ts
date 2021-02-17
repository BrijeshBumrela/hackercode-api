import { Router } from 'express';
import { validateInput } from '../../helpers/middleware';
import { IUserRegistration } from './User.types';
import UserCheck from './User.validation';
import { addUser } from './User.service';
import { passportInit } from '../../config/passport';
import passport from 'passport';
const router = Router();
const { nameCheck, emailCheck, passwordCheck } = UserCheck;

passportInit();

router.post(
    '/signup',
    nameCheck(),
    emailCheck(),
    passwordCheck(),
    validateInput,
    async (req, res) => {
        const { name, email, password } = req.body;

        const user: IUserRegistration = {
            name,
            email,
            password,
        };

        try {
            const result = await addUser(user);
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
    passport.authenticate('google', {
        scope: ['profile'],
    }),
);

export default router;
