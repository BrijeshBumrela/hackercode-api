import test, { ExecutionContext } from 'ava';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import User from './User.model';
import app from '../../app';

const mongod = new MongoMemoryServer();

test.before(async () => {
    const uri = await mongod.getUri();
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

test.after.always(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

test.afterEach.always(() => User.deleteMany());

const users = [
    {
        name: 'validName',
        email: 'valid@gmail.com',
        password: 'validPassword123',
        status: 201,
        response: ['user successfully created'],
    },
    {
        name: 'nope',
        email: 'valid@gmail.com',
        password: 'validPassword123',
        status: 400,
        response: ['name must be between 6 to 32 characters'],
    },
    {
        name: 'brijesh',
        email: 'invalid@gmailcom',
        password: 'validPassword123',
        status: 400,
        response: ['invalid email address'],
    },
    {
        name: 'brijesh',
        email: 'valid@gmail.com',
        password: 'nonumbersorspecialcharacters',
        status: 400,
        response: ['password must contain atleast one number'],
    },
    {
        name: 'brijesh',
        email: 'valid@gmail.com',
        password: 'small',
        status: 400,
        response: ['password must be between 6 to 32 characters'],
    },
    {
        name: 'less',
        email: 'invalid@gmailcom',
        password: 'validPassword123',
        status: 400,
        response: [
            'name must be between 6 to 32 characters',
            'invalid email address',
        ],
    },
];

// Signup code

const addUser = async (
    t: ExecutionContext,
    user: string | object | undefined,
    response: string[],
    status: number,
) => {
    const res = await request(app).post('/users/signup').send(user);
    if (res.status === 400) {
        t.true(Object.keys(res.body.errors).length === response.length);
    }
    t.true(res.status === status);
};

users.forEach((user, index) => {
    const { response, status, ...rest } = user;
    test.serial(
        `validating user inputs for sample ${index}`,
        addUser,
        rest,
        response,
        status,
    );
});

// Login code

const userslogin = [
    {
        email: 'valid@gmail.com',
        password: 'validPassword123',
        status: 200,
        response: ['user successfully logged in'],
    },
    {
        email: '',
        password: 'validPassword123',
        status: 400,
        response: ['invalid email address'],
    },
    {
        email: 'valid@gmail.com',
        password: 'nonumbersorspecialcharacters',
        status: 400,
        response: ['password must contain atleast one number'],
    },
    {
        email: 'valid@gmail.com',
        password: '',
        status: 400,
        response: ['password must be between 6 to 32 characters'],
    },
    {
        email: 'invalid@gmailcom',
        password: null,
        status: 400,
        response: [
            'name must be between 6 to 32 characters',
            'invalid email address',
        ],
    },
];

const loginUser = async (
    t: ExecutionContext,
    user: string | object | undefined,
    response: string[],
    status: number,
) => {
    const res = await request(app).post('/users/login').send(user);
    if (res.status === 400) {
        t.true(Object.keys(res.body.errors).length === response.length);
    }
    t.true(res.status === status);
};

userslogin.forEach((user, index) => {
    const { response, status, ...rest } = user;
    test.serial(
        `validating login inputs for sample ${index}`,
        loginUser,
        rest,
        response,
        status,
    );
});
