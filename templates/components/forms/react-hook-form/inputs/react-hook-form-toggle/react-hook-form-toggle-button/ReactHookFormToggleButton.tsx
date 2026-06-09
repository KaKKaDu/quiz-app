import { useEffect, useState } from 'react';
import { RHFOption } from '@/types/forms.types';
import { cn } from '@/lib/utils';

type ReactHookFormToggleButtonProps = {
  value: string;
  option: RHFOption;
  click: (value: string) => void;
};

const ReactHookFormToggleButton = ({
  option,
  value,
  click,
}: ReactHookFormToggleButtonProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentValue(value);
  }, [value]);

  return (
    <button
      type={'button'}
      onClick={() => click(option.value)}
      className={cn(
        'px-[1rem] h-[3.125rem]',
        'tern-text-16',
        'border rounded-[0.5rem]',
        'cursor-pointer',
        option.value === currentValue
          ? 'border-tern-primary text-tern-primary font-medium bg-toggle-back'
          : 'border-tern-mid-gray font-normal text-tern-dark-gray bg-transparent'
      )}
    >
      {option.label}
    </button>
  );
};

export default ReactHookFormToggleButton;
