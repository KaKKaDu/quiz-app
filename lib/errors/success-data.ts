import type { AppError } from './app-error';

export type DataObject = string | object | null | undefined;

export type SuccessData<
  T extends boolean,
  Data extends DataObject = DataObject,
> = {
  success: T;
  data?: Data;
} & (T extends false ? { errors: AppError[] } : object);

export type SuccessDataAny<Data extends DataObject = DataObject> =
  | SuccessData<true, Data>
  | SuccessData<false, Data>;
