import { getCachedQuiz } from '@/lib/metadata/metadata-fetchers';
import { MetadataFactory } from '@/types/common.types';

/**
 * Metadata factory for the Quiz Execution page.
 */
export const getQuizMetadata: MetadataFactory<string> = async (quizId) => {
  const result = await getCachedQuiz(quizId, false);

  if (!result.success || !result.data) {
    return { title: 'Quiz Not Found' };
  }

  const quiz = result.data;

  return {
    title: `${quiz.name} | QuizApp`,
    description: quiz.description || `Take the quiz: ${quiz.name}`,
    openGraph: {
      title: `${quiz.name} | QuizApp`,
      description:
        quiz.description || `Challenge yourself with the ${quiz.name} quiz.`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: quiz.name,
      description: quiz.description,
    },
  };
};
