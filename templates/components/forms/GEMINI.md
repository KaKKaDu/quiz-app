# Form Architecture Standards

This document defines the standards for building forms using React Hook Form (RHF) and Zod in the `quiz_app`.

## 1. Core Principles

- **Separation of Configuration**: All form input configurations must be defined in a separate `config.ts` file as an array of `RHFData`.
- **Input Handler**: Use the `ReactHookFormInputsHandler` to render form inputs based on the configuration array.
- **Strict Typing**: Use Zod schemas to define form values and infer types.
- **Schema Location**: **ALL** form schemas **MUST** be placed in the root `schemas/zod/` directory following the `{name}.zod.ts` naming convention.
- **Validation**: Always use `@hookform/resolvers/zod` for form validation.
- **Error Handling**:
  - Field-level errors are handled by `ReactHookFormInputErrors`.
  - Form-level/Global errors must be handled through the `FormErrors` component.

## 2. Directory Structure

Forms must be placed under meaningful folder names in the `templates/components/forms/instances/` directory:

```
templates/components/forms/instances/<feature>/
├── <feature>-form.tsx       # Main form component
└── <feature>-form.config.ts # RHFData configuration
```

Form schemas are located separately:

```
schemas/zod/
└── <feature>-form.zod.ts    # Zod schema and types
```

## 3. Implementation Workflow

### Step 1: Define the Schema in `schemas/zod/quiz-form.zod.ts`

```typescript
import { z } from 'zod';

export const QuizFormSchema = z.object({
  title: z.string().min(3, 'Title is too short'),
  description: z.string().optional(),
});

export type QuizFormValues = z.infer<typeof QuizFormSchema>;
```

### Step 2: Define the Configuration in `templates/components/forms/instances/quiz/quiz-form.config.ts`

```typescript
import { RHFDataAny } from '@/types/forms.types';
import { QuizFormValues } from '@/schemas/zod/quiz-form.zod';

export const quizFormConfig: RHFDataAny<QuizFormValues>[] = [
  {
    type: 'input',
    field: 'title',
    label: 'Quiz Title',
    placeholder: 'Enter quiz title',
  },
  // ...
];
```

### Step 3: Create the Form Component in `templates/components/forms/instances/quiz/quiz-form.tsx`

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ReactHookFormInputsHandler from '@/templates/components/forms/react-hook-form/react-hook-form-inputs-handler/ReactHookFormInputsHandler';
import { quizFormConfig } from './quiz-form.config';
import { QuizFormSchema, QuizFormValues } from '@/schemas/zod/quiz-form.zod';

export const QuizForm = () => {
  const { register, control, formState: { errors }, handleSubmit } = useForm<QuizFormValues>({
    resolver: zodResolver(QuizFormSchema),
  });

  const onSubmit = (data: QuizFormValues) => {
    // handle submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <ReactHookFormInputsHandler
        config={quizFormConfig}
        register={register}
        control={control}
        errors={errors}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

## 4. Styling Constraints

- Form elements must adhere to the **monochrome minimalistic style**.
- Use the **strict REM spacing system** for gaps and paddings (typically `gap-6` or `gap-8` between fields).
- Error text must use the defined **Red** accent color (`var(--destructive)` or `text-destructive`).
