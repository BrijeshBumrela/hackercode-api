import { Router } from 'express';
import { validateInput } from '../../helpers/middleware';
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
    validateInput,
    async (req, res) => {
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
    validateInput,
    async (req, res) => {
        return res.status(201).send({ message: 'created succesfully' });
    },
);

export default router;
