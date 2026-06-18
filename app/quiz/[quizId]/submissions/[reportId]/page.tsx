import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getCachedQuiz,
  getCachedResults,
  getCachedQuestions,
} from '@/lib/metadata/metadata-fetchers';
import { QuizReviewSection } from '@/templates/sections/quiz-page/quiz-review.section';
import { Quiz, QuizFull } from '@/schemas/zod/quiz.zod';
import { getSubmissionMetadata } from './metadata';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type QuizReviewPageProps = {
  params: Promise<{
    quizId: string;
    reportId: string;
  }>;
};

export const generateMetadata = async ({
  params,
}: QuizReviewPageProps): Promise<Metadata> => {
  const { quizId } = await params;
  return getSubmissionMetadata(quizId);
};

/**
 * QuizReviewPage server component.
 * Fetches and verifies a specific quiz result and renders the review.
 */
export default async function QuizReviewPage({ params }: QuizReviewPageProps) {
  const { quizId, reportId } = await params;

  // 1. Fetch the base quiz to verify existence and check results array (cached)
  const quizBaseResult = await getCachedQuiz(quizId, false);
  if (!quizBaseResult.success || !quizBaseResult.data) {
    return notFound();
  }

  // Cast to Quiz (base) because full: false was requested
  const quizBase = quizBaseResult.data as Quiz;

  // 2. Verify that this result ID actually belongs to this quiz
  if (!quizBase.resultIds.includes(reportId)) {
    return notFound();
  }

  // 3. Fetch the specific result (cached)
  const resultData = await getCachedResults(reportId);
  if (!resultData.success || !resultData.data) {
    return notFound();
  }

  // 4. Fetch the questions for this quiz (cached)
  const questionsResult = await getCachedQuestions(quizBase.questionIds);
  if (!questionsResult.success || !questionsResult.data) {
    return notFound();
  }

  // 5. Build the QuizFull object for the section
  const fullQuiz: QuizFull = {
    ...quizBase,
    data: questionsResult.data,
    results: [], // We don't need all other results for a single review
  };

  // Serialize to plain objects for client component
  const serializedQuiz = JSON.parse(JSON.stringify(fullQuiz)) as QuizFull;
  const serializedResults = JSON.parse(JSON.stringify(resultData.data));

  return (
    <QuizReviewSection quiz={serializedQuiz} results={serializedResults} />
  );
}
