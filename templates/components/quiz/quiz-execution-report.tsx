'use client';

import React from 'react';
import { getCorrectnessColor } from '@/lib/utils/color.utils';
import {
  TrophyIcon,
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
  WarningIcon,
} from '@phosphor-icons/react';
import { cn } from '@/lib/utils/cn';
import { CopyableLink } from '@/templates/components/ui/copyable-link';

export type QuestionStatus = 'correct' | 'incorrect' | 'partial';

type QuizExecutionReportProps = {
  score: number; // 0-100
  participantName: string;
  results: {
    questionNumber: number;
    status: QuestionStatus;
  }[];
  submissionLink?: string;
  saveFailed?: boolean;
};

/**
 * QuizExecutionReport displays a simplified grid of question results.
 * Now features a fluid grid, integrates the CopyableLink component,
 * and handles server-side persistence feedback.
 */
export const QuizExecutionReport = ({
  score,
  participantName,
  results,
  submissionLink,
  saveFailed,
}: QuizExecutionReportProps) => {
  const color: string = getCorrectnessColor(score);
  const isPerfect: boolean = score === 100;
  const hasScore: boolean = score > 0;

  const renderMarker = (status: QuestionStatus) => {
    switch (status) {
      case 'correct':
        return (
          <CheckCircleIcon size={16} weight="fill" className="text-green-500" />
        );
      case 'incorrect':
        return (
          <XCircleIcon size={16} weight="fill" className="text-destructive" />
        );
      case 'partial':
        return (
          <MinusCircleIcon
            size={16}
            weight="fill"
            className="text-orange-400"
          />
        );
    }
  };

  return (
    <div className="flex w-full flex-col gap-8 border border-border bg-background p-8">
      {/* Header Result */}
      <div className="flex flex-col items-center gap-6 text-center">
        <div
          className="flex size-24 items-center justify-center border-4"
          style={{ borderColor: color, color: color }}
        >
          {isPerfect ? (
            <TrophyIcon size={48} weight="bold" />
          ) : (
            <span className="text-3xl font-black">{Math.round(score)}%</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tighter text-foreground">
            {isPerfect ? 'Perfect Score!' : 'Quiz Completed'}
          </h3>
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Participant
            </p>
            <p className="text-sm font-black uppercase tracking-widest text-foreground">
              {participantName}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Line - Removed if score is 0 */}
      {hasScore && (
        <div className="h-1 w-full bg-muted">
          <div
            className="h-full transition-all duration-1000 ease-out"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>
      )}

      {/* Persistence Feedback */}
      {saveFailed && (
        <div className="flex items-center gap-3 border border-destructive bg-destructive/5 p-4 text-destructive">
          <WarningIcon size={20} weight="bold" />
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest">
              Submission Error
            </span>
            <span className="text-xs font-medium">
              Your test result was not saved to our database.
            </span>
          </div>
        </div>
      )}

      {/* Results Grid - Using fluid auto-fit */}
      <div className="flex flex-col gap-6 border-t border-border pt-8">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(55px, 1fr))',
          }}
        >
          {results.map((res) => (
            <div
              key={res.questionNumber}
              className={cn(
                'flex flex-col items-center justify-center gap-1 border border-border p-3 transition-colors hover:bg-muted/30'
              )}
            >
              <span className="text-[10px] font-black">
                {res.questionNumber}
              </span>
              {renderMarker(res.status)}
            </div>
          ))}
        </div>

        {/* Share Link - Only shown if successfully saved */}
        {submissionLink && (
          <div className="border-t border-border pt-6">
            <CopyableLink link={submissionLink} label="Share Your Report" />
          </div>
        )}
      </div>
    </div>
  );
};
