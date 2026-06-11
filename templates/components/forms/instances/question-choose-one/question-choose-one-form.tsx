'use client';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  QuestionChooseOneFormSchema,
  QuestionChooseOneFormValues,
} from '@/schemas/zod/question-choose-one-form.zod';
import { questionChooseOneFormConfig } from './question-choose-one-form.config';
import ReactHookFormInputsHandler from '@/templates/components/forms/react-hook-form/react-hook-form-inputs-handler/ReactHookFormInputsHandler';
import { Button } from '@/templates/components/ui/button';
import { Input } from '@/templates/components/ui/input';
import { Trash, Plus } from '@phosphor-icons/react';
import { QuestionSubmitHandler } from '@/types/question.types';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { cn } from '@/lib/utils/cn';
import { generateId } from '@/lib/utils/generate-id';

type QuestionChooseOneFormProps = {
  onSubmit: QuestionSubmitHandler;
  initialValues?: Partial<QuestionChooseOneFormValues>;
};

export const QuestionChooseOneForm = ({
  onSubmit,
  initialValues,
}: QuestionChooseOneFormProps) => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm<QuestionChooseOneFormValues>({
    resolver: zodResolver(QuestionChooseOneFormSchema),
    defaultValues: {
      question: initialValues?.question || '',
      options: initialValues?.options || [{ content: '' }, { content: '' }],
      correctAnswer: initialValues?.correctAnswer || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const correctAnswer = watch('correctAnswer');

  const handleFormSubmit = (values: QuestionChooseOneFormValues) => {
    const questionData: QuizQuestion = {
      id: generateId(),
      type: 'choose-one',
      question: values.question,
      body: {
        options: values.options.map((opt, index) => ({
          index,
          content: opt.content,
        })),
        correctAnswer: parseInt(values.correctAnswer),
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
        config={questionChooseOneFormConfig}
        register={register}
        control={control}
        errors={errors}
      />

      <div className="flex flex-col gap-4">
        <label className="text-sm font-medium tracking-tight text-foreground">
          Options
        </label>
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-3">
              <input
                type="radio"
                value={index.toString()}
                checked={correctAnswer === index.toString()}
                onChange={() => setValue('correctAnswer', index.toString())}
                className="size-4 cursor-pointer accent-primary"
              />
              <Input
                {...register(`options.${index}.content`)}
                placeholder={`Option ${index + 1}`}
                className={cn(
                  errors.options?.[index]?.content && 'border-destructive'
                )}
              />
              {fields.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(index)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash size={16} />
                </Button>
              )}
            </div>
          ))}
          {errors.options?.root && (
            <p className="text-xs font-medium text-destructive">
              {errors.options.root.message}
            </p>
          )}
          {errors.correctAnswer && (
            <p className="text-xs font-medium text-destructive">
              {errors.correctAnswer.message}
            </p>
          )}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => append({ content: '' })}
        >
          <Plus size={16} className="mr-2" />
          Add Option
        </Button>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Question</Button>
      </div>
    </form>
  );
};
