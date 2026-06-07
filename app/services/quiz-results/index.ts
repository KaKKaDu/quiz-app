import { getMongoService } from '../mongo';
import { QuizResultsRepository } from './quiz-results.repository';
import { QuizResultsService } from './quiz-results.service';
import { Nullable } from '@/app/types/common.types';

let quizResultsService: Nullable<QuizResultsService> = null;

/**
 * Returns a singleton instance of the QuizResultsService.
 */
export const getQuizResultsService = (): QuizResultsService => {
  if (!quizResultsService) {
    const mongoService = getMongoService();
    const repository: QuizResultsRepository = new QuizResultsRepository(
      mongoService
    );
    quizResultsService = new QuizResultsService(repository);
  }
  return quizResultsService;
};
