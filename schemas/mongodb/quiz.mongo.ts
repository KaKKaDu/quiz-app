import { Schema, model, models } from 'mongoose';
import { Quiz } from '../zod/quiz.zod';

const QuizMongoSchema: Schema<Quiz> = new Schema<Quiz>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: false, default: '' },
    questionIds: { type: [String], required: true },
    resultIds: { type: [String], required: true },
  },
  {
    timestamps: true,
  }
);

export const QuizModel = models.Quiz || model<Quiz>('Quiz', QuizMongoSchema);
