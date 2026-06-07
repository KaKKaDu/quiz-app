import { Schema, model, models } from 'mongoose';
import { QuizResults } from '../zod/quiz-results.zod';

const QuizMistakeMongoSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['choose-one', 'choose-multiple', 'date', 'number', 'number-range'],
    },
    questionId: { type: String, required: true },
    wrongAnswer: { type: Schema.Types.Mixed, required: true },
  },
  { _id: false }
);

const QuizResultsMongoSchema: Schema<QuizResults> = new Schema<QuizResults>(
  {
    id: { type: String, required: true, unique: true },
    quizId: { type: String, required: true },
    participantName: { type: String, required: true },
    score: { type: Number, required: true },
    mistakes: { type: [QuizMistakeMongoSchema], required: true },
  },
  {
    timestamps: true,
  }
);

export const QuizResultsModel =
  models.QuizResults ||
  model<QuizResults>('QuizResults', QuizResultsMongoSchema);
