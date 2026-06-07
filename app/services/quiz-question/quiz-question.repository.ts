import { QuizQuestionModel } from '@/app/schemas/mongodb/quiz-question.mongo';
import { QuizQuestion } from '@/app/schemas/zod/quiz-question.zod';
import { SuccessDataAny, handleError } from '@/app/errors';
import { Logger } from '@/lib/logger';
import { MongoService } from '../mongo/mongo.service';
import { Nullable } from '@/app/types/common.types';

export class QuizQuestionRepository {
  constructor(private readonly mongoService: MongoService) {}

  async create(question: QuizQuestion): Promise<SuccessDataAny<QuizQuestion>> {
    const context: string = 'QuizQuestionRepository.create';
    try {
      const result: SuccessDataAny<QuizQuestion> =
        await this.mongoService.execute(async () => {
          const newQuestion = new QuizQuestionModel(question);
          await newQuestion.save();
          const saved: QuizQuestion = newQuestion.toObject();
          return saved;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<QuizQuestion> =
        handleError<QuizQuestion>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async findById(id: string): Promise<SuccessDataAny<Nullable<QuizQuestion>>> {
    const context: string = 'QuizQuestionRepository.findById';
    try {
      const result: SuccessDataAny<Nullable<QuizQuestion>> =
        await this.mongoService.execute(async () => {
          const question = await QuizQuestionModel.findOne({ id }).exec();
          const found: Nullable<QuizQuestion> = question
            ? question.toObject()
            : null;
          return found;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<Nullable<QuizQuestion>> =
        handleError<Nullable<QuizQuestion>>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async findByIds(ids: string[]): Promise<SuccessDataAny<QuizQuestion[]>> {
    const context: string = 'QuizQuestionRepository.findByIds';
    try {
      const result: SuccessDataAny<QuizQuestion[]> =
        await this.mongoService.execute(async () => {
          const questions = await QuizQuestionModel.find({
            id: { $in: ids },
          }).exec();
          const list: QuizQuestion[] = questions.map((q) => q.toObject());
          return list;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<QuizQuestion[]> =
        handleError<QuizQuestion[]>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async update(
    id: string,
    updateData: Partial<QuizQuestion>
  ): Promise<SuccessDataAny<Nullable<QuizQuestion>>> {
    const context: string = 'QuizQuestionRepository.update';
    try {
      const result: SuccessDataAny<Nullable<QuizQuestion>> =
        await this.mongoService.execute(async () => {
          const updatedQuestion = await QuizQuestionModel.findOneAndUpdate(
            { id },
            { $set: updateData },
            { new: true }
          ).exec();
          const updated: Nullable<QuizQuestion> = updatedQuestion
            ? updatedQuestion.toObject()
            : null;
          return updated;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<Nullable<QuizQuestion>> =
        handleError<Nullable<QuizQuestion>>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }

  async delete(id: string): Promise<SuccessDataAny<{ deleted: boolean }>> {
    const context: string = 'QuizQuestionRepository.delete';
    try {
      const result: SuccessDataAny<{ deleted: boolean }> =
        await this.mongoService.execute(async () => {
          const deleteResult = await QuizQuestionModel.deleteOne({ id }).exec();
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

  async findAll(): Promise<SuccessDataAny<QuizQuestion[]>> {
    const context: string = 'QuizQuestionRepository.findAll';
    try {
      const result: SuccessDataAny<QuizQuestion[]> =
        await this.mongoService.execute(async () => {
          const questions = await QuizQuestionModel.find().exec();
          const list: QuizQuestion[] = questions.map((q) => q.toObject());
          return list;
        });
      Logger.report(context, result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<QuizQuestion[]> =
        handleError<QuizQuestion[]>(error);
      Logger.report(context, failedResult);
      return failedResult;
    }
  }
}
