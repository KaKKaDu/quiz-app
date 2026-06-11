'use client';

import React, { useState } from 'react';
import { CheckCircleIcon, CopyIcon } from '@phosphor-icons/react';
import { Button } from '@/templates/components/ui/button';
import { cn } from '@/lib/utils/cn';

type CopyableLinkProps = {
  link: string;
  label?: string;
  className?: string;
};

/**
 * CopyableLink provides a standardized UI for displaying a link with a copy button.
 * Adheres to monochrome minimalist style.
 */
export const CopyableLink = ({ link, label, className }: CopyableLinkProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <div className="flex-1 truncate border border-border bg-muted/30 p-3 text-sm font-mono text-muted-foreground">
          {link || 'Link will appear here...'}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopy}
          disabled={!link}
          className={cn(
            'shrink-0 transition-colors',
            copied && 'border-green-500 text-green-500'
          )}
          title="Copy to clipboard"
        >
          {copied ? <CheckCircleIcon size={20} /> : <CopyIcon size={20} />}
        </Button>
      </div>
    </div>
  );
};
