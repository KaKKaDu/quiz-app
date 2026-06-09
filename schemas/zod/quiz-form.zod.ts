import { z } from 'zod';

/**
 * Zod schema for the basic Quiz information.
 * Used for form validation and type inference.
 */
export const QuizFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  author: z.string().min(2, 'Author name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

export type QuizFormValues = z.infer<typeof QuizFormSchema>;
