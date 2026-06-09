import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import ReactHookFormInputLabel from '../../react-hook-form-input-label/ReactHookFormInputLabel';
import ReactHookFormInputErrors from '../../react-hook-form-input-errors/ReactHookFormInputErrors';
import { RHFData } from '@/types/forms.types';
import { Textarea } from '@/templates/components/ui/textarea';

type ReactHookFormTextareaProps<SchemaValues extends FieldValues> = {
  register: UseFormRegister<SchemaValues>;
  errors: FieldErrors<SchemaValues>;
} & RHFData<SchemaValues, 'textarea'>;

/**
 * Standard React Hook Form Textarea component.
 * Integrates with shadcn Textarea and adheres to project styling standards.
 */
const ReactHookFormTextarea = <SchemaValues extends FieldValues>({
  register,
  errors,
  field,
  label,
  placeholder,
  optional = false,
  shortenOptional = false,
  height,
}: ReactHookFormTextareaProps<SchemaValues>) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <ReactHookFormInputLabel
          optional={optional}
          shortenOptional={shortenOptional}
          field={field}
          label={label}
        />
      )}
      <Textarea
        aria-invalid={errors[field] ? 'true' : 'false'}
        id={`${field}_input`}
        style={{ height: height ? `${height}px` : undefined }}
        className="min-h-[120px]"
        {...register(field)}
        placeholder={placeholder || ''}
      />
      <ReactHookFormInputErrors error={errors[field]} />
    </div>
  );
};

export default ReactHookFormTextarea;
