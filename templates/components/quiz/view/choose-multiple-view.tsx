'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { CheckIcon } from '@phosphor-icons/react';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';
import { cn } from '@/lib/utils/cn';

type ChooseMultipleViewProps = {
  question: Extract<QuizQuestion, { type: 'choose-multiple' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
  value?: number[];
};

/**
 * ChooseMultipleView for multiple-choice questions.
 * Refactored to avoid cascading renders by using stable initialization.
 */
export const ChooseMultipleView = ({
  question,
  onValidate,
  validateTrigger,
  report = false,
  value = [],
}: ChooseMultipleViewProps) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>(value);

  useEffect(() => {
    if (validateTrigger && onValidate) {
      const correctAnswers = question.body.correctAnswer;
      const totalCorrect = correctAnswers.length;
      const mistakes: QuizMistake[] = [];

      if (totalCorrect === 0) {
        if (selectedOptions.length > 0) {
          mistakes.push({
            type: 'choose-multiple',
            questionId: question.id,
            wrongAnswer: selectedOptions,
          });
          onValidate({ correctness: 0, mistakes });
        } else {
          onValidate({ correctness: 1, mistakes: [] });
        }
        return;
      }

      const correctlySelected = selectedOptions.filter((id) =>
        correctAnswers.includes(id)
      ).length;
      const incorrectlySelected = selectedOptions.filter(
        (id) => !correctAnswers.includes(id)
      ).length;

      const score = Math.max(
        0,
        (correctlySelected - incorrectlySelected) / totalCorrect
      );

      if (score < 1) {
        mistakes.push({
          type: 'choose-multiple',
          questionId: question.id,
          wrongAnswer: selectedOptions,
        });
      }

      onValidate({
        correctness: score,
        mistakes,
      });
    }
  }, [
    validateTrigger,
    onValidate,
    selectedOptions,
    question.body.correctAnswer,
    question.id,
  ]);

  const toggleOption = (index: number) => {
    setSelectedOptions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
        {question.question}
      </h3>
      <div className="flex flex-col gap-3">
        {question.body.options.map((option) => {
          const isSelected = selectedOptions.includes(option.index);
          const isCorrect = question.body.correctAnswer.includes(option.index);
          const isWrongSelection = report && isSelected && !isCorrect;

          return (
            <button
              key={option.index}
              type="button"
              disabled={report}
              onClick={() => toggleOption(option.index)}
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
              {/* Checkbox Indicator */}
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
                    'transition-transform duration-300 scale-0 pointer-events-none',
                    isSelected && 'scale-100'
                  )}
                >
                  <CheckIcon
                    size={14}
                    className="text-background"
                    weight="bold"
                  />
                </div>
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
