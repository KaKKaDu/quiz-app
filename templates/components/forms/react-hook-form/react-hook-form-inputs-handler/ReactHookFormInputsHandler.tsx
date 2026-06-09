import {
  Control,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { RHFDataAny } from '@/types/forms.types';
import ReactHookFormInput from '../inputs/react-hook-form-input/ReactHookFormInput';
import ReactHookFormSelect from '../inputs/react-hook-form-select/ReactHookFormSelect';
import ReactHookFormToggle from '../inputs/react-hook-form-toggle/ReactHookFormToggle';
import ReactHookFormTextarea from '../inputs/react-hook-form-textarea/ReactHookFormTextarea';

type ReactHookFormInputsHandlerProps<SchemaValues extends FieldValues> = {
  config: RHFDataAny<SchemaValues>[];
  register: UseFormRegister<SchemaValues>;
  control: Control<SchemaValues>;
  errors: FieldErrors<SchemaValues>;
};

/**
 * Handles the rendering of different React Hook Form inputs based on configuration.
 * Adheres to project styling and strict spacing (gap-6 between form fields).
 */
const ReactHookFormInputsHandler = <SchemaValues extends FieldValues>({
  config,
  register,
  control,
  errors,
}: ReactHookFormInputsHandlerProps<SchemaValues>) => {
  return (
    <div className="flex flex-col gap-6">
      {config.map((data: RHFDataAny<SchemaValues>) => {
        switch (data.type) {
          case 'input':
            return (
              <ReactHookFormInput
                key={data.field}
                {...data}
                register={register}
                control={control}
                errors={errors}
              />
            );
          case 'select':
            return (
              <ReactHookFormSelect
                key={data.field}
                {...data}
                control={control}
                errors={errors}
              />
            );
          case 'toggle':
            return (
              <ReactHookFormToggle
                key={data.field}
                {...data}
                control={control}
                errors={errors}
              />
            );
          case 'textarea':
            return (
              <ReactHookFormTextarea
                key={data.field}
                {...data}
                register={register}
                errors={errors}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default ReactHookFormInputsHandler;
