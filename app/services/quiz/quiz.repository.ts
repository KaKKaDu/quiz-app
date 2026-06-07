import { QuizModel } from '@/app/schemas/mongodb/quiz.mongo';
import { Quiz } from '@/app/schemas/zod/quiz.zod';
import { SuccessDataAny, handleError } from '@/app/errors';
import { Logger } from '@/lib/logger';
import { MongoService } from '../mongo/mongo.service';
import { Nullable } from '@/app/types/common.types';

export class QuizRepository {
  constructor(private readonly mongoService: MongoService) {}

  async create(quiz: Quiz): Promise<SuccessDataAny<Quiz>> {
    const context: string = 'QuizRepository.create';
    try {
      const result: SuccessDataAny<Quiz> = await this.mongoService.execute(
        async () => {
          const newQuiz = new QuizModel(quiz);
          await newQuiz.save();
          const saved: Quiz = newQuiz.toObject();
          return saved;
        }
      );
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<Quiz> = handleError<Quiz>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async findById(id: string): Promise<SuccessDataAny<Nullable<Quiz>>> {
    const context: string = 'QuizRepository.findById';
    try {
      const result: SuccessDataAny<Nullable<Quiz>> =
        await this.mongoService.execute(async () => {
          const quiz = await QuizModel.findOne({ id }).exec();
          const found: Nullable<Quiz> = quiz ? quiz.toObject() : null;
          return found;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<Nullable<Quiz>> =
        handleError<Nullable<Quiz>>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async delete(id: string): Promise<SuccessDataAny<{ deleted: boolean }>> {
    const context: string = 'QuizRepository.delete';
    try {
      const result: SuccessDataAny<{ deleted: boolean }> =
        await this.mongoService.execute(async () => {
          const deleteResult = await QuizModel.deleteOne({ id }).exec();
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

  async addResultId(
    quizId: string,
    resultId: string
  ): Promise<SuccessDataAny<{ updated: boolean }>> {
    const context: string = 'QuizRepository.addResultId';
    try {
      const result: SuccessDataAny<{ updated: boolean }> =
        await this.mongoService.execute(async () => {
          const updateResult = await QuizModel.updateOne(
            { id: quizId },
            { $addToSet: { resultIds: resultId } }
          ).exec();
          const updated: { updated: boolean } = {
            updated: (updateResult.modifiedCount || 0) > 0,
          };
          return updated;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<{ updated: boolean }> = handleError<{
        updated: boolean;
      }>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }
}
