import { MongoRepository } from './mongo.repository';
import { MongoService } from './mongo.service';

/**
 * Caching the MongoService on globalThis to prevent multiple instances
 * during Next.js hot reloads in development.
 */
const globalWithMongo = globalThis as unknown as {
  mongoService: MongoService | undefined;
};

/**
 * Returns a singleton instance of the MongoService.
 */
export const getMongoService = (): MongoService => {
  if (!globalWithMongo.mongoService) {
    const repository: MongoRepository = new MongoRepository();
    globalWithMongo.mongoService = new MongoService(repository);
  }
  return globalWithMongo.mongoService;
};
