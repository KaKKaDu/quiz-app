import { RHFDataAny } from '@/types/forms.types';
import { QuestionChooseOneFormValues } from '@/schemas/zod/question-choose-one-form.zod';

export const questionChooseOneFormConfig: RHFDataAny<QuestionChooseOneFormValues>[] =
  [
    {
      type: 'input',
      field: 'question',
      label: 'Question',
      placeholder: 'Enter your question',
    },
  ];
