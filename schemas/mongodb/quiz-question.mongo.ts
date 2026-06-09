import { Schema, model, models } from 'mongoose';
import { QuizQuestion } from '../zod/quiz-question.zod';

const QuizQuestionMongoSchema: Schema<QuizQuestion> = new Schema<QuizQuestion>(
  {
    id: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['choose-one', 'choose-multiple', 'date', 'number', 'number-range'],
    },
    body: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

export const QuizQuestionModel =
  models.QuizQuestion ||
  model<QuizQuestion>('QuizQuestion', QuizQuestionMongoSchema);
