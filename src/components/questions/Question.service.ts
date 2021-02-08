import Question, { IQuestion } from './Question.model';

const getAllQuestions = async () => {
    try {
        const questions = await Question.find(
            {},
            'title submissions categories difficulty',
        );
        return questions;
    } catch (e) {}
};

const updateQuestion = async (id: string, updatedData: IQuestion) => {
    const question = await Question.findById(id);
    if (!question) throw new Error('Question not found');

    Object.entries(updatedData).forEach(
        ([key, value]) => (question[key] = value),
    );

    try {
        await question.save();
        return question;
    } catch (e) {
        throw new Error(e.message);
    }
};

export { getAllQuestions, updateQuestion };
