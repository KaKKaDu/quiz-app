import { QuizResultsModel } from '@/schemas/mongodb/quiz-results.mongo';
import { QuizResults } from '@/schemas/zod/quiz-results.zod';
import { SuccessDataAny, handleError } from '../../lib/errors';
import { Logger } from '@/lib/logger';
import { MongoService } from '../mongo/mongo.service';
import { Nullable } from '@/types/common.types';

export class QuizResultsRepository {
  constructor(private readonly mongoService: MongoService) {}

  async create(results: QuizResults): Promise<SuccessDataAny<QuizResults>> {
    const context: string = 'QuizResultsRepository.create';
    try {
      const result: SuccessDataAny<QuizResults> =
        await this.mongoService.execute(async () => {
          const newResults = new QuizResultsModel(results);
          await newResults.save();
          const saved: QuizResults = newResults.toObject();
          return saved;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<QuizResults> =
        handleError<QuizResults>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async findById(id: string): Promise<SuccessDataAny<Nullable<QuizResults>>> {
    const context: string = 'QuizResultsRepository.findById';
    try {
      const result: SuccessDataAny<Nullable<QuizResults>> =
        await this.mongoService.execute(async () => {
          const results = await QuizResultsModel.findOne({ id }).exec();
          const found: Nullable<QuizResults> = results
            ? results.toObject()
            : null;
          return found;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<Nullable<QuizResults>> =
        handleError<Nullable<QuizResults>>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async findByIds(ids: string[]): Promise<SuccessDataAny<QuizResults[]>> {
    const context: string = 'QuizResultsRepository.findByIds';
    try {
      const result: SuccessDataAny<QuizResults[]> =
        await this.mongoService.execute(async () => {
          const results = await QuizResultsModel.find({
            id: { $in: ids },
          }).exec();
          const list: QuizResults[] = results.map((r) => r.toObject());
          return list;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<QuizResults[]> =
        handleError<QuizResults[]>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async delete(id: string): Promise<SuccessDataAny<{ deleted: boolean }>> {
    const context: string = 'QuizResultsRepository.delete';
    try {
      const result: SuccessDataAny<{ deleted: boolean }> =
        await this.mongoService.execute(async () => {
          const deleteResult = await QuizResultsModel.deleteOne({ id }).exec();
          const deleted: { deleted: boolean } = {
            deleted: deleteResult.deletedCount > 0,
          };
          return deleted;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<{ deleted: boolean }> = handleError<{
        deleted: boolean;
      }>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }
}
