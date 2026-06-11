'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { Input } from '@/templates/components/ui/input';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';
import { cn } from '@/lib/utils/cn';

type DateViewProps = {
  question: Extract<QuizQuestion, { type: 'date' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
  value?: Date | string | null;
};

/**
 * DateView for date input questions.
 * Refactored to avoid cascading renders by using stable initialization.
 */
export const DateView = ({
  question,
  onValidate,
  validateTrigger,
  report = false,
  value = null,
}: DateViewProps) => {
  const [inputValue, setInputValue] = useState<string>(() => {
    if (!value) return '';
    const date = new Date(value);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
  });

  useEffect(() => {
    if (validateTrigger && onValidate) {
      if (!inputValue) {
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

      const userDate = new Date(inputValue).toDateString();
      const correctDate = new Date(question.body.correctAnswer).toDateString();
      const isCorrect = userDate === correctDate;
      const mistakes: QuizMistake[] = [];

      if (!isCorrect) {
        mistakes.push({
          type: 'date',
          questionId: question.id,
          wrongAnswer: new Date(inputValue),
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
    inputValue,
    question.body.correctAnswer,
    question.id,
  ]);

  const isCorrect =
    inputValue &&
    new Date(inputValue).toDateString() ===
      new Date(question.body.correctAnswer).toDateString();
  const isWrong = report && inputValue !== '' && !isCorrect;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-foreground">
        {question.question}
      </h3>
      <div className="flex flex-col gap-4">
        <Input
          type="date"
          disabled={report}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
          <p className="text-xs font-bold uppercase tracking-widest text-green-600">
            Correct Date:{' '}
            {new Date(question.body.correctAnswer).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};
