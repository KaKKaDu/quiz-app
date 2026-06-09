'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  QuestionNumberRangeFormSchema,
  QuestionNumberRangeFormValues,
} from '@/schemas/zod/question-number-range-form.zod';
import { questionNumberRangeFormConfig } from './question-number-range-form.config';
import ReactHookFormInputsHandler from '@/templates/components/forms/react-hook-form/react-hook-form-inputs-handler/ReactHookFormInputsHandler';
import { Button } from '@/templates/components/ui/button';
import { QuestionSubmitHandler } from '@/types/question.types';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { generateId } from '@/lib/utils';

type QuestionNumberRangeFormProps = {
  onSubmit: QuestionSubmitHandler;
  initialValues?: Partial<QuestionNumberRangeFormValues>;
};

export const QuestionNumberRangeForm = ({
  onSubmit,
  initialValues,
}: QuestionNumberRangeFormProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<QuestionNumberRangeFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(QuestionNumberRangeFormSchema) as any,
    defaultValues: {
      question: initialValues?.question || '',
      min: initialValues?.min || 0,
      max: initialValues?.max || 0,
    },
  });

  const handleFormSubmit = (values: QuestionNumberRangeFormValues) => {
    const questionData: QuizQuestion = {
      id: generateId(),
      type: 'number-range',
      question: values.question,
      body: {
        correctAnswer: {
          min: values.min,
          max: values.max,
        },
      },
    };
    onSubmit(questionData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex w-full flex-col gap-8"
    >
      <ReactHookFormInputsHandler
        config={questionNumberRangeFormConfig}
        register={register}
        control={control}
        errors={errors}
      />

      <div className="flex justify-end">
        <Button type="submit">Save Question</Button>
      </div>
    </form>
  );
};
