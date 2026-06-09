'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { Input } from '@/templates/components/ui/input';
import { cn } from '@/lib/utils';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';

type NumberRangeViewProps = {
  question: Extract<QuizQuestion, { type: 'number-range' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
};

/**
 * NumberRangeView for numeric range questions.
 * Validates if a single user-provided number falls within the specified range.
 */
export const NumberRangeView = ({
  question,
  onValidate,
  validateTrigger,
  report,
}: NumberRangeViewProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (validateTrigger && onValidate) {
      const numericValue = parseFloat(value);
      const isWithinRange =
        !isNaN(numericValue) &&
        numericValue >= question.body.correctAnswer.min &&
        numericValue <= question.body.correctAnswer.max;

      const mistakes: QuizMistake[] = [];

      if (!isWithinRange) {
        mistakes.push({
          type: 'number-range',
          questionId: question.id,
          wrongAnswer: {
            min: isNaN(numericValue) ? 0 : numericValue,
            max: isNaN(numericValue) ? 0 : numericValue,
          },
        });
      }

      onValidate({
        correctness: isWithinRange ? 1 : 0,
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

  const numericValue = parseFloat(value);
  const isCorrect =
    !isNaN(numericValue) &&
    numericValue >= question.body.correctAnswer.min &&
    numericValue <= question.body.correctAnswer.max;

  const isWrong = report && value !== '' && !isCorrect;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-foreground">
        {question.question}
      </h3>
      <div className="flex flex-col gap-4">
        <Input
          type="number"
          disabled={report}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter a number within range"
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
            Correct Range: {question.body.correctAnswer.min} —{' '}
            {question.body.correctAnswer.max}
          </p>
        )}
      </div>
    </div>
  );
};
