import { getQuizService } from '@/services/quiz';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type QuizResultsPageProps = {
  params: Promise<{
    quizId: string;
  }>;
};

import React from 'react';
import { notFound } from 'next/navigation';
import { QuizFull } from '@/schemas/zod/quiz.zod';
import QuizResultsSection from '@/templates/sections/quiz-results-page/quiz-results.section';
import { Logger } from '@/lib/logger';

const QuizResultsPage = async ({ params }: QuizResultsPageProps) => {
  const { quizId } = await params;
  const quizService = getQuizService();

  // Fetch the full quiz including questions
  const result = await quizService.getQuiz(quizId, true);

  if (!result.success || !result.data) {
    return notFound();
  }

  // Cast because we requested full: true and serialize to plain object
  const quiz = JSON.parse(JSON.stringify(result.data)) as QuizFull;

  return <QuizResultsSection quiz={quiz} />;
};

export default QuizResultsPage;
