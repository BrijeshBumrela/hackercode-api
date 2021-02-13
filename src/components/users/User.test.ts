import test, { ExecutionContext } from 'ava';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import User from './User.model';
import app from '../../app';
import { IUserRegistration } from './User.types';

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
];

const addUser = async (
    t: ExecutionContext,
    user: IUserRegistration,
    response: string[],
    status: number,
) => {
    const res = await request(app).post('/users').send(user);
    t.true(Object.keys(res.body).length === response.length);
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
