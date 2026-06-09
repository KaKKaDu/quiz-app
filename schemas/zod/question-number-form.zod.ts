import { z } from 'zod';

export const QuestionNumberFormSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  correctAnswer: z.coerce.number(),
});

export type QuestionNumberFormValues = z.infer<typeof QuestionNumberFormSchema>;
