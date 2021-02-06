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
    testcases: [{ input: String, output: String }],
    argumentTypes: [{ type: String }],
    points: {
        type: Number,
        required: true,
    },
});

interface Example {
    input: string;
    output: string;
}

// Reasoning behind making output as array because
// some questions might have more than 1 thing as output
interface Testcase {
    input: string[];
    output: string[];
}

enum Difficulty {
    HARD = 'hard',
    MEDIUM = 'medium',
    EASY = 'easy',
    BEGINNER = 'beginner',
    EXPERT = 'expert',
}

export interface IQuestion extends mongoose.Document {
    title: string;
    description: string;
    constraints: string[];
    examples: Example[];
    categories: string[];
    difficulty: Difficulty;
    testcases: Testcase[];
    arguments: string[];
    points: number;
}

const Question = mongoose.model<IQuestion>('Question', QuestionSchema);
export default Question;
