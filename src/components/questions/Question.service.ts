import Question from './Question.model';

const getAllQuestions = async () => {
    try {
        const questions = await Question.find();
        return questions;
    } catch (e) {
        console.log(e);
    }
};

export { getAllQuestions };
