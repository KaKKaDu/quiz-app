import { getMongoService } from '../mongo';
import { getQuizQuestionService } from '../quiz-question';
import { getQuizResultsService } from '../quiz-results';
import { QuizRepository } from './quiz.repository';
import { QuizService } from './quiz.service';

/**
 * Caching the QuizService on globalThis to prevent multiple instances
 * during Next.js hot reloads in development.
 */
const globalWithQuiz = globalThis as unknown as {
  quizService: QuizService | undefined;
};

/**
 * Returns a singleton instance of the QuizService.
 */
export const getQuizService = (): QuizService => {
  if (!globalWithQuiz.quizService) {
    const mongoService = getMongoService();
    const quizQuestionService = getQuizQuestionService();
    const quizResultsService = getQuizResultsService();
    const repository: QuizRepository = new QuizRepository(mongoService);
    globalWithQuiz.quizService = new QuizService(
      repository,
      quizQuestionService,
      quizResultsService
    );
  }
  return globalWithQuiz.quizService;
};
