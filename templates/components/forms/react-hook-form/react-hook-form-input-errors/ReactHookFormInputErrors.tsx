import { getFieldErrorMessages } from '../../../../../lib/forms';
import {
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from 'react-hook-form';
import { Nullable } from '@/types/common.types';

type ReactHookFormInputErrorProps<SchemaValues extends FieldValues> = {
  error?: Nullable<
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<DeepRequired<SchemaValues>[string]>>
  >;
};

/**
 * Field-level error display for form inputs.
 * Uses the destructive/red accent color for visibility.
 */
const ReactHookFormInputErrors = <SchemaValues extends FieldValues>({
  error,
}: ReactHookFormInputErrorProps<SchemaValues>) => {
  if (!error) return null;

  const messages = getFieldErrorMessages(error);

  return (
    <div className="flex flex-col gap-1">
      {messages.map((message: string, index: number) => (
        <span
          key={`${index}-${message}`}
          className="text-xs font-medium text-destructive"
        >
          {message}
        </span>
      ))}
    </div>
  );
};

export default ReactHookFormInputErrors;
