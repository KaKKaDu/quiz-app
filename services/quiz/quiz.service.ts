import { Quiz, QuizFull } from '@/schemas/zod/quiz.zod';
import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { QuizResults } from '@/schemas/zod/quiz-results.zod';
import { SuccessDataAny, handleError } from '../../lib/errors';
import { Logger } from '@/lib/logger';
import { QuizRepository } from './quiz.repository';
import { QuizQuestionService } from '../quiz-question/quiz-question.service';
import { QuizResultsService } from '../quiz-results/quiz-results.service';
import { Nullable } from '@/types/common.types';

export class QuizService {
  constructor(
    private readonly repository: QuizRepository,
    private readonly quizQuestionService: QuizQuestionService,
    private readonly quizResultsService: QuizResultsService
  ) {}

  async createQuiz(quiz: Quiz): Promise<SuccessDataAny<Quiz>> {
    const context: string = 'QuizService.createQuiz';
    const result: SuccessDataAny<Quiz> = await this.repository.create(quiz);
    Logger.report(context, result);
    return result;
  }

  async deleteQuiz(id: string): Promise<SuccessDataAny<{ deleted: boolean }>> {
    const context: string = 'QuizService.deleteQuiz';
    const result: SuccessDataAny<{ deleted: boolean }> =
      await this.repository.delete(id);
    Logger.report(context, result);
    return result;
  }

  async addQuizResult(
    quizId: string,
    results: QuizResults
  ): Promise<SuccessDataAny<QuizResults>> {
    const context: string = 'QuizService.addQuizResult';
    try {
      // 1. Create the results record
      const createResult: SuccessDataAny<QuizResults> =
        await this.quizResultsService.createResults(results);

      if (!createResult.success) {
        return createResult;
      }

      // 2. Update the quiz to include the new result ID
      const updateQuizResult: SuccessDataAny<{ updated: boolean }> =
        await this.repository.addResultId(quizId, results.id);

      if (!updateQuizResult.success) {
        // Note: In a real app we might want to rollback the createResult here,
        // but for now we'll just report the failure.
        return updateQuizResult as unknown as SuccessDataAny<QuizResults>;
      }

      Logger.report(context, createResult);
      return createResult;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<QuizResults> =
        handleError<QuizResults>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async getQuiz(
    id: string,
    full: boolean = false
  ): Promise<SuccessDataAny<Nullable<Quiz | QuizFull>>> {
    const context: string = 'QuizService.getQuiz';
    try {
      const quizResult: SuccessDataAny<Nullable<Quiz>> =
        await this.repository.findById(id);

      if (!quizResult.success || !quizResult.data) {
        return quizResult as SuccessDataAny<Nullable<Quiz | QuizFull>>;
      }

      if (!full) {
        return quizResult as SuccessDataAny<Nullable<Quiz | QuizFull>>;
      }

      const quiz: Quiz = quizResult.data;

      // Fetch Questions
      const questionsResult: SuccessDataAny<QuizQuestion[]> =
        await this.quizQuestionService.getQuestions(quiz.questionIds);

      if (!questionsResult.success) {
        return questionsResult as unknown as SuccessDataAny<
          Nullable<Quiz | QuizFull>
        >;
      }

      // Fetch Results
      const resultsResult: SuccessDataAny<QuizResults[]> =
        await this.quizResultsService.getResultsList(quiz.resultIds);

      if (!resultsResult.success) {
        return resultsResult as unknown as SuccessDataAny<
          Nullable<Quiz | QuizFull>
        >;
      }

      const fullQuiz: QuizFull = {
        id: quiz.id,
        name: quiz.name,
        author: quiz.author,
        data: questionsResult.data!,
        results: resultsResult.data!,
      };

      const result: SuccessDataAny<QuizFull> = {
        success: true,
        data: fullQuiz,
      };
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<Nullable<Quiz | QuizFull>> =
        handleError<Nullable<Quiz | QuizFull>>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }
}
