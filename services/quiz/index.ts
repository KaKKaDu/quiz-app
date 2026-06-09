import { getMongoService } from '../mongo';
import { getQuizQuestionService } from '../quiz-question';
import { getQuizResultsService } from '../quiz-results';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';
import { Nullable } from '@/types/common.types';

let quizService: Nullable<QuizService> = null;

/**
 * Returns a singleton instance of the QuizService.
 */
export const getQuizService = (): QuizService => {
  if (!quizService) {
    const mongoService = getMongoService();
    const quizQuestionService = getQuizQuestionService();
    const quizResultsService = getQuizResultsService();
    const repository: QuizRepository = new QuizRepository(mongoService);
    quizService = new QuizService(
      repository,
      quizQuestionService,
      quizResultsService
    );
  }
  return quizService;
};
