import { Router } from 'express';
import { validationResult } from 'express-validator';

import { getAllQuestions, updateQuestion } from './Question.service';
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
    examplesCheck,
    idCheck,
} = questionCheck;

const router = Router();

router.get('/', async (req, res) => {
    const questions = await getAllQuestions();
    return res.status(200).send(questions);
});

router.patch(
    '/:id',
    idCheck(),
    titleCheck(),
    descriptionCheck(),
    constraintCheck(),
    testcaseCheck(),
    categoriesCheck(),
    difficultyCheck(),
    argumentsCheck(),
    pointsCheck(),
    examplesCheck(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const validationErrors: { [key: string]: string } = {};
            errors.array().forEach(arr => {
                validationErrors[arr.param] = arr.msg;
            });
            return res.status(400).send(validationErrors);
        }

        try {
            await updateQuestion(req.params!.id, req.body);
            return res
                .status(200)
                .send({ message: 'question sucessfully updated' });
        } catch (e) {
            return res.status(500).send({ message: e.message });
        }
    },
);

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
    examplesCheck(),
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
