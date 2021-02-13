import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

const validateInput = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const validationErrors: { [key: string]: string } = {};
        errors.array().forEach(arr => {
            validationErrors[arr.param] = arr.msg;
        });
        return res.status(400).send(validationErrors);
    }

    next();
};

const nameCheck = () => {
    return check('name')
        .notEmpty()
        .withMessage('name must be between 6 to 32 characters')
        .bail()
        .isLength({ min: 6, max: 32 })
        .withMessage('name must be between 6 to 32 characters')
        .bail();
};

const emailCheck = () => {
    return check('email').isEmail().withMessage('invalid email address');
};

const passwordCheck = () => {
    return check('password')
        .notEmpty()
        .withMessage('password must be between 6 to 32 characters')
        .bail()
        .isLength({ min: 6, max: 32 })
        .withMessage('password must be between 6 to 32 characters')
        .bail()
        .matches(/\d/)
        .withMessage('password must contain atleast one number');
};

const UserCheck = {
    validateInput,
    nameCheck,
    emailCheck,
    passwordCheck,
};

export default UserCheck;
