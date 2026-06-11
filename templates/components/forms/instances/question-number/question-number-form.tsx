'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  QuestionNumberFormSchema,
  QuestionNumberFormValues,
} from '@/schemas/zod/question-number-form.zod';
import { questionNumberFormConfig } from './question-number-form.config';
import ReactHookFormInputsHandler from '@/templates/components/forms/react-hook-form/react-hook-form-inputs-handler/ReactHookFormInputsHandler';
import { Button } from '@/templates/components/ui/button';
import { QuestionSubmitHandler } from '@/types/question.types';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';

import { generateId } from '@/lib/utils/generate-id';

type QuestionNumberFormProps = {
  onSubmit: QuestionSubmitHandler;
  initialValues?: Partial<QuestionNumberFormValues>;
};

export const QuestionNumberForm = ({
  onSubmit,
  initialValues,
}: QuestionNumberFormProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<QuestionNumberFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(QuestionNumberFormSchema) as any,
    defaultValues: {
      question: initialValues?.question || '',
      correctAnswer: initialValues?.correctAnswer || 0,
    },
  });

  const handleFormSubmit = (values: QuestionNumberFormValues) => {
    const questionData: QuizQuestion = {
      id: generateId(),
      type: 'number',
      question: values.question,
      body: {
        correctAnswer: values.correctAnswer,
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
        config={questionNumberFormConfig}
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
