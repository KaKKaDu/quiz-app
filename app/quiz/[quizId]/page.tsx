import { notFound } from 'next/navigation';
import { getQuizService } from '@/services/quiz';
import { QuizSection } from '@/templates/sections/quiz-page/quiz.section';
import { QuizFull } from '@/schemas/zod/quiz.zod';

type QuizPageProps = {
  params: Promise<{
    quizId: string;
  }>;
};

/**
 * QuizPage server component.
 * Fetches the full quiz data and renders the QuizSection.
 * Handles 404 if the quiz is not found.
 */
export default async function QuizPage({ params }: QuizPageProps) {
  const { quizId } = await params;
  const quizService = getQuizService();

  // Fetch the full quiz including questions
  const result = await quizService.getQuiz(quizId, true);

  if (!result.success || !result.data) {
    return notFound();
  }

  console.log(result.data);
  // Cast because we requested full: true and serialize to plain object
  const quiz = JSON.parse(JSON.stringify(result.data)) as QuizFull;

  return <QuizSection quiz={quiz} />;
}
