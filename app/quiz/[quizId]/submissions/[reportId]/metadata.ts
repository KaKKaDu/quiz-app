import { getCachedQuiz } from '@/lib/metadata/metadata-fetchers';
import { MetadataFactory } from '@/types/common.types';

/**
 * Metadata factory for a specific Quiz Submission page.
 */
export const getSubmissionMetadata: MetadataFactory<string> = async (
  quizId
) => {
  const result = await getCachedQuiz(quizId, false);

  if (!result.success || !result.data) {
    return { title: 'Submission Not Found' };
  }

  const quiz = result.data;

  return {
    title: `Submission: ${quiz.name} | QuizApp`,
    description: `Detailed review of a specific submission for ${quiz.name}.`,
    openGraph: {
      title: `Quiz Submission: ${quiz.name}`,
      description: `Reviewing the detailed results for ${quiz.name}.`,
      type: 'article',
    },
  };
};
