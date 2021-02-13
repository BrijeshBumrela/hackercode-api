
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

export interface IQuestion extends StringKeyOnly {
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