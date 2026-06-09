import { RHFDataAny } from '@/types/forms.types';
import { QuizFormValues } from '@/schemas/zod/quiz-form.zod';

/**
 * Configuration for the Quiz basic info form.
 * Defines the fields and their properties for the InputsHandler.
 */
export const quizFormConfig: RHFDataAny<QuizFormValues>[] = [
  {
    type: 'input',
    field: 'name',
    label: 'Quiz Name',
    placeholder: 'Enter the name of your quiz',
  },
  {
    type: 'input',
    field: 'author',
    label: 'Author',
    placeholder: 'Enter your name or nickname',
  },
  {
    type: 'textarea',
    field: 'description',
    label: 'Description',
    placeholder: 'What is this quiz about?',
    height: 120,
  },
];
