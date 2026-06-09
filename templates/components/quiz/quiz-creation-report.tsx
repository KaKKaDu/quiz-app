'use client';

import React, { useState } from 'react';
import { Button } from '@/templates/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  CopyIcon,
  WarningIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from '@phosphor-icons/react';

type QuizCreationReportProps = {
  quizId?: string;
  error?: string;
  quizName?: string;
};

/**
 * QuizCreationReport displays the final result of the quiz creation process.
 * Provides a shareable link and feedback on success or failure.
 * Adheres to monochrome minimalistic style.
 */
export const QuizCreationReport = ({
  quizId,
  error,
  quizName,
}: QuizCreationReportProps) => {
  const [copied, setCopied] = useState(false);

  // In a real app, this would come from an environment variable or window.location
  const domain = typeof window !== 'undefined' ? window.location.origin : '';
  const quizLink = `${domain}/quiz/${quizId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quizLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

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
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Shareable Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 truncate border border-border bg-muted/30 p-3 text-sm font-mono text-muted-foreground">
              {quizLink}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className={cn(
                'size-12 shrink-0 transition-colors',
                copied && 'border-green-500 text-green-500'
              )}
              title="Copy to clipboard"
            >
              {copied ? <CheckCircleIcon size={20} /> : <CopyIcon size={20} />}
            </Button>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="flex-1 py-6 text-xs font-bold uppercase tracking-widest"
          >
            <Link href={`/quiz/${quizId}`}>
              View Quiz <ArrowRightIcon size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
