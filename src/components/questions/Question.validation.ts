import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { QuestionRouter } from '../../routes';
import { Testcase, difficultyList, Example } from './Question.model';

const titleCheck = () => {
    const name = 'title';
    const range = {
        min: 4,
        max: 100,
    };

    return check(name)
        .notEmpty()
        .withMessage(`${name} can not be empty`)
        .bail()
        .isLength({ min: range.min, max: range.max })
        .withMessage(
            `${name} must be between ${range.min} to ${range.max} characters long`,
        );
};

const descriptionCheck = () => {
    const name = 'description';
    const range = {
        min: 50,
        max: 400,
    };

    return check(name)
        .notEmpty()
        .withMessage(`${name} can not be empty`)
        .bail()
        .isLength({ min: range.min, max: range.max })
        .withMessage(
            `${name} must be between ${range.min} to ${range.max} characters long`,
        );
};

const constraintCheck = () => {
    return check('constraints').isArray();
};

const testcaseCheck = () => {
    return check('testcases')
        .isArray()
        .withMessage('testcase is not an array')
        .bail()
        .custom((testcases: Testcase[]) => {
            console.log(testcases);
            testcases.forEach(testcase => {
                const { input, output, sample } = testcase;
                if (input.length === 0 || output.length === 0)
                    throw new Error('invalid testcase format');
                if (sample && typeof sample !== 'boolean') {
                    throw new TypeError('invalid format for sample');
                }
            });
            return true;
        });
};

const categoriesCheck = () => {
    return check('categories').isArray();
};

const difficultyCheck = () => {
    return check('difficulty').isIn(difficultyList);
};

const argumentsCheck = () => {
    return check('arguments.*')
        .notEmpty()
        .withMessage('arguments can not be empty');
};

const pointsCheck = () => {
    return check('points').isInt({ min: 1, max: 8 });
};

const examplesCheck = () => {
    return check('examples')
        .isArray()
        .withMessage('examples should be array')
        .bail()
        .custom((examples: Example[]) => {
            examples.forEach(example => {
                const { input, output } = example;
                if (input.length === 0 || output.length === 0) {
                    throw new Error('invalid example');
                }
            });
            return true;
        });
};

const QuestionCheck = {
    titleCheck,
    descriptionCheck,
    constraintCheck,
    testcaseCheck,
    categoriesCheck,
    difficultyCheck,
    argumentsCheck,
    pointsCheck,
    examplesCheck,
};

export default QuestionCheck;
