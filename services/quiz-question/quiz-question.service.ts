import { QuizQuestion } from '@/schemas/zod/quiz-question.zod';
import { SuccessDataAny } from '../../lib/errors';
import { Logger } from '@/lib/logger';
import { QuizQuestionRepository } from './quiz-question.repository';
import { Nullable } from '@/types/common.types';

export class QuizQuestionService {
  constructor(private readonly repository: QuizQuestionRepository) {}

  async createQuestion(
    question: QuizQuestion
  ): Promise<SuccessDataAny<QuizQuestion>> {
    const context: string = 'QuizQuestionService.createQuestion';
    const result: SuccessDataAny<QuizQuestion> =
      await this.repository.create(question);
    Logger.report(context, result);
    return result;
  }

  async getQuestion(
    id: string
  ): Promise<SuccessDataAny<Nullable<QuizQuestion>>> {
    const context: string = 'QuizQuestionService.getQuestion';
    const result: SuccessDataAny<Nullable<QuizQuestion>> =
      await this.repository.findById(id);
    Logger.report(context, result);
    return result;
  }

  async getQuestions(ids: string[]): Promise<SuccessDataAny<QuizQuestion[]>> {
    const context: string = 'QuizQuestionService.getQuestions';
    const result: SuccessDataAny<QuizQuestion[]> =
      await this.repository.findByIds(ids);
    Logger.report(context, result);
    return result;
  }

  async updateQuestion(
    id: string,
    updateData: Partial<QuizQuestion>
  ): Promise<SuccessDataAny<Nullable<QuizQuestion>>> {
    const context: string = 'QuizQuestionService.updateQuestion';
    const result: SuccessDataAny<Nullable<QuizQuestion>> =
      await this.repository.update(id, updateData);
    Logger.report(context, result);
    return result;
  }

  async deleteQuestion(
    id: string
  ): Promise<SuccessDataAny<{ deleted: boolean }>> {
    const context: string = 'QuizQuestionService.deleteQuestion';
    const result: SuccessDataAny<{ deleted: boolean }> =
      await this.repository.delete(id);
    Logger.report(context, result);
    return result;
  }

  async getAllQuestions(): Promise<SuccessDataAny<QuizQuestion[]>> {
    const context: string = 'QuizQuestionService.getAllQuestions';
    const result: SuccessDataAny<QuizQuestion[]> =
      await this.repository.findAll();
    Logger.report(context, result);
    return result;
  }
}
