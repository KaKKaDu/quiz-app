import { Nullable } from '@/types/common.types';

export type FormDisplayError = {
  name: string;
  statusCode?: number;
  message: string;
};

type FormErrorsProps = {
  errors?: Nullable<FormDisplayError[]>;
};

/**
 * Global/Form-level error display component.
 * Adheres to monochrome styling with red accent highlights.
 */
const FormErrors = ({ errors }: FormErrorsProps) => {
  if (!errors || errors.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 rounded-none border border-destructive/20 bg-destructive/5 p-3">
      {errors.map((error: FormDisplayError, index: number) => (
        <div key={`${index}-error`} className="flex flex-col gap-0.5">
          <span className="text-xs font-bold uppercase tracking-wider text-destructive">
            {error.name} {error.statusCode ? `(${error.statusCode})` : ''}
          </span>
          <span className="text-sm text-destructive">{error.message}</span>
        </div>
      ))}
    </div>
  );
};

export default FormErrors;
