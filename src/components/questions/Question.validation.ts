import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { QuestionRouter } from '../../routes';
import { Testcase, difficultyList } from './Question.model';

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
    return check('examples')
        .isArray()
        .withMessage('examples is not an array')
        .bail()
        .custom((testcases: Testcase[]) => {
            testcases.forEach(testcase => {
                const { input, output, sample } = testcase;
                if (input.length === 0 || output.length === 0)
                    throw new Error('invalid testcase format');
                if (sample && typeof sample !== 'boolean') {
                    throw new TypeError('invalid format for sample');
                }
            });
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

const QuestionCheck = {
    titleCheck,
    descriptionCheck,
    constraintCheck,
    testcaseCheck,
    categoriesCheck,
    difficultyCheck,
    argumentsCheck,
    pointsCheck,
};

export default QuestionCheck;
