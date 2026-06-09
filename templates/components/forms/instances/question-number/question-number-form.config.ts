import { RHFDataAny } from '@/types/forms.types';
import { QuestionNumberFormValues } from '@/schemas/zod/question-number-form.zod';

export const questionNumberFormConfig: RHFDataAny<QuestionNumberFormValues>[] =
  [
    {
      type: 'input',
      field: 'question',
      label: 'Question',
      placeholder: 'Enter your question',
    },
    {
      type: 'input',
      field: 'correctAnswer',
      label: 'Correct Answer',
      placeholder: 'Enter the correct number',
      inputType: 'number',
    },
  ];
