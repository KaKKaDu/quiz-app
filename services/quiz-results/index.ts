import { getMongoService } from '../mongo';
import { QuizResultsRepository } from './quiz-results.repository';
import { QuizResultsService } from './quiz-results.service';

/**
 * Caching the QuizResultsService on globalThis to prevent multiple instances
 * during Next.js hot reloads in development.
 */
const globalWithQuizResults = globalThis as unknown as {
  quizResultsService: QuizResultsService | undefined;
};

/**
 * Returns a singleton instance of the QuizResultsService.
 */
export const getQuizResultsService = (): QuizResultsService => {
  if (!globalWithQuizResults.quizResultsService) {
    const mongoService = getMongoService();
    const repository: QuizResultsRepository = new QuizResultsRepository(
      mongoService
    );
    globalWithQuizResults.quizResultsService = new QuizResultsService(
      repository
    );
  }
  return globalWithQuizResults.quizResultsService;
};
