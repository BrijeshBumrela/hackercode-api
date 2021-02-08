import test, { ExecutionContext } from 'ava';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import Question, { IQuestion } from './Question.model';
import app from '../../app';

const mongod = new MongoMemoryServer();

test.before(async () => {
    const uri = await mongod.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

const validQuestionData = {
    description:
        'description about my question how does this passed test all the time',
    examples: [
        {
            input: '1, 2, 3',
            output: '6',
        },
        {
            input: '2, 3',
            output: '5',
        },
    ],
    categories: ['dynamic programming', 'recursion'],
    constraints: ['1 < N < 10^6'],
    difficulty: 'easy',
    testcases: [
        { input: '5 10', output: '15' },
        { input: '11 -1', output: '10' },
    ],
    argumentTypes: ['num1', 'num2'],
    points: 1,
    title: 'sum of two numbers',
};

const validQuestionData2 = {
    description:
        'updated description about my question make it longer make it longer yeah yeah yeah',
    examples: [
        {
            input: '1, 2, 5',
            output: '6',
        },
        {
            input: '2, 3',
            output: '5',
        },
    ],
    categories: ['greedy', 'recursion'],
    constraints: ['1 < N < 10^6'],
    difficulty: 'easy',
    testcases: [
        { input: '5 10', output: '15' },
        { input: '11 -1', output: '10' },
    ],
    argumentTypes: ['num1', 'num2'],
    points: 1,
    title: 'sum of two numbers',
};

const createValidQuestion = async () => {
    const question = new Question(validQuestionData);
    await question.save();
    return question;
};

test.afterEach.always(() => Question.deleteMany());

test.after.always(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

test.serial(
    'It should return 200 status when getting all questions',
    async t => {
        await createValidQuestion();
        const res = await request(app).get('/question');
        t.true(res.status === 200);
    },
);

test.serial(
    'It should have title property when getting all questions',
    async t => {
        await createValidQuestion();
        const res = await request(app).get('/question');
        t.true(res.body[0].title !== undefined);
    },
);

test.serial(
    'It should not have likes property when getting all questions',
    async t => {
        await createValidQuestion();
        const res = await request(app).get('/question');
        t.true(res.body[0].likes === undefined);
    },
);

test.serial(
    'It should throw error when invalid mongo id is passed when updating the question',
    async t => {
        const question = await createValidQuestion();
        const res = await request(app)
            .patch(`/question/${'some-gibberish'}`)
            .send({});
        t.true(res.status === 400);
    },
);

test.serial(
    'It should succesfully update the question when valid id is passed',
    async t => {
        const question = await createValidQuestion();
        const res = await request(app)
            .patch(`/question/${question._id}`)
            .send(validQuestionData2);
        t.true(res.status === 200);

        const getRes = await request(app).get('/question');
        t.true(getRes.body[0].title === validQuestionData2.title);
    },
);

test('It should return 400 status when posting question with no data', async t => {
    const res = await request(app).post('/question').send({});
    t.true(res.status === 400);
});

const postQuestion = async (
    t: ExecutionContext,
    question: object | undefined = {},
    status: number,
) => {
    const res = await request(app).post('/question').send(question);
    t.true(res.status === status);
};

for (const question of [
    {
        description: `description about my question it should go more than 
            50 characters that's why I'm writing some gibberish`,
        examples: [
            {
                input: '1, 2, 3',
                output: '6',
            },
            {
                input: '2, 3',
                output: '5',
            },
        ],
        categories: ['dynamic programming', 'recursion'],
        constraints: ['1 < N < 10^6'],
        difficulty: 'easy',
        testcases: [
            { input: '5 10', output: '15' },
            { input: '11 -1', output: '10' },
        ],
        argumentTypes: ['num1', 'num2'],
        points: 1,
        title: 'sum of two numbers',
    },
]) {
    test('validating question inputs', postQuestion, question, 201);
}
