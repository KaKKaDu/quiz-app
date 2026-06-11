'use client';

import React from 'react';
import { QuizFull } from '@/schemas/zod/quiz.zod';
import { QuizDataPreview } from '@/templates/components/quiz/quiz-data-preview';
import { QuizQuestionsExecutor } from '@/templates/components/quiz/quiz-questions-executor';
import QuizSectionNavigation from '@/templates/components/quiz/quiz-section-navigation';

type QuizSectionProps = {
  quiz: QuizFull;
};

/**
 * QuizSection handles the presentation of a full quiz to the participant.
 * Composes QuizDataPreview and QuizQuestionsExecutor.
 * Adheres to monochrome minimalistic style.
 */
export const QuizSection = ({ quiz }: QuizSectionProps) => {
  return (
    <section className="mx-auto flex w-full max-w-[40rem] flex-col gap-12 p-4 sm:p-8">
      <QuizSectionNavigation quizId={quiz.id} />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
          {quiz.name}
        </h1>
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          By {quiz.author}
        </p>
      </div>

      <QuizDataPreview
        data={{
          name: quiz.name,
          author: quiz.author,
          description: quiz.description || 'No description provided.',
        }}
      />

      <div className="border-t border-border pt-12">
        <QuizQuestionsExecutor quizId={quiz.id} questions={quiz.data} />
      </div>
    </section>
  );
};
