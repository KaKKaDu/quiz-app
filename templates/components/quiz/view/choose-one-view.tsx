'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { cn } from '@/lib/utils';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';

type ChooseOneViewProps = {
  question: Extract<QuizQuestion, { type: 'choose-one' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
};

/**
 * ChooseOneView for single-choice questions.
 * Manages user selection and provides validation feedback with mistakes.
 */
export const ChooseOneView = ({
  question,
  onValidate,
  validateTrigger,
  report,
}: ChooseOneViewProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    if (validateTrigger && onValidate) {
      const isCorrect = selectedOption === question.body.correctAnswer;
      const mistakes: QuizMistake[] = [];

      if (!isCorrect && selectedOption !== null) {
        mistakes.push({
          type: 'choose-one',
          questionId: question.id,
          wrongAnswer: selectedOption,
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
    selectedOption,
    question.body.correctAnswer,
    question.id,
  ]);

  const isSelectedOption = useCallback(
    (option: number): boolean => {
      return selectedOption === option;
    },
    [selectedOption]
  );

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-foreground">
        {question.question}
      </h3>
      <div className="flex flex-col gap-2">
        {question.body.options.map((option) => {
          const isCorrect = option.index === question.body.correctAnswer;
          const isWrongSelection =
            report && isSelectedOption(option.index) && !isCorrect;

          return (
            <button
              key={option.index}
              disabled={report}
              onClick={() => setSelectedOption(option.index)}
              className={cn(
                'flex items-center gap-4 border border-border p-4 text-left transition-all',
                !report &&
                  isSelectedOption(option.index) &&
                  'border-foreground bg-gray-200 font-semibold',
                !report &&
                  !isSelectedOption(option.index) &&
                  'hover:bg-muted/50',
                report &&
                  isCorrect &&
                  'border-green-500 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400',
                report &&
                  isWrongSelection &&
                  'border-destructive bg-destructive/5 text-destructive'
              )}
            >
              <div
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center border border-border',
                  isSelectedOption(option.index) &&
                    'border-foreground bg-foreground'
                )}
              >
                {isSelectedOption(option.index) && (
                  <div className="size-2 bg-background" />
                )}
              </div>
              <span className="text-sm">{option.content}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
