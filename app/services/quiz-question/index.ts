import { getMongoService } from '../mongo';
import { QuizQuestionRepository } from './quiz-question.repository';
import { QuizQuestionService } from './quiz-question.service';
import { Nullable } from '@/app/types/common.types';

let quizQuestionService: Nullable<QuizQuestionService> = null;

/**
 * Returns a singleton instance of the QuizQuestionService.
 */
export const getQuizQuestionService = (): QuizQuestionService => {
  if (!quizQuestionService) {
    const mongoService = getMongoService();
    const repository: QuizQuestionRepository = new QuizQuestionRepository(
      mongoService
    );
    quizQuestionService = new QuizQuestionService(repository);
  }
  return quizQuestionService;
};
