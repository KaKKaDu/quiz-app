'use client';

import React, { useState } from 'react';
import { PlusIcon, TrashIcon, CheckCircleIcon } from '@phosphor-icons/react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { QuestionCreator } from './question-creator';
import { QuizQuestionPreview } from './quiz-question-preview';
import { Button } from '@/templates/components/ui/button';

type QuizQuestionsCreatorProps = {
  onSubmit: (questions: QuizQuestion[]) => void;
};

/**
 * QuizQuestionsCreator handles the creation and management of multiple quiz questions.
 * It allows adding multiple QuestionCreator instances, removing submitted questions,
 * and final submission of the entire question set.
 *
 * Adheres to monochrome minimalistic style and strict spacing.
 */
export const QuizQuestionsCreator = ({
  onSubmit,
}: QuizQuestionsCreatorProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [activeCreators, setActiveCreators] = useState<string[]>([]);

  const addCreator = () => {
    setActiveCreators((prev) => [...prev, crypto.randomUUID()]);
  };

  const removeCreator = (id: string) => {
    setActiveCreators((prev) => prev.filter((creatorId) => creatorId !== id));
  };

  const handleQuestionSubmit = (question: QuizQuestion, creatorId: string) => {
    setQuestions((prev) => [...prev, question]);
    removeCreator(creatorId);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Submitted Questions List */}
      <div className="flex flex-col gap-4">
        {questions.length > 0 && (
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Submitted Questions ({questions.length})
          </h3>
        )}
        {questions.length > 0 && (
          <>
            <div className="flex flex-col gap-6">
              {questions.map((q) => (
                <div key={q.id} className="group relative">
                  <QuizQuestionPreview question={q} />
                  <div className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="destructive"
                      size="icon-sm"
                      onClick={() => removeQuestion(q.id)}
                      title="Delete Question"
                    >
                      <TrashIcon size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </>
        )}
      </div>

      {/* Active Creators */}
      {activeCreators.length > 0 && (
        <>
          <div className="flex flex-col gap-8">
            {activeCreators.map((id) => (
              <div key={id} className="relative flex flex-col">
                <div className="flex items-center justify-end">
                  <Button
                    variant="destructive"
                    size="icon-sm"
                    onClick={() => removeCreator(id)}
                    className={
                      'w-full border-x border-t border-border border-b-0'
                    }
                    title="Delete Question"
                  >
                    <TrashIcon size={16} />
                  </Button>
                </div>
                <QuestionCreator
                  onSubmit={(question) => handleQuestionSubmit(question, id)}
                />
              </div>
            ))}
          </div>
          <hr className={'mt-4'} />
        </>
      )}

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <Button
          variant="outline"
          onClick={addCreator}
          className="flex w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
        >
          <PlusIcon size={20} />
          Add Question
        </Button>

        <Button
          onClick={() => onSubmit(questions)}
          disabled={questions.length === 0}
          className="flex w-full items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em]"
        >
          <CheckCircleIcon size={20} />
          Submit With {questions.length} Questions
        </Button>
      </div>
    </div>
  );
};
