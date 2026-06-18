import { cache } from 'react';
import { getQuizService } from '@/services/quiz';
import { getQuizResultsService } from '@/services/quiz-results';
import { getQuizQuestionService } from '@/services/quiz-question';

/**
 * Cached fetcher for quiz data.
 * React cache() ensures that multiple calls within the same request
 * (e.g., generateMetadata and Page component) only trigger one DB fetch.
 */
export const getCachedQuiz = cache(
  async (id: string, full: boolean = false) => {
    const quizService = getQuizService();
    return quizService.getQuiz(id, full);
  }
);

/**
 * Cached fetcher for quiz results.
 */
export const getCachedResults = cache(async (id: string) => {
  const resultsService = getQuizResultsService();
  return resultsService.getResults(id);
});

/**
 * Cached fetcher for quiz questions.
 */
export const getCachedQuestions = cache(async (ids: string[]) => {
  const questionService = getQuizQuestionService();
  return questionService.getQuestions(ids);
});
