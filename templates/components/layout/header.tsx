import React from 'react';
import Link from 'next/link';

import { ThemeToggle } from './theme-toggle';

/**
 * Header component providing the main navigation and branding for the application.
 * Adheres to minimalistic monochrome standards and uses strict REM-based spacing.
 */
export const Header = () => {
  return (
    <>
      <div
        className={'fixed left-0 top-[-8rem] h-[8rem] w-full bg-background'}
      />
      <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background px-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            QuizApp
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>
    </>
  );
};
