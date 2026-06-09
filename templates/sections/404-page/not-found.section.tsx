import React from 'react';
import { NotFoundNavigation } from '@/templates/components/not-found/not-found-navigation';

/**
 * NotFoundSection for the 404 page.
 * Provides a clean 404 message and a link back to the home page.
 */
export const NotFoundSection = () => {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-8 p-8 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-6xl font-bold tracking-tighter text-foreground sm:text-8xl">
          404
        </h1>
        <p className="mx-auto max-w-[30rem] text-muted-foreground sm:text-xl">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>

      <NotFoundNavigation />
    </section>
  );
};
