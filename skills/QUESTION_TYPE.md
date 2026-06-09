# New Question Type Implementation Guide

This document defines the mandatory steps and standards for adding a new question type to the `quiz_app`.

## 1. Domain Definition (Schema)

Every new question type must be added to the `QuizQuestionZodSchema` discriminated union in `schemas/zod/quiz-question.zod.ts`.

- **Type**: A unique literal string (e.g., `z.literal('matching')`).
- **Body**: A Zod object containing the `correctAnswer` and any necessary structural data (like `options`).

## 2. Creation Form

Create a new form instance in `templates/components/forms/instances/<type>/`.

- **Config**: Define `RHFData` in `<type>-form.config.ts`.
- **Component**: Implement the form in `<type>-form.tsx`.
- **Validation**: Ensure it returns a complete `QuizQuestion` object via `onSubmit`.
- **Register**: Add the new form to the switch statement in `templates/components/quiz/question-creator.tsx`.

## 3. Data Preview

Update `templates/components/quiz/quiz-question-preview.tsx`.

- **Icon**: Choose an appropriate Phosphor Icon (with `Icon` suffix).
- **Body**: Implement the rendering logic for the new type's body data in the `renderBody` switch.

## 4. Interactive View

Create a new view component in `templates/components/quiz/view/<type>-view.tsx`.

### Mandates:

- **State**: Manage internal user input.
- **Validation**: Implement logic to calculate `correctness` (0-1).
- **Mistakes**: Generate `QuizMistake[]` if `correctness < 1`.
- **Report Mode**: Implement visual feedback (Green for correct, Red for wrong selections) when the `report` prop is true.
- **Register**: Add the view to `templates/components/quiz/view/quiz-question-view.tsx`.

### Validation Signature:

```typescript
type <Type>ViewProps = {
  question: Extract<QuizQuestion, { type: '<type>' }>;
  onValidate?: ValidationHandler;
  validateTrigger?: boolean;
  report?: boolean;
};
```

## 5. Directory Mapping Summary

| File                                                  | Purpose                         |
| :---------------------------------------------------- | :------------------------------ |
| `schemas/zod/quiz-question.zod.ts`                    | Type definition and validation. |
| `templates/components/forms/instances/`               | User interface for creation.    |
| `templates/components/quiz/quiz-question-preview.tsx` | Static read-only preview.       |
| `templates/components/quiz/view/`                     | Dynamic interactive user view.  |
