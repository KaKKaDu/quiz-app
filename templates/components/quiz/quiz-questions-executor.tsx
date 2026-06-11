'use client';

import React, { useState, useCallback, useRef, useTransition } from 'react';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { QuizQuestionView } from './view/quiz-question-view';
import { QuizExecutionReport, QuestionStatus } from './quiz-execution-report';
import { Button } from '@/templates/components/ui/button';
import { Input } from '@/templates/components/ui/input';
import { CheckCircleIcon, UserIcon, SpinnerIcon } from '@phosphor-icons/react';
import { ValidationResult } from '@/types/question.types';
import { Nullable } from '@/types/common.types';
import { submitQuizResultAction } from '@/actions/quiz/submit-quiz-result.action';
import { Logger } from '@/lib/logger';

type QuizQuestionsExecutorProps = {
  quizId: string;
  questions: QuizQuestion[];
};

type ReportData = {
  score: number;
  participantName: string;
  results: {
    questionNumber: number;
    status: QuestionStatus;
  }[];
  submissionLink?: string;
  saveFailed?: boolean;
};

/**
 * QuizQuestionsExecutor manages the interactive phase of a quiz.
 * Captures participant info, orchestrates validation, and persists results via Server Actions.
 * Includes a mandatory loading state and detailed error handling.
 */

// http://localhost:3000/quiz/0ks8ep/submissions/xndcgc
export const QuizQuestionsExecutor = ({
  quizId,
  questions,
}: QuizQuestionsExecutorProps) => {
  const [participantName, setParticipantName] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [validateTrigger, setValidateTrigger] = useState<boolean>(false);
  const [report, setReport] = useState<Nullable<ReportData>>(null);
  const [, startTransition] = useTransition();

  // Refs for stable aggregation without triggering re-renders during collection
  const resultsRef = useRef<Record<string, ValidationResult>>({});
  const reportingCountRef = useRef<number>(0);

  /**
   * Aggregates results and triggers the server action to save the submission.
   */
  const reportAndPersistResults = useCallback(
    async (finalResults: Record<string, ValidationResult>) => {
      const totalCorrectness: number = Object.values(finalResults).reduce(
        (acc: number, r: ValidationResult) => acc + r.correctness,
        0
      );

      const percentage: number = (totalCorrectness / questions.length) * 100;
      const allMistakes = Object.values(finalResults).flatMap(
        (r) => r.mistakes
      );

      // Map question IDs to their sequence number and status
      const resultsSummary = questions.map((q, index) => {
        const result = finalResults[q.id];
        let status: QuestionStatus = 'incorrect';

        if (result.correctness === 1) {
          status = 'correct';
        } else if (result.correctness > 0) {
          status = 'partial';
        }

        return {
          questionNumber: index + 1,
          status,
        };
      });

      startTransition(async () => {
        // Prepare minimum loading state of 3 seconds
        const minWait = new Promise((resolve) => setTimeout(resolve, 3000));

        // Call the server action
        const actionPromise = submitQuizResultAction(
          quizId,
          participantName,
          percentage,
          allMistakes
        );

        // Wait for both
        const [actionResult] = await Promise.all([actionPromise, minWait]);

        if (actionResult.success && actionResult.data) {
          const domain =
            typeof window !== 'undefined' ? window.location.origin : '';
          const submissionLink = `${domain}/quiz/${quizId}/submissions/${actionResult.data.resultId}`;

          setReport({
            score: percentage,
            participantName,
            results: resultsSummary,
            submissionLink,
          });
        } else {
          Logger.report('QuizQuestionsExecutor.submission', actionResult);
          setReport({
            score: percentage,
            participantName,
            results: resultsSummary,
            saveFailed: true,
          });
        }
      });
    },
    [questions, participantName, quizId]
  );

  /**
   * Handle individual question validation report.
   */
  const handleValidate = useCallback(
    (questionId: string, result: ValidationResult) => {
      if (resultsRef.current[questionId]) return;

      resultsRef.current[questionId] = result;
      reportingCountRef.current += 1;

      if (reportingCountRef.current === questions.length) {
        reportAndPersistResults(resultsRef.current);
      }
    },
    [questions.length, reportAndPersistResults]
  );

  /**
   * Triggers the validation flow for all nested questions.
   */
  const handleSubmit = () => {
    if (!participantName.trim()) return;

    resultsRef.current = {};
    reportingCountRef.current = 0;
    setValidateTrigger(true);
    setIsSubmitted(true);
  };

  const isSubmitDisabled: boolean = !participantName.trim() || isSubmitted;

  return (
    <div className="flex flex-col gap-12">
      {/* Participant Info Section */}
      {!isSubmitted && (
        <div className="flex flex-col gap-4 border border-border bg-background p-6 transition-all animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <UserIcon size={14} />
            <span>Participant Information</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="participantName"
              className="text-[10px] font-black uppercase tracking-wider text-foreground"
            >
              Your Full Name
            </label>
            <Input
              id="participantName"
              placeholder="e.g. John Doe"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="h-12 border-border px-4 text-sm"
              autoComplete="name"
            />
            <p className="text-[9px] font-medium text-muted-foreground">
              Required to submit your answers and receive your results.
            </p>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="flex flex-col gap-8">
        {questions.map((question, index) => (
          <div key={question.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              <span>Question {index + 1}</span>
            </div>
            <QuizQuestionView
              question={question}
              report={isSubmitted}
              validateTrigger={validateTrigger}
              onValidate={(result: ValidationResult) =>
                handleValidate(question.id, result)
              }
            />
          </div>
        ))}
      </div>

      {/* Action Area: Submit Button or Loading State */}
      {!report && (
        <div className="border-t border-border pt-12">
          {!isSubmitted ? (
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={isSubmitDisabled}
              className="flex h-[2.625rem] w-full items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.3em] transition-all hover:gap-5"
            >
              <CheckCircleIcon size={24} weight="bold" />
              {participantName.trim()
                ? 'Submit Quiz Answers'
                : 'Enter Name to Submit'}
            </Button>
          ) : (
            <div className="flex h-[2.625rem] w-full items-center justify-center gap-3 border border-border bg-muted/20 text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground transition-all animate-in fade-in zoom-in-95">
              <SpinnerIcon size={24} className="animate-spin" weight="bold" />
              Finalizing results...
            </div>
          )}
        </div>
      )}

      {/* Final Report - Shown only after submission, aggregation, and server persistence */}
      {report && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <QuizExecutionReport
            score={report.score}
            results={report.results}
            participantName={report.participantName}
            submissionLink={report.submissionLink}
            saveFailed={report.saveFailed}
          />
        </div>
      )}
    </div>
  );
};
