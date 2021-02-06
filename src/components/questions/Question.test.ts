import test, { ExecutionContext } from 'ava';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import Question, { IQuestion } from './Question.model';
import app from '../../app';
import { stat } from 'fs';

const mongod = new MongoMemoryServer();

test.before(async () => {
    const uri = await mongod.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

const createValidQuestion = async () => {
    const question = new Question({
        description: 'description about my question',
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
    });

    await question.save();
};

test.afterEach.always(() => Question.deleteMany());

test.after.always(async () => {
    mongoose.disconnect();
    mongod.stop();
});

test('It should return 200 status when getting all questions', async t => {
    await createValidQuestion();
    const res = await request(app).get('/question');
    t.true(res.status === 200);
});

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
