import { RHFDataAny } from '@/types/forms.types';
import { QuestionChooseMultipleFormValues } from '@/schemas/zod/question-choose-multiple-form.zod';

export const questionChooseMultipleFormConfig: RHFDataAny<QuestionChooseMultipleFormValues>[] =
  [
    {
      type: 'input',
      field: 'question',
      label: 'Question',
      placeholder: 'Enter your question',
    },
  ];
