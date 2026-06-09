'use client';

import ReactHookFormInputLabel from '../../react-hook-form-input-label/ReactHookFormInputLabel';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import ReactHookFormToggleButton from './react-hook-form-toggle-button/ReactHookFormToggleButton';
import ReactHookFormInputErrors from '../../react-hook-form-input-errors/ReactHookFormInputErrors';
import { cn } from '@/lib/utils';
import { RHFData, RHFOption } from '@/types/forms.types';

type ReactHookFormToggleProps<SchemaValues extends FieldValues> = {
  control: Control<SchemaValues>;
  errors: FieldErrors<SchemaValues>;
} & Omit<RHFData<SchemaValues, 'toggle'>, 'placeholder' | 'small'>;

const ReactHookFormToggle = <SchemaValues extends FieldValues>({
  label,
  field,
  options,
  control,
  onChange,
  errors,
  optional = false,
  shortenOptional = false,
}: ReactHookFormToggleProps<SchemaValues>) => {
  return (
    <Controller
      control={control}
      render={({ field: fieldRender }) => {
        const toggleClick = (newValue: string): void => {
          if (newValue !== fieldRender.value) {
            fieldRender.onChange(newValue);
            if (onChange) {
              onChange(newValue);
            }
          } else {
            if (optional) {
              fieldRender.onChange('');
              if (onChange) {
                onChange('');
              }
            }
          }
        };
        return (
          <div className={cn('flex flex-col', 'w-full gap-y-[0.75rem]')}>
            {label && (
              <ReactHookFormInputLabel
                optional={optional}
                shortenOptional={shortenOptional}
                field={field}
                label={label}
              />
            )}
            <div
              className={cn(
                'flex flex-row flex-wrap',
                'w-full gap-x-[1rem] gap-y-[1rem]'
              )}
            >
              {options.map((option: RHFOption) => (
                <ReactHookFormToggleButton
                  key={option.value}
                  option={option}
                  value={fieldRender.value}
                  click={toggleClick}
                />
              ))}
            </div>
            <ReactHookFormInputErrors error={errors[field]} />
          </div>
        );
      }}
      name={field}
    />
  );
};

export default ReactHookFormToggle;
