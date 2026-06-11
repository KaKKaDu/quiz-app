'use client';

import React from 'react';
import { QuizFull } from '@/schemas/zod/quiz.zod';
import { QuizResults } from '@/schemas/zod/quiz-results.zod';
import { QuizDataPreview } from '@/templates/components/quiz/quiz-data-preview';
import {
  QuizExecutionReport,
  QuestionStatus,
} from '@/templates/components/quiz/quiz-execution-report';
import { QuizQuestionView } from '@/templates/components/quiz/view/quiz-question-view';
import { UserIcon } from '@phosphor-icons/react';
import { QuestionValue } from '@/types/question.types';
import QuizResultsNavigation from '@/templates/components/quiz-results/quiz-results-navigation';

type QuizReviewSectionProps = {
  quiz: QuizFull;
  results: QuizResults;
};

/**
 * QuizReviewSection displays a completed quiz result.
 * Reconstructs the participant's answers and shows them in report mode.
 * Adheres to monochrome minimalist style.
 */
export const QuizReviewSection = ({
  quiz,
  results,
}: QuizReviewSectionProps) => {
  // Construct results summary for the report header
  const resultsSummary = quiz.data.map((q, index) => {
    const mistake = results.mistakes.find((m) => m.questionId === q.id);
    let status: QuestionStatus = 'correct';

    if (mistake) {
      // For now, if there is a mistake record, we assume it's incorrect or partial.
      // In a more complex system, we'd store the individual correctness.
      // But we can infer 'partial' for choose-multiple if we really wanted.
      status = q.type === 'choose-multiple' ? 'partial' : 'incorrect';
    }

    return {
      questionNumber: index + 1,
      status,
    };
  });

  return (
    <section className="mx-auto flex w-full max-w-[40rem] flex-col gap-12 p-4 sm:p-8">
      {/* Header Info */}
      <div className="flex flex-col gap-8">
        <QuizResultsNavigation quizId={quiz.id} />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-4xl">
            Quiz Result Review
          </h1>
          <p className="text-muted-foreground">
            Reviewing the attempt for{' '}
            <span className="font-bold text-foreground">{quiz.name}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4 border border-border bg-background p-6">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <UserIcon size={14} />
            <span>Participant Details</span>
          </div>
          <p className="text-sm font-black uppercase tracking-widest text-foreground">
            {results.participantName}
          </p>
        </div>

        <QuizDataPreview
          data={{
            name: quiz.name,
            author: quiz.author,
            description: quiz.description || 'No description provided.',
          }}
        />
        {/* Final Summary Report */}
        <div className="border-t border-border pt-12">
          <QuizExecutionReport
            score={results.score}
            results={resultsSummary}
            participantName={results.participantName}
          />
        </div>
      </div>

      {/* Questions Review */}
      <div className="flex flex-col gap-8 border-t border-border pt-12">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Detailed Review
        </h2>
        <div className="flex flex-col gap-12">
          {quiz.data.map((question, index) => {
            const mistake = results.mistakes.find(
              (m) => m.questionId === question.id
            );

            // Reconstruct the user's answer
            // If mistake exists, use the wrongAnswer. Otherwise, use the correctAnswer.
            let userAnswer: QuestionValue = null;

            if (mistake) {
              userAnswer = mistake.wrongAnswer;
            } else if (question.type === 'number-range') {
              // For a perfect answer in number-range, we don't know the exact number,
              // but we know it was within the correct range. For review display,
              // we can show any number within that range (e.g. the min).
              userAnswer = question.body.correctAnswer.min;
            } else {
              userAnswer = question.body.correctAnswer;
            }

            return (
              <div key={question.id} className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  <span>Question {index + 1}</span>
                </div>
                <QuizQuestionView
                  question={question}
                  report={true}
                  value={userAnswer}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
