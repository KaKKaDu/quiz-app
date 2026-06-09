import { z } from 'zod';

export const QuestionChooseOneFormSchema = z.object({
  question: z.string().min(1, 'Question is required'),
  options: z
    .array(
      z.object({
        content: z.string().min(1, 'Option cannot be empty'),
      })
    )
    .min(2, 'At least 2 options are required'),
  correctAnswer: z.string().min(1, 'Please select the correct answer'),
});

export type QuestionChooseOneFormValues = z.infer<
  typeof QuestionChooseOneFormSchema
>;
