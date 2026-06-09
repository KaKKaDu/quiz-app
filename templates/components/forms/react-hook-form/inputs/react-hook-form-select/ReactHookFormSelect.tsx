import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import ReactHookFormInputLabel from '../../react-hook-form-input-label/ReactHookFormInputLabel';
import ReactHookFormInputErrors from '../../react-hook-form-input-errors/ReactHookFormInputErrors';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/templates/components/ui/select';
import { RHFData, RHFOption } from '@/types/forms.types';

type ReactHookFormSelectProps<SchemaValues extends FieldValues> = {
  control: Control<SchemaValues>;
  errors: FieldErrors<SchemaValues>;
} & RHFData<SchemaValues, 'select'>;

/**
 * Standard React Hook Form Select component.
 * Integrates with shadcn Select and adheres to project styling standards.
 */
const ReactHookFormSelect = <SchemaValues extends FieldValues>({
  control,
  errors,
  field: fieldName,
  label,
  placeholder,
  options,
  optional = false,
  shortenOptional = false,
}: ReactHookFormSelectProps<SchemaValues>) => {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <ReactHookFormInputLabel
          optional={optional}
          shortenOptional={shortenOptional}
          field={fieldName}
          label={label}
        />
      )}
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => (
          <Select {...field} onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue
                placeholder={`${placeholder || label || 'Not selected'}`}
              />
            </SelectTrigger>
            <SelectContent>
              {options.length > 0 ? (
                options.map((option: RHFOption) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              ) : (
                <div className="flex w-full justify-center px-2 py-2">
                  <p className="text-sm text-muted-foreground">
                    Unfortunately, no options are found.
                  </p>
                </div>
              )}
            </SelectContent>
          </Select>
        )}
      />
      <ReactHookFormInputErrors error={errors[fieldName]} />
    </div>
  );
};

export default ReactHookFormSelect;
