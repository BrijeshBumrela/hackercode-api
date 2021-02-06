import test from 'ava';
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

test.beforeEach(async () => {
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
});

test('Question model', t => {
    t.pass();
});

test.afterEach(() => {
    Question.remove();
});
