import mongoose, { mongo } from 'mongoose';

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
        enum: ['beginner', 'easy', 'medium', 'hard', 'expert'],
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

export interface Example {
    input: string;
    output: string;
}

// Reasoning behind making output as array because
// some questions might have more than 1 thing as output
export interface Testcase {
    input: string[];
    output: string[];
    sample: boolean;
}

export const difficultyList = ['beginner', 'easy', 'medium', 'hard', 'expert'];

export enum Difficulty {
    HARD = 'hard',
    MEDIUM = 'medium',
    EASY = 'easy',
    BEGINNER = 'beginner',
    EXPERT = 'expert',
}

interface StringKeyOnly {
    [key: string]: any;
}

export interface IQuestion extends mongoose.Document, StringKeyOnly {
    title: string;
    description: string;
    constraints: string[];
    examples: Example[];
    categories: string[];
    difficulty: Difficulty;
    testcases: Testcase[];
    argumentTypes: string[];
    points: number;
}

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
