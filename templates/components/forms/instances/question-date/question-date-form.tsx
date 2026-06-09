'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  QuestionDateFormSchema,
  QuestionDateFormValues,
} from '@/schemas/zod/question-date-form.zod';
import { questionDateFormConfig } from './question-date-form.config';
import ReactHookFormInputsHandler from '@/templates/components/forms/react-hook-form/react-hook-form-inputs-handler/ReactHookFormInputsHandler';
import { Button } from '@/templates/components/ui/button';
import { QuestionSubmitHandler } from '@/types/question.types';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { generateId } from '@/lib/utils';

type QuestionDateFormProps = {
  onSubmit: QuestionSubmitHandler;
  initialValues?: Partial<QuestionDateFormValues>;
};

export const QuestionDateForm = ({
  onSubmit,
  initialValues,
}: QuestionDateFormProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<QuestionDateFormValues>({
    resolver: zodResolver(QuestionDateFormSchema),
    defaultValues: {
      question: initialValues?.question || '',
      correctAnswer: initialValues?.correctAnswer || new Date(),
    },
  });

  const handleFormSubmit = (values: QuestionDateFormValues) => {
    const questionData: QuizQuestion = {
      id: generateId(),
      type: 'date',
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
        config={questionDateFormConfig}
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
