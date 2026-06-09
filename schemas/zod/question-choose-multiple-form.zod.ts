import { z } from 'zod';

export const QuestionChooseMultipleFormSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  options: z
    .array(
      z.object({
        content: z.string().min(1, 'Option cannot be empty'),
      })
    )
    .min(2, 'At least 2 options are required'),
  correctAnswer: z
    .array(z.string())
    .min(1, 'Select at least one correct answer'),
});

export type QuestionChooseMultipleFormValues = z.infer<
  typeof QuestionChooseMultipleFormSchema
>;
