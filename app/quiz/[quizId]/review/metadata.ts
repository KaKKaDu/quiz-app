import { getCachedQuiz } from '@/lib/metadata/metadata-fetchers';
import { MetadataFactory } from '@/types/common.types';

/**
 * Metadata factory for the Quiz Results (Review) page.
 */
export const getQuizReviewMetadata: MetadataFactory<string> = async (
  quizId
) => {
  const result = await getCachedQuiz(quizId, false);

  if (!result.success || !result.data) {
    return { title: 'Results Not Found' };
  }

  const quiz = result.data;

  return {
    title: `Results: ${quiz.name} | QuizApp`,
    description: `View the performance statistics for ${quiz.name}.`,
    openGraph: {
      title: `Quiz Results: ${quiz.name}`,
      description: `Check out how people are performing on ${quiz.name}.`,
      type: 'article',
    },
  };
};
