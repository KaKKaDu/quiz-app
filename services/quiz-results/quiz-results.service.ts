import { QuizResults } from '@/schemas/zod/quiz-results.zod';
import { SuccessDataAny } from '../../lib/errors';
import { Logger } from '@/lib/logger';
import { QuizResultsRepository } from './quiz-results.repository';
import { Nullable } from '@/types/common.types';

export class QuizResultsService {
  constructor(private readonly repository: QuizResultsRepository) {}

  async createResults(
    results: QuizResults
  ): Promise<SuccessDataAny<QuizResults>> {
    const context: string = 'QuizResultsService.createResults';
    const result: SuccessDataAny<QuizResults> =
      await this.repository.create(results);
    Logger.report(context, result);
    return result;
  }

  async getResults(id: string): Promise<SuccessDataAny<Nullable<QuizResults>>> {
    const context: string = 'QuizResultsService.getResults';
    const result: SuccessDataAny<Nullable<QuizResults>> =
      await this.repository.findById(id);
    Logger.report(context, result);
    return result;
  }

  async getResultsList(ids: string[]): Promise<SuccessDataAny<QuizResults[]>> {
    const context: string = 'QuizResultsService.getResultsList';
    const result: SuccessDataAny<QuizResults[]> =
      await this.repository.findByIds(ids);
    Logger.report(context, result);
    return result;
  }

  async deleteResults(
    id: string
  ): Promise<SuccessDataAny<{ deleted: boolean }>> {
    const context: string = 'QuizResultsService.deleteResults';
    const result: SuccessDataAny<{ deleted: boolean }> =
      await this.repository.delete(id);
    Logger.report(context, result);
    return result;
  }
}
