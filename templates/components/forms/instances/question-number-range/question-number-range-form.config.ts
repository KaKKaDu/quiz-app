import { RHFDataAny } from '@/types/forms.types';
import { QuestionNumberRangeFormValues } from '@/schemas/zod/question-number-range-form.zod';

export const questionNumberRangeFormConfig: RHFDataAny<QuestionNumberRangeFormValues>[] =
  [
    {
      type: 'input',
      field: 'question',
      label: 'Question',
      placeholder: 'Enter your question',
    },
    {
      type: 'input',
      field: 'min',
      label: 'Min Value',
      placeholder: 'Enter the minimum value',
      inputType: 'number',
    },
    {
      type: 'input',
      field: 'max',
      label: 'Max Value',
      placeholder: 'Enter the maximum value',
      inputType: 'number',
    },
  ];
