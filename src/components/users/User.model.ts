import mongoose, { Schema } from 'mongoose';
import { IUser } from './User.types';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: 0,
    },
    token: String,
    salt: String,
    submissions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Submission',
        },
    ],
    points: {
        type: Number,
        default: 0,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question',
        },
    ],
});

interface StringKeyOnly {
    [key: string]: any;
}

interface IModelUser extends IUser, mongoose.Document, StringKeyOnly {}

const User = mongoose.model<IModelUser>('User', UserSchema);
export default User;
