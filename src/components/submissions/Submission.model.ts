import mongoose, { Schema } from 'mongoose';
import { answerStatus, ISubmission } from './Submission.types';

const SubmissionSchema = new mongoose.Schema({
    question: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
    },
    code: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: answerStatus,
        required: true,
    },
});

interface StringKeyOnly {
    [key: string]: any;
}

interface IModelSubmission
    extends ISubmission,
        mongoose.Document,
        StringKeyOnly {}

const Submission = mongoose.model<IModelSubmission>(
    'Submission',
    SubmissionSchema,
);
export default Submission;
