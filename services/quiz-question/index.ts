import { getMongoService } from '../mongo';
import { QuizQuestionRepository } from './quiz-question.repository';
import { QuizQuestionService } from './quiz-question.service';

/**
 * Caching the QuizQuestionService on globalThis to prevent multiple instances
 * during Next.js hot reloads in development.
 */
const globalWithQuizQuestion = globalThis as unknown as {
  quizQuestionService: QuizQuestionService | undefined;
};

/**
 * Returns a singleton instance of the QuizQuestionService.
 */
export const getQuizQuestionService = (): QuizQuestionService => {
  if (!globalWithQuizQuestion.quizQuestionService) {
    const mongoService = getMongoService();
    const repository: QuizQuestionRepository = new QuizQuestionRepository(
      mongoService
    );
    globalWithQuizQuestion.quizQuestionService = new QuizQuestionService(
      repository
    );
  }
  return globalWithQuizQuestion.quizQuestionService;
};
