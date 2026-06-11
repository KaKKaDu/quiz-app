'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { Input } from '@/templates/components/ui/input';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';
import { cn } from '@/lib/utils/cn';

type NumberViewProps = {
  question: Extract<QuizQuestion, { type: 'number' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
  value?: number | null;
};

/**
 * NumberView for numeric input questions.
 * Refactored to avoid cascading renders by using stable initialization.
 */
export const NumberView = ({
  question,
  onValidate,
  validateTrigger,
  report = false,
  value = null,
}: NumberViewProps) => {
  const [inputValue, setInputValue] = useState<string>(
    value !== null ? value.toString() : ''
  );

  useEffect(() => {
    if (validateTrigger && onValidate) {
      const numericValue = parseFloat(inputValue);
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
    inputValue,
    question.body.correctAnswer,
    question.id,
  ]);

  const isCorrect = parseFloat(inputValue) === question.body.correctAnswer;
  const isWrong = report && inputValue !== '' && !isCorrect;

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-foreground">
        {question.question}
      </h3>
      <div className="flex flex-col gap-4">
        <Input
          type="number"
          disabled={report}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
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
          <p className="text-xs font-bold uppercase tracking-widest text-green-600">
            Correct Answer: {question.body.correctAnswer}
          </p>
        )}
      </div>
    </div>
  );
};
