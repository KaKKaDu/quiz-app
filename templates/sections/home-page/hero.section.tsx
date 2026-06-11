import React from 'react';
import { HeroNavigation } from '@/templates/components/home/hero-navigation';

/**
 * HeroSection for the home page.
 * Provides a welcoming title, description, and primary call to action.
 * Adheres to monochrome minimalistic standards and responsive breakpoints.
 */
export const HeroSection = () => {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 p-4 sm:p-8 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          Welcome to QuizApp
        </h1>
        <p className="mx-auto max-w-[40rem] text-muted-foreground sm:text-xl">
          Create simple customized quizzes and share them with anyone.
        </p>
      </div>

      <HeroNavigation />
    </section>
  );
};
