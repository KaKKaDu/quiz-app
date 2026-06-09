import { FieldValues, Path } from 'react-hook-form';
import { ReactElement } from 'react';

export type RHFInputTypeAttribute = ['text', 'number', 'time', 'date'][number];
export type RHFInputModeAttribute = [
  'tel',
  'email',
  'search',
  'numeric',
][number];

export type RHFInputSeparator = Partial<{
  separator: string;
  gap: number;
  spaces: boolean;
  traverse: 'from-left' | 'from-right';
}>;

export type RHFInputType = ['input', 'textarea', 'select', 'toggle'][number];
export type RHFOption<Literal extends string = string> = {
  label: string;
  value: Literal;
};
export type RHFInputSpecificFields<Type extends RHFInputType> =
  Type extends 'input'
    ? {
        maxLength?: number;
        inputType?: RHFInputTypeAttribute;
        inputMode?: RHFInputModeAttribute;
        icon?: ReactElement;
        separate?: RHFInputSeparator;
      }
    : Type extends 'textarea'
      ? { height?: number }
      : Type extends 'select'
        ? { options: RHFOption[] }
        : Type extends 'toggle'
          ? { options: RHFOption[]; onChange?: (value: string) => void }
          : object;

export type RHFData<
  SchemaValues extends FieldValues,
  Type extends RHFInputType,
> = {
  type: Type;
  field: Path<SchemaValues>;
  label?: string;
  placeholder?: string;
  small?: boolean;
  optional?: boolean;
  shortenOptional?: boolean;
} & RHFInputSpecificFields<Type>;

export type RHFDataAny<SchemaValues extends FieldValues> =
  | RHFData<SchemaValues, 'input'>
  | RHFData<SchemaValues, 'textarea'>
  | RHFData<SchemaValues, 'select'>
  | RHFData<SchemaValues, 'toggle'>;
