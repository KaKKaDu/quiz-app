'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { Input } from '@/templates/components/ui/input';
import { cn } from '@/lib/utils';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';

type NumberViewProps = {
  question: Extract<QuizQuestion, { type: 'number' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
};

/**
 * NumberView for numeric input questions.
 */
export const NumberView = ({
  question,
  onValidate,
  validateTrigger,
  report,
}: NumberViewProps) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (validateTrigger && onValidate) {
      const numericValue = parseFloat(value);
      const isCorrect = numericValue === question.body.correctAnswer;
      const mistakes: QuizMistake[] = [];

      if (!isCorrect) {
        mistakes.push({
          type: 'number',
          questionId: question.id,
          wrongAnswer: isNaN(numericValue) ? 0 : numericValue,
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

  const isCorrect = parseFloat(value) === question.body.correctAnswer;
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
          placeholder="Enter your answer"
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
            Correct Answer: {question.body.correctAnswer}
          </p>
        )}
      </div>
    </div>
  );
};
