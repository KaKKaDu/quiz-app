import { cn } from '@/lib/utils/cn';

type ReactHookFormInputLabelProps = {
  field: string;
  label: string;
  optional: boolean;
  shortenOptional?: boolean;
};

/**
 * Standard label component for form inputs.
 * Adheres to monochrome style and strict spacing.
 */
const ReactHookFormInputLabel = ({
  field,
  label,
  optional,
  shortenOptional = false,
}: ReactHookFormInputLabelProps) => {
  return (
    <div className="flex items-center gap-2">
      <label
        className="text-sm font-medium tracking-tight text-foreground"
        htmlFor={`${field}_input`}
      >
        {label}
      </label>
      {optional && (
        <span className="text-xs text-muted-foreground italic">
          <span className={cn(shortenOptional && 'max-sm:hidden')}>
            optional
          </span>
          <span className={cn('hidden', shortenOptional && 'max-sm:block')}>
            opt.
          </span>
        </span>
      )}
    </div>
  );
};

export default ReactHookFormInputLabel;
