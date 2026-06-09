'use client';

import React from 'react';
import { QuizFull } from '@/schemas/zod/quiz.zod';
import { QuizQuestionView } from '@/templates/components/quiz/view/quiz-question-view';
import { QuizDataPreview } from '@/templates/components/quiz/quiz-data-preview';

type QuizSectionProps = {
  quiz: QuizFull;
};

/**
 * QuizSection handles the presentation of a full quiz to the participant.
 * Composes multiple QuizQuestionView components.
 * Adheres to monochrome minimalistic style.
 */
export const QuizSection = ({ quiz }: QuizSectionProps) => {
  return (
    <section className="mx-auto flex w-full max-w-[40rem] flex-col gap-8 p-8">
      <QuizDataPreview
        data={{
          name: quiz.name,
          author: quiz.author,
          description: 'No description provided.',
        }}
      />

      <div className="flex flex-col gap-8">
        {quiz.data.map((question, index) => (
          <div key={question.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <span>Question {index + 1}</span>
            </div>
            <QuizQuestionView question={question} />
          </div>
        ))}
      </div>
    </section>
  );
};
