import { IQuestion } from '../questions/Question.types';

interface StringKeyOnly {
    [key: string]: any;
}

export enum Language {
    JAVASCRIPT = 'JAVASCRIPT',
    PYTHON = 'PYTHON',
}

export const answerStatus = [
    'ACCEPTED',
    'TLE',
    'COMPILE_ERROR',
    'RUNTIME_ERROR',
];

export enum AnswerStatus {
    ACCEPTED = 'ACCEPTED',
    TLE = 'TLE',
    COMPILE_ERROR = 'COMPILE_ERROR',
    RUNTIME_ERROR = 'RUNTIME_ERROR',
}

export interface ISubmission {
    question: IQuestion;
    code: string;
    status: AnswerStatus;
    submitted_at: Date;
    runtime: number;
    language: Language;
}
