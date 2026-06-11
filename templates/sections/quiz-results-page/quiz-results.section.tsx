'use client';

import { QuizFull } from '@/schemas/zod/quiz.zod';
import { QuizDataPreview } from '@/templates/components/quiz/quiz-data-preview';
import QuizResultsPreview from '@/templates/components/quiz/quiz-results-preview';
import QuizResultsNavigation from '@/templates/components/quiz-results/quiz-results-navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type QuizResultsSectionProps = {
  quiz: QuizFull;
};

const QuizResultsSection = ({ quiz }: QuizResultsSectionProps) => {
  return (
    <div
      className={'mx-auto flex w-full max-w-[40rem] flex-col gap-12 p-4 sm:p-8'}
    >
      <QuizResultsNavigation quizId={quiz.id} />
      <QuizDataPreview
        data={{
          name: quiz.name,
          author: quiz.author,
          description: quiz.description || 'No description provided.',
        }}
      />
      <QuizResultsPreview results={quiz.results} />
    </div>
  );
};

export default QuizResultsSection;
