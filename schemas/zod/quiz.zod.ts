import { z } from 'zod';
import { QuizQuestionZodSchema } from './quiz-question.zod';
import { QuizResultsZodSchema } from './quiz-results.zod';

const QuizBaseZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  description: z.string().optional(),
});

export const QuizZodSchema = QuizBaseZodSchema.extend({
  questionIds: z.array(z.string()),
  resultIds: z.array(z.string()),
});

export type Quiz = z.infer<typeof QuizZodSchema>;

export const QuizFullZodSchema = QuizBaseZodSchema.extend({
  data: z.array(QuizQuestionZodSchema),
  results: z.array(QuizResultsZodSchema),
});

export type QuizFull = z.infer<typeof QuizFullZodSchema>;
