'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';
import { cn } from '@/lib/utils/cn';

type ChooseOneViewProps = {
  question: Extract<QuizQuestion, { type: 'choose-one' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
  value?: number | null;
};

/**
 * ChooseOneView for single-choice questions.
 * Refactored to avoid cascading renders by using stable initialization.
 */
export const ChooseOneView = ({
  question,
  onValidate,
  validateTrigger,
  report = false,
  value = null,
}: ChooseOneViewProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(value);

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
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {question.question}
      </h3>
      <div className="flex flex-col gap-3">
        {question.body.options.map((option) => {
          const isSelected = isSelectedOption(option.index);
          const isCorrect = option.index === question.body.correctAnswer;
          const isWrongSelection = report && isSelected && !isCorrect;

          return (
            <button
              key={option.index}
              type="button"
              disabled={report}
              onClick={() => setSelectedOption(option.index)}
              className={cn(
                'group relative flex items-center gap-4 border border-border p-5 text-left transition-all duration-200 outline-none',
                !report &&
                  'cursor-pointer hover:border-foreground/40 hover:bg-muted/30',
                !report &&
                  isSelected &&
                  'border-foreground bg-foreground/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]',
                report &&
                  isCorrect &&
                  'border-green-500 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400',
                report &&
                  isWrongSelection &&
                  'border-destructive bg-destructive/5 text-destructive'
              )}
            >
              {/* Radio Indicator */}
              <div
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center border-2 border-border transition-all duration-300 pointer-events-none',
                  isSelected && 'border-foreground bg-foreground',
                  report && isCorrect && 'border-green-500 bg-green-500',
                  report &&
                    isWrongSelection &&
                    'border-destructive bg-destructive'
                )}
              >
                <div
                  className={cn(
                    'size-2 bg-background transition-transform duration-300 scale-0 pointer-events-none',
                    isSelected && 'scale-100'
                  )}
                />
              </div>

              <div className="flex flex-col gap-1 pointer-events-none">
                <span className="text-sm font-medium leading-tight">
                  {option.content}
                </span>
              </div>

              {/* Status Badge in Report Mode */}
              {report && isCorrect && (
                <span className="ml-auto text-[10px] font-black uppercase tracking-[0.2em] text-green-600 pointer-events-none">
                  Correct
                </span>
              )}
              {report && isWrongSelection && (
                <span className="ml-auto text-[10px] font-black uppercase tracking-[0.2em] text-destructive pointer-events-none">
                  Incorrect
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
