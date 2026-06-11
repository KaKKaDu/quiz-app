'use client';

import React from 'react';
import { Button } from '@/templates/components/ui/button';
import { CopyableLink } from '@/templates/components/ui/copyable-link';
import { WarningIcon, CheckCircleIcon } from '@phosphor-icons/react';

type QuizCreationReportProps = {
  quizId?: string;
  error?: string;
  quizName?: string;
};

/**
 * QuizCreationReport displays the final result of the quiz creation process.
 * Refactored to use the CopyableLink component.
 */
export const QuizCreationReport = ({
  quizId,
  error,
  quizName,
}: QuizCreationReportProps) => {
  // In a real app, this would come from an environment variable or window.location
  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const quizLink = quizId ? `${domain}/quiz/${quizId}` : '';

  if (error) {
    return (
      <div className="flex w-full flex-col gap-6 border border-destructive bg-destructive/5 p-8 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-none border border-destructive text-destructive">
          <WarningIcon size={32} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-bold tracking-tight text-destructive">
            Creation Failed
          </h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mx-auto mt-4 w-fit"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-8 border border-border bg-background p-8">
      <div className="flex flex-col gap-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-none border border-green-500 text-green-500">
          <CheckCircleIcon size={32} />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-bold tracking-tighter text-foreground">
            Quiz Created Successfully!
          </h3>
          <p className="text-muted-foreground">
            Your quiz{' '}
            <span className="font-bold text-foreground">
              &quot;{quizName}&quot;
            </span>{' '}
            is now live and ready to be shared.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-8">
        <CopyableLink link={quizLink} label="Shareable Link" />
      </div>
    </div>
  );
};
