import { Nullable } from '@/app/types/common.types';
import { MongoRepository } from './mongo.repository';
import { MongoService } from './mongo.service';

let mongoService: Nullable<MongoService> = null;

/**
 * Returns a singleton instance of the MongoService.
 */
export const getMongoService = (): MongoService => {
  if (!mongoService) {
    const repository: MongoRepository = new MongoRepository();
    mongoService = new MongoService(repository);
  }
  return mongoService;
};
