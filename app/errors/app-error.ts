import type { DataObject } from './success-data';
import { Nullable } from '@/app/types/common.types';

export type AppErrorConfig = {
  message: string;
  status?: number;
  context?: DataObject;
  error?: Error;
};

export class AppError extends Error {
  status: Nullable<number>;
  context: Nullable<DataObject>;
  error: Nullable<Error>;

  get isServer(): boolean {
    const status: Nullable<number> = this.status;
    return !!(status && status > 500 && status < 600);
  }

  get isClient(): boolean {
    const status: Nullable<number> = this.status;
    return !!(status && status >= 400 && status < 500);
  }

  constructor({ status, message, context, error }: AppErrorConfig) {
    super(message);
    this.status = status;
    this.context = context;
    this.error = error;
  }
}
