import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from 'react-hook-form';

export const removeMultipleSpaces = (str: string): string => {
  return str.trim().replace(/\s+/g, ' ');
};

export const formatFieldValues = <Values extends FieldValues>(
  data: Values
): Values => {
  const copy: FieldValues = { ...data };
  Object.entries(data).forEach(([key, value]: [string, unknown]): void => {
    if (typeof value === 'string') {
      copy[key] = removeMultipleSpaces(value);
    }
  });
  return copy as Values;
};

export const getFieldErrorMessages = <SchemaValues extends FieldValues>(
  error?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<DeepRequired<SchemaValues>[string]>>
): string[] => {
  if (!error) return [];

  if ('types' in error && error.types) {
    return Object.values(error.types).flat() as string[];
  }

  if ('message' in error && error.message) {
    return [error.message as string];
  }

  return [];
};
