import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { QuizFull } from '@/schemas/zod/quiz.zod';
import QuizResultsSection from '@/templates/sections/quiz-results-page/quiz-results.section';
import { getCachedQuiz } from '@/lib/metadata/metadata-fetchers';
import { getQuizReviewMetadata } from './metadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type QuizResultsPageProps = {
  params: Promise<{
    quizId: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: QuizResultsPageProps): Promise<Metadata> => {
  const { quizId } = await params;
  return getQuizReviewMetadata(quizId);
};

const QuizResultsPage = async ({ params }: QuizResultsPageProps) => {
  const { quizId } = await params;

  // Fetch the full quiz including questions (cached)
  const result = await getCachedQuiz(quizId, true);

  if (!result.success || !result.data) {
    return notFound();
  }

  // Cast because we requested full: true and serialize to plain object
  const quiz = JSON.parse(JSON.stringify(result.data)) as QuizFull;

  return <QuizResultsSection quiz={quiz} />;
};

export default QuizResultsPage;
