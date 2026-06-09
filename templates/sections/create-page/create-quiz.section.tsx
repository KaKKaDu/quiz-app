'use client';

import React, { useCallback, useState, useTransition } from 'react';
import { QuizForm } from '@/templates/components/forms/instances/quiz/quiz-form';
import { QuizQuestionsCreator } from '@/templates/components/quiz/quiz-questions-creator';
import { QuizDataPreview } from '@/templates/components/quiz/quiz-data-preview';
import { QuizCreationReport } from '@/templates/components/quiz/quiz-creation-report';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { QuizFormValues } from '@/schemas/zod/quiz-form.zod';
import { createQuizAction } from '@/actions/quiz/create-quiz.action';
import { Nullable } from '@/types/common.types';

type CreationResult = {
  quizId?: string;
  error?: string;
};

/**
 * CreateQuizSection for the quiz creation page.
 * Manages the full lifecycle of quiz creation: basic info, questions, and final persistence.
 * Adheres to monochrome minimalistic style.
 */
export const CreateQuizSection = () => {
  const [quizData, setQuizData] = useState<Nullable<QuizFormValues>>(null);
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [result, setResult] = useState<Nullable<CreationResult>>(null);
  const [isPending, startTransition] = useTransition();

  const quizFormSubmit = useCallback((values: QuizFormValues) => {
    setShowQuestions(true);
    setQuizData(values);
  }, []);

  const quizQuestionsSubmit = useCallback(
    async (questions: QuizQuestion[]) => {
      if (!quizData) return;

      startTransition(async () => {
        const actionResult = await createQuizAction(quizData, questions);

        if (actionResult.success && actionResult.data) {
          setResult({ quizId: actionResult.data.quizId });
        } else if (!actionResult.success) {
          setResult({
            error:
              actionResult.errors[0]?.message ||
              'An unexpected error occurred while creating the quiz.',
          });
        }
      });
    },
    [quizData]
  );

  const handleEditInfo = useCallback(() => {
    setShowQuestions(false);
  }, []);

  // Show the final report if creation is complete (success or error)
  if (result) {
    return (
      <section className="mx-auto flex w-full max-w-[40rem] flex-col gap-8 p-8">
        <QuizCreationReport
          quizId={result.quizId}
          error={result.error}
          quizName={quizData?.name}
        />
      </section>
    );
  }

  return (
    <section className="mx-auto flex w-full max-w-[40rem] flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
          Create New Quiz
        </h1>
        <p className="text-muted-foreground">
          {showQuestions
            ? 'Review your quiz configuration and add questions.'
            : 'Start by providing the basic information about your quiz.'}
        </p>
      </div>

      {showQuestions && quizData ? (
        <QuizDataPreview data={quizData} onEdit={handleEditInfo} />
      ) : (
        <QuizForm
          onSubmit={quizFormSubmit}
          initialValues={quizData || undefined}
        />
      )}

      {showQuestions && quizData && (
        <div className="flex flex-col gap-4 border-t border-border pt-8">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Quiz Questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Add at least one question to your quiz and submit to finish.
            </p>
          </div>
          <div className={isPending ? 'pointer-events-none opacity-50' : ''}>
            <QuizQuestionsCreator onSubmit={quizQuestionsSubmit} />
          </div>
          {isPending && (
            <div className="flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span className="animate-pulse">Creating your quiz...</span>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
