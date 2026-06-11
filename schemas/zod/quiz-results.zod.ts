import { z } from 'zod';

export const QuizMistakeZodSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('choose-one'),
    questionId: z.string(),
    wrongAnswer: z.number(),
  }),
  z.object({
    type: z.literal('choose-multiple'),
    questionId: z.string(),
    wrongAnswer: z.array(z.number()),
  }),
  z.object({
    type: z.literal('date'),
    questionId: z.string(),
    wrongAnswer: z.date(),
  }),
  z.object({
    type: z.literal('number'),
    questionId: z.string(),
    wrongAnswer: z.number(),
  }),
  z.object({
    type: z.literal('number-range'),
    questionId: z.string(),
    wrongAnswer: z.number(),
  }),
]);

export type QuizMistake = z.infer<typeof QuizMistakeZodSchema>;

export const QuizResultsZodSchema = z.object({
  id: z.string(),
  quizId: z.string(),
  participantName: z.string(),
  score: z.number(),
  mistakes: z.array(QuizMistakeZodSchema),
});

export type QuizResults = z.infer<typeof QuizResultsZodSchema>;
