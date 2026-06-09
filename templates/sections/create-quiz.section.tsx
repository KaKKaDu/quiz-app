'use client';

import React from 'react';
import { QuizForm } from '@/templates/components/forms/instances/quiz/quiz-form';
import { QuestionCreator } from '@/templates/components/quiz/question-creator';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { Logger } from '@/lib/logger';

/**
 * CreateQuizSection for the quiz creation page.
 * Provides the context and title for the basic quiz information form.
 */
export const CreateQuizSection = () => {
  return (
    <section className="mx-auto flex w-full max-w-[40rem] flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
          Create New Quiz
        </h1>
        <p className="text-muted-foreground">
          Start by providing the basic information about your quiz.
        </p>
      </div>

      <QuizForm />
      <QuestionCreator
        onSubmit={(question: QuizQuestion) =>
          Logger.info(
            `Question Submitted: ${JSON.stringify(question, null, 2)}`
          )
        }
      />
    </section>
  );
};
