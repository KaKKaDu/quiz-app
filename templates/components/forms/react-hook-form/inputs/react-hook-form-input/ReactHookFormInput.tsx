import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import ReactHookFormInputLabel from '../../react-hook-form-input-label/ReactHookFormInputLabel';
import ReactHookFormInputErrors from '../../react-hook-form-input-errors/ReactHookFormInputErrors';
import { ChangeEvent, InputHTMLAttributes, ReactElement, useMemo } from 'react';
import { handleRHFInputSeparator } from './ReactHookFormInput.lib';
import { cn } from '@/lib/utils';
import { RHFData } from '@/types/forms.types';
import { Input } from '@/templates/components/ui/input';

type ReactHookFormInputProps<SchemaValues extends FieldValues> = {
  register: UseFormRegister<SchemaValues>;
  control: Control<SchemaValues>;
  errors: FieldErrors<SchemaValues>;
  icon?: ReactElement;
} & RHFData<SchemaValues, 'input'>;

/**
 * Standard React Hook Form Input component.
 * Integrates with shadcn Input and adheres to project styling standards.
 */
const ReactHookFormInput = <SchemaValues extends FieldValues>({
  register,
  control,
  errors,
  field,
  label,
  placeholder,
  optional = false,
  icon,
  maxLength,
  shortenOptional = false,
  inputType = 'text',
  inputMode,
  separate,
}: ReactHookFormInputProps<SchemaValues>) => {
  const configureData = useMemo((): InputHTMLAttributes<HTMLInputElement> => {
    return {
      inputMode: inputMode || 'text',
      maxLength: maxLength || undefined,
      'aria-invalid': errors[field] ? 'true' : 'false',
      type: inputType,
      id: `${field}_input`,
      className: cn(
        icon && 'pl-10',
        inputType === 'time' && 'w-full min-w-[7rem]'
      ),
      placeholder: placeholder || '',
    };
  }, [inputMode, maxLength, inputType, icon, field, errors, placeholder]);

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
      <div className="relative flex w-full items-center">
        {separate ? (
          <Controller
            name={field}
            control={control}
            render={({ field: render }) => {
              const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
                const value: string = e.target.value;
                const formattedValue: string = handleRHFInputSeparator(
                  value,
                  separate
                );

                render.onChange(formattedValue);
              };

              return (
                <Input {...render} {...configureData} onChange={handleChange} />
              );
            }}
          />
        ) : (
          <Input {...register(field)} {...configureData} />
        )}

        {icon && (
          <div className="absolute left-3 flex text-muted-foreground">
            {icon}
          </div>
        )}
      </div>
      <ReactHookFormInputErrors error={errors[field]} />
    </div>
  );
};

export default ReactHookFormInput;
