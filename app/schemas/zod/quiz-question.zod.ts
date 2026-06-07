import { z } from 'zod';

export const QuestionOptionZodSchema = z.object({
  index: z.number(),
  content: z.string(),
});

export type QuestionOption = z.infer<typeof QuestionOptionZodSchema>;

const BaseQuestionZodSchema = z.object({
  id: z.string(),
  question: z.string(),
});

export const QuizQuestionZodSchema = z.discriminatedUnion('type', [
  BaseQuestionZodSchema.extend({
    type: z.literal('choose-one'),
    body: z.object({
      options: z.array(QuestionOptionZodSchema),
      correctAnswer: z.number(),
    }),
  }),
  BaseQuestionZodSchema.extend({
    type: z.literal('choose-multiple'),
    body: z.object({
      options: z.array(QuestionOptionZodSchema),
      correctAnswer: z.array(z.number()),
    }),
  }),
  BaseQuestionZodSchema.extend({
    type: z.literal('date'),
    body: z.object({
      correctAnswer: z.date(),
    }),
  }),
  BaseQuestionZodSchema.extend({
    type: z.literal('number'),
    body: z.object({
      correctAnswer: z.number(),
    }),
  }),
  BaseQuestionZodSchema.extend({
    type: z.literal('number-range'),
    body: z.object({
      correctAnswer: z.object({
        min: z.number(),
        max: z.number(),
      }),
    }),
  }),
]);

export type QuizQuestion = z.infer<typeof QuizQuestionZodSchema>;
export type QuestionType = QuizQuestion['type'];
