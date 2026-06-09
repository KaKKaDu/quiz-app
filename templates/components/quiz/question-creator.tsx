'use client';

import React, { useState } from 'react';
import { QuestionType } from '@/schemas/zod/quiz-question.zod';
import { QuestionSubmitHandler } from '@/types/question.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/templates/components/ui/select';
import { QuestionChooseOneForm } from '@/templates/components/forms/instances/question-choose-one/question-choose-one-form';
import { QuestionChooseMultipleForm } from '@/templates/components/forms/instances/question-choose-multiple/question-choose-multiple-form';
import { QuestionNumberForm } from '@/templates/components/forms/instances/question-number/question-number-form';
import { QuestionNumberRangeForm } from '@/templates/components/forms/instances/question-number-range/question-number-range-form';
import { QuestionDateForm } from '@/templates/components/forms/instances/question-date/question-date-form';

type QuestionCreatorProps = {
  onSubmit: QuestionSubmitHandler;
};

/**
 * QuestionCreator component providing a type selector and dynamic form rendering.
 * Unifies the question creation process for different question types.
 * Adheres to monochrome minimalistic style and strict spacing.
 */
export const QuestionCreator = ({ onSubmit }: QuestionCreatorProps) => {
  const [selectedType, setSelectedType] = useState<QuestionType>('choose-one');

  const renderForm = () => {
    switch (selectedType) {
      case 'choose-one':
        return <QuestionChooseOneForm onSubmit={onSubmit} />;
      case 'choose-multiple':
        return <QuestionChooseMultipleForm onSubmit={onSubmit} />;
      case 'number':
        return <QuestionNumberForm onSubmit={onSubmit} />;
      case 'number-range':
        return <QuestionNumberRangeForm onSubmit={onSubmit} />;
      case 'date':
        return <QuestionDateForm onSubmit={onSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 rounded-none border border-border bg-background p-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium tracking-tight text-foreground">
          Select Question Type
        </label>
        <Select
          value={selectedType}
          onValueChange={(value) => setSelectedType(value as QuestionType)}
        >
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="choose-one">Choose One</SelectItem>
            <SelectItem value="choose-multiple">Choose Multiple</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="number-range">Number Range</SelectItem>
            <SelectItem value="date">Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border-t border-border pt-8">{renderForm()}</div>
    </div>
  );
};
