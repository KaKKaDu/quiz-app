import { z } from 'zod';

export const QuestionNumberRangeFormSchema = z
  .object({
    question: z.string().min(1, 'Question is required'),
    min: z.coerce.number(),
    max: z.coerce.number(),
  })
  .refine((data) => data.max >= data.min, {
    message: 'Max value must be greater than or equal to min value',
    path: ['max'],
  });

export type QuestionNumberRangeFormValues = z.infer<
  typeof QuestionNumberRangeFormSchema
>;
