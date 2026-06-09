import { z } from 'zod';

export const QuestionDateFormSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.date(),
});

export type QuestionDateFormValues = z.infer<typeof QuestionDateFormSchema>;
