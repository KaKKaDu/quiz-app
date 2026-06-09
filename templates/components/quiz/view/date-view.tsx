'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { Input } from '@/templates/components/ui/input';
import { cn } from '@/lib/utils';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';

type DateViewProps = {
  question: Extract<QuizQuestion, { type: 'date' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
};

/**
 * DateView for date input questions.
 */
export const DateView = ({
  question,
  onValidate,
  validateTrigger,
  report,
}: DateViewProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (validateTrigger && onValidate) {
      if (!value) {
        onValidate({
          correctness: 0,
          mistakes: [
            {
              type: 'date',
              questionId: question.id,
              wrongAnswer: new Date(0), // No date selected
            },
          ],
        });
        return;
      }

      const userDate = new Date(value).toDateString();
      const correctDate = new Date(question.body.correctAnswer).toDateString();
      const isCorrect = userDate === correctDate;
      const mistakes: QuizMistake[] = [];

      if (!isCorrect) {
        mistakes.push({
          type: 'date',
          questionId: question.id,
          wrongAnswer: new Date(value),
        });
      }

      onValidate({
        correctness: isCorrect ? 1 : 0,
        mistakes,
      });
    }
  }, [
    validateTrigger,
    onValidate,
    value,
    question.body.correctAnswer,
    question.id,
  ]);

  const isCorrect =
    value &&
    new Date(value).toDateString() ===
      new Date(question.body.correctAnswer).toDateString();
  const isWrong = report && value !== '' && !isCorrect;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-foreground">
        {question.question}
      </h3>
      <div className="flex flex-col gap-4">
        <Input
          type="date"
          disabled={report}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={cn(
            'h-12 border-border',
            report &&
              isCorrect &&
              'border-green-500 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400',
            report &&
              isWrong &&
              'border-destructive bg-destructive/5 text-destructive'
          )}
        />
        {report && !isCorrect && (
          <p className="text-xs font-bold uppercase tracking-widest">
            Correct Date:{' '}
            {new Date(question.body.correctAnswer).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};
