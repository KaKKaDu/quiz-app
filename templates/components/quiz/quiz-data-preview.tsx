'use client';

import React from 'react';
import { QuizFormValues } from '@/schemas/zod/quiz-form.zod';
import { UserIcon, NotebookIcon, QuotesIcon } from '@phosphor-icons/react';

type QuizDataPreviewProps = {
  data: QuizFormValues;
  onEdit?: () => void;
};

/**
 * QuizDataPreview provides a read-only view of the basic quiz information.
 * Typically shown after the QuizForm is submitted to confirm initial setup.
 * Adheres to monochrome minimalistic style.
 */
export const QuizDataPreview = ({ data, onEdit }: QuizDataPreviewProps) => {
  return (
    <div className="flex w-full flex-col gap-6 border border-border bg-background p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Quiz
        </h3>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-[10px] font-bold uppercase tracking-widest text-primary underline-offset-4 hover:underline"
          >
            Edit Info
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Quiz Name */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <NotebookIcon size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Quiz Name
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground">{data.name}</p>
        </div>

        {/* Author */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <UserIcon size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Author
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground">{data.author}</p>
        </div>

        {/* Description */}
        <div className="col-span-1 flex flex-col gap-2 sm:col-span-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <QuotesIcon size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Description
            </span>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};
