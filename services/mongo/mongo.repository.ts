import mongoose, { Mongoose } from 'mongoose';
import { SuccessDataAny, handleError } from '@/lib/errors';
import { Logger } from '@/lib/logger';
import { Nullable } from '@/types/common.types';

export class MongoRepository {
  private connection: Nullable<Mongoose> = null;

  async getConnection(): Promise<SuccessDataAny<Mongoose>> {
    try {
      if (this.connection && mongoose.connection.readyState === 1) {
        return { success: true, data: this.connection };
      }

      const mongoUri: Nullable<string> = process.env.MONGODB_URI;
      if (!mongoUri) {
        throw new Error('MONGODB_URI is not defined in environment variables');
      }

      const dbName: string = process.env.MONGODB_DB_NAME || 'quiz_app';

      this.connection = await mongoose.connect(mongoUri, {
        dbName,
      });
      const result: SuccessDataAny<Mongoose> = {
        success: true,
        data: this.connection,
      };
      Logger.report('MongoRepository.getConnection', result);
      return result;
    } catch (error: unknown) {
      const failedResult: SuccessDataAny<Mongoose> =
        handleError<Mongoose>(error);
      Logger.report('MongoRepository.getConnection', failedResult);
      return failedResult;
    }
  }
}
