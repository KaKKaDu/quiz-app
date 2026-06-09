'use client';

import React from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { ChooseOneView } from './choose-one-view';
import { ChooseMultipleView } from './choose-multiple-view';
import { NumberView } from './number-view';
import { NumberRangeView } from './number-range-view';
import { DateView } from './date-view';
import { ValidationHandler } from '@/types/question.types';

type QuizQuestionViewProps = {
  question: QuizQuestion;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
};

/**
 * QuizQuestionView acts as a router for different question type views.
 * It provides a unified interface for displaying and validating questions.
 */
export const QuizQuestionView = ({
  question,
  onValidate,
  validateTrigger,
  report,
}: QuizQuestionViewProps) => {
  const renderView = () => {
    switch (question.type) {
      case 'choose-one':
        return (
          <ChooseOneView
            question={question}
            onValidate={onValidate}
            validateTrigger={validateTrigger}
            report={report}
          />
        );
      case 'choose-multiple':
        return (
          <ChooseMultipleView
            question={question}
            onValidate={onValidate}
            validateTrigger={validateTrigger}
            report={report}
          />
        );
      case 'number':
        return (
          <NumberView
            question={question}
            onValidate={onValidate}
            validateTrigger={validateTrigger}
            report={report}
          />
        );
      case 'number-range':
        return (
          <NumberRangeView
            question={question}
            onValidate={onValidate}
            validateTrigger={validateTrigger}
            report={report}
          />
        );
      case 'date':
        return (
          <DateView
            question={question}
            onValidate={onValidate}
            validateTrigger={validateTrigger}
            report={report}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full border border-border bg-background p-6">
      {renderView()}
    </div>
  );
};
