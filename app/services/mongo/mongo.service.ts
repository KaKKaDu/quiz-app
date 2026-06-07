import { Mongoose } from 'mongoose';
import { MongoRepository } from './mongo.repository';
import { SuccessDataAny, handleError, DataObject } from '@/app/errors';
import { Logger } from '@/lib/logger';

export class MongoService {
  constructor(private readonly repository: MongoRepository) {}

  /**
   * Executes a callback within the context of a MongoDB connection.
   * Encapsulates connection logic and error handling.
   */
  async execute<T extends DataObject>(
    callback: (db: Mongoose) => Promise<T>
  ): Promise<SuccessDataAny<T>> {
    const connectionResult: SuccessDataAny<Mongoose> =
      await this.repository.getConnection();

    if (!connectionResult.success) {
      return connectionResult as unknown as SuccessDataAny<T>;
    }

    try {
      const data: T = await callback(connectionResult.data!);
      const result: SuccessDataAny<T> = { success: true, data };
      Logger.report('MongoService.execute', result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<T> = handleError<T>(error);
      Logger.report('MongoService.execute', failedResult);
      return failedResult;
    }
  }
}
