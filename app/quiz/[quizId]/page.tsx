import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCachedQuiz } from '@/lib/metadata/metadata-fetchers';
import { QuizSection } from '@/templates/sections/quiz-page/quiz.section';
import { QuizFull } from '@/schemas/zod/quiz.zod';
import { getQuizMetadata } from './metadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type QuizPageProps = {
  params: Promise<{
    quizId: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: QuizPageProps): Promise<Metadata> => {
  const { quizId } = await params;
  return getQuizMetadata(quizId);
};

/**
 * QuizPage server component.
 * Fetches the full quiz data and renders the QuizSection.
 * Handles 404 if the quiz is not found.
 */
export default async function QuizPage({ params }: QuizPageProps) {
  const { quizId } = await params;

  // Fetch the full quiz including questions (cached)
  const result = await getCachedQuiz(quizId, true);

  if (!result.success || !result.data) {
    return notFound();
  }

  // Cast because we requested full: true and serialize to plain object
  const quiz = JSON.parse(JSON.stringify(result.data)) as QuizFull;

  return <QuizSection quiz={quiz} />;
}
