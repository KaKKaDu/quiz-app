'use client';

import React from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { cn } from '@/lib/utils';
import {
  CalendarIcon,
  ListChecksIcon,
  ListNumbersIcon,
  NumberSquareOneIcon,
  SelectionIcon,
} from '@phosphor-icons/react';

type QuizQuestionPreviewProps = {
  question: QuizQuestion;
};

/**
 * QuizQuestionPreview provides a visual representation of a single quiz question.
 * It dynamically adapts its UI based on the question type.
 * Adheres to monochrome minimalistic style.
 */
export const QuizQuestionPreview = ({ question }: QuizQuestionPreviewProps) => {
  const renderIcon = () => {
    switch (question.type) {
      case 'choose-one':
        return <SelectionIcon size={20} />;
      case 'choose-multiple':
        return <ListChecksIcon size={20} />;
      case 'number':
        return <NumberSquareOneIcon size={20} />;
      case 'number-range':
        return <ListNumbersIcon size={20} />;
      case 'date':
        return <CalendarIcon size={20} />;
    }
  };

  const renderBody = () => {
    switch (question.type) {
      case 'choose-one':
      case 'choose-multiple':
        return (
          <div className="flex flex-col gap-2">
            {question.body.options.map((option) => {
              const isCorrect = Array.isArray(question.body.correctAnswer)
                ? question.body.correctAnswer.includes(option.index)
                : question.body.correctAnswer === option.index;

              return (
                <div
                  key={option.index}
                  className={cn(
                    'flex items-center gap-3 border border-border p-2 text-xs',
                    isCorrect &&
                      'border-green-500 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400'
                  )}
                >
                  <span className="font-bold">{option.index + 1}.</span>
                  <span>{option.content}</span>
                  {isCorrect && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-widest">
                      Correct
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        );
      case 'number':
        return (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Correct Answer:</span>
            <span className="font-bold">{question.body.correctAnswer}</span>
          </div>
        );
      case 'number-range':
        return (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Correct Range:</span>
            <span className="font-bold">
              {question.body.correctAnswer.min} -{' '}
              {question.body.correctAnswer.max}
            </span>
          </div>
        );
      case 'date':
        return (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Correct Date:</span>
            <span className="font-bold">
              {new Date(question.body.correctAnswer).toLocaleDateString()}
            </span>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 border border-border bg-background p-4">
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 items-center justify-center rounded-none border border-border p-2 text-foreground">
          {renderIcon()}
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-semibold leading-tight text-foreground">
            {question.question}
          </h4>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {question.type.replace('-', ' ')}
          </span>
        </div>
      </div>
      <div className="border-t border-border pt-4">{renderBody()}</div>
    </div>
  );
};
