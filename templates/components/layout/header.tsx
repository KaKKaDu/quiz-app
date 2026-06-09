import React from 'react';
import Link from 'next/link';

/**
 * Header component providing the main navigation and branding for the application.
 * Adheres to minimalistic monochrome standards and uses strict REM-based spacing.
 */
export const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          QuizApp
        </Link>
      </div>

      {/* Placeholder for future theme switcher or navigation */}
      <div className="flex items-center gap-4" />
    </header>
  );
};
