import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validateInput = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const validationErrors: { [key: string]: string } = {};
        errors.array().forEach(arr => {
            validationErrors[arr.param] = arr.msg;
        });
        return res.status(400).send({ errors: validationErrors });
    }

    next();
};

export { validateInput };
