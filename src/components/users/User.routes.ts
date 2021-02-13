import { Router } from 'express';
import UserCheck from './User.validation';

const router = Router();
const { validateInput, nameCheck, emailCheck, passwordCheck } = UserCheck;

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
