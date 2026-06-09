import type { DataObject, SuccessData } from './success-data';
import { AppError } from './app-error';

export const handleError = <Data extends DataObject = DataObject>(
  e: unknown
): SuccessData<false, Data> => {
  let statusCode: number = 0;
  let message: string = 'Unknown error';

  if (e instanceof Error) {
    message = `${e.message}`;
    const result: SuccessData<false, Data> = {
      success: false,
      errors: [
        new AppError({ message, status: 0, context: JSON.stringify(e) }),
      ],
    };
    return result;
  }

  if (e && typeof e === 'object') {
    const errorObj: Record<string, unknown> = e as Record<string, unknown>;

    if ('code' in errorObj) {
      statusCode = parseInt(errorObj.code as string);
    } else if ('status' in errorObj) {
      statusCode = parseInt(errorObj.status as string);
    } else if ('statusCode' in errorObj) {
      statusCode = parseInt(errorObj.statusCode as string);
    }

    if ('data' in errorObj) {
      message = JSON.stringify(errorObj.data);
    } else if ('description' in errorObj) {
      message = JSON.stringify(errorObj.description);
    } else {
      message = JSON.stringify(errorObj);
    }
  } else if (e && typeof e === 'string') {
    message = e;
  }

  const result: SuccessData<false, Data> = {
    success: false,
    errors: [
      new AppError({
        message,
        status: statusCode,
        context: JSON.stringify(e),
      }),
    ],
  };
  return result;
};
