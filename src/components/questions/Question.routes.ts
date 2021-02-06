import { Router } from 'express';
import { validationResult, check } from 'express-validator';

import { getAllQuestions } from './Question.service';
import questionCheck from './Question.validation';

const {
    titleCheck,
    descriptionCheck,
    constraintCheck,
    testcaseCheck,
    categoriesCheck,
    difficultyCheck,
    argumentsCheck,
    pointsCheck,
} = questionCheck;

const router = Router();

router.get('/', async (req, res) => {
    const questions = await getAllQuestions();
    return res.status(200).send(questions);
});

router.post(
    '/',
    titleCheck(),
    descriptionCheck(),
    constraintCheck(),
    testcaseCheck(),
    categoriesCheck(),
    difficultyCheck(),
    argumentsCheck(),
    pointsCheck(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const validationErrors: { [key: string]: string } = {};
            errors.array().forEach(arr => {
                validationErrors[arr.param] = arr.msg;
            });
            return res.status(400).send(validationErrors);
        }

        return res.status(201).send({ message: 'created succesfully' });
    },
);

export default router;
