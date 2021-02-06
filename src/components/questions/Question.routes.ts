import { Router } from 'express';

import { getAllQuestions } from './Question.service';
const router = Router();

router.get('/', async (req, res) => {
    const questions = await getAllQuestions();
    return res.status(200).send(questions);
});

export default router;
