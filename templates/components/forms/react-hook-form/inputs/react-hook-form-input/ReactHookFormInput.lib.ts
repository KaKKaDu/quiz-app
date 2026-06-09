import { RHFInputSeparator } from '@/types/forms.types';

export function handleRHFInputSeparator(
  value: string,
  separate: RHFInputSeparator
): string {
  const {
    separator = ',',
    gap = 3,
    spaces = false,
    traverse = 'from-right',
  } = separate;

  let formattedValue = value.slice();

  if (!spaces) {
    formattedValue = formattedValue.replace(/\s/g, '');
  }

  formattedValue = formattedValue.split(separator).join('');

  if (!gap || gap <= 0) {
    return formattedValue;
  }

  if (traverse === 'from-right') {
    let result = '';
    let counter = 0;

    for (let i = formattedValue.length - 1; i >= 0; i--) {
      result = formattedValue[i] + result;
      counter++;

      if (counter === gap && i !== 0) {
        result = separator + result;
        counter = 0;
      }
    }

    formattedValue = result;
  } else if (traverse === 'from-left') {
    const regex = new RegExp(`(.{${gap}})(?=.)`, 'g');
    formattedValue = formattedValue.replace(regex, `$1${separator}`);
  }

  return formattedValue;
}
