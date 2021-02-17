import { check } from 'express-validator';

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
    nameCheck,
    emailCheck,
    passwordCheck,
};

export default UserCheck;
