import { Router } from 'express';
import { validateInput } from '../../helpers/middleware';
import UserCheck from './User.validation';

const router = Router();
const { nameCheck, emailCheck, passwordCheck } = UserCheck;

router.post(
    '/',
    nameCheck(),
    emailCheck(),
    passwordCheck(),
    validateInput,
    async (req, res) => {
        return res.status(201).send({ message: 'created succesfully' });
    },
);

export default router;
