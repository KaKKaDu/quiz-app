'use client';

import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { cn } from '@/lib/utils';
import { CheckIcon } from '@phosphor-icons/react';
import { ValidationHandler } from '@/types/question.types';
import { QuizMistake } from '@/schemas/zod/quiz-results.zod';

type ChooseMultipleViewProps = {
  question: Extract<QuizQuestion, { type: 'choose-multiple' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
};

/**
 * ChooseMultipleView for multiple-choice questions.
 * Calculates partial correctness and provides a list of mistakes.
 */
export const ChooseMultipleView = ({
  question,
  onValidate,
  validateTrigger,
  report,
}: ChooseMultipleViewProps) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

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
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-foreground">
        {question.question}
      </h3>
      <div className="flex flex-col gap-2">
        {question.body.options.map((option) => {
          const isSelected = selectedOptions.includes(option.index);
          const isCorrect = question.body.correctAnswer.includes(option.index);
          const isWrongSelection = report && isSelected && !isCorrect;

          return (
            <button
              key={option.index}
              disabled={report}
              onClick={() => toggleOption(option.index)}
              className={cn(
                'flex items-center gap-4 border border-border p-4 text-left transition-all',
                !report &&
                  isSelected &&
                  'border-foreground bg-foreground/5 font-semibold',
                !report && !isSelected && 'hover:bg-muted/50',
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
                  isSelected && 'border-foreground bg-foreground'
                )}
              >
                {isSelected && (
                  <CheckIcon
                    size={14}
                    className="text-background"
                    weight="bold"
                  />
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
