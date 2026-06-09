import { RHFDataAny } from '@/types/forms.types';
import { QuestionDateFormValues } from '@/schemas/zod/question-date-form.zod';

export const questionDateFormConfig: RHFDataAny<QuestionDateFormValues>[] = [
  {
    type: 'input',
    field: 'question',
    label: 'Question',
    placeholder: 'Enter your question',
  },
  {
    type: 'input',
    field: 'correctAnswer',
    label: 'Correct Date',
    placeholder: 'Select the correct date',
    inputType: 'date',
  },
];
