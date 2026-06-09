'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { QuizFormSchema, QuizFormValues } from '@/schemas/zod/quiz-form.zod';
import { quizFormConfig } from './quiz-form.config';
import ReactHookFormInputsHandler from '@/templates/components/forms/react-hook-form/react-hook-form-inputs-handler/ReactHookFormInputsHandler';
import { Button } from '@/templates/components/ui/button';
import { Logger } from '@/lib/logger';

type QuizFormProps = {
  onSubmit: (data: QuizFormValues) => void;
  initialValues?: QuizFormValues;
};

/**
 * QuizForm component for basic quiz information.
 * Adheres to the Form Architecture Standards using RHF, Zod, and InputsHandler.
 */
export const QuizForm = ({ onSubmit, initialValues }: QuizFormProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<QuizFormValues>({
    resolver: zodResolver(QuizFormSchema),
    defaultValues: initialValues || {
      name: '',
      author: '',
      description: '',
    },
  });

  const submitHandler = (data: QuizFormValues) => {
    onSubmit(data);
    Logger.info(`Quiz Form Submitted: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex w-full flex-col gap-8"
    >
      <ReactHookFormInputsHandler
        config={quizFormConfig}
        register={register}
        control={control}
        errors={errors}
      />

      <div className="flex justify-end">
        <Button type="submit" size="lg">
          Save and Proceed
        </Button>
      </div>
    </form>
  );
};
