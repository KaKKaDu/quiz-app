import { notFound } from 'next/navigation';
import { getQuizService } from '@/services/quiz';
import { getQuizQuestionService } from '@/services/quiz-question';
import { getQuizResultsService } from '@/services/quiz-results';
import { QuizReviewSection } from '@/templates/sections/quiz-page/quiz-review.section';
import { Quiz, QuizFull } from '@/schemas/zod/quiz.zod';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type QuizReviewPageProps = {
  params: Promise<{
    quizId: string;
    reportId: string;
  }>;
};

/**
 * QuizReviewPage server component.
 * Fetches and verifies a specific quiz result and renders the review.
 */
export default async function QuizReviewPage({ params }: QuizReviewPageProps) {
  const { quizId, reportId } = await params;

  const quizService = getQuizService();
  const questionService = getQuizQuestionService();
  const resultsService = getQuizResultsService();

  // 1. Fetch the base quiz to verify existence and check results array
  const quizBaseResult = await quizService.getQuiz(quizId, false);
  if (!quizBaseResult.success || !quizBaseResult.data) {
    return notFound();
  }

  // Cast to Quiz (base) because full: false was requested
  const quizBase = quizBaseResult.data as Quiz;

  // 2. Verify that this result ID actually belongs to this quiz
  if (!quizBase.resultIds.includes(reportId)) {
    return notFound();
  }

  // 3. Fetch the specific result
  const resultData = await resultsService.getResults(reportId);
  if (!resultData.success || !resultData.data) {
    return notFound();
  }

  // 4. Fetch the questions for this quiz
  const questionsResult = await questionService.getQuestions(
    quizBase.questionIds
  );
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
