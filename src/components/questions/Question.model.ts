import mongoose from 'mongoose';
import { difficultyList, IQuestion } from './Question.types';

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    constraints: [{ type: String }],
    examples: [{ input: String, output: String }],
    submissions: {
        type: Number,
        default: 0,
    },
    categories: [{ type: String }],
    difficulty: {
        type: String,
        enum: difficultyList,
        required: true,
    },
    testcases: [
        {
            input: String,
            output: String,
            sample: {
                type: Boolean,
                default: false,
                required: true,
            },
        },
    ],
    argumentTypes: [{ type: String }],
    points: {
        type: Number,
        required: true,
    },
});

interface IQuestionModel extends IQuestion, mongoose.Document {}

const Question = mongoose.model<IQuestionModel>('Question', QuestionSchema);
export default Question;
