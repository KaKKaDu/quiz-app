# Server Action Architecture Standards

This document defines the standards for Server Actions in the `quiz_app`. Server Actions serve as the bridge between the client-side UI and the server-side business logic (Services).

## Core Principles

1.  **Strictly Server-Side**: Every file in this directory **MUST** start with the `'use server'` directive.
2.  **Event-Driven**: Every server action represents one database interaction event. While one event can involve multiple creations or updates, it should be treated as a single logical transaction from the client's perspective.
3.  **Service Orchestration**: Actions **MUST NOT** interact with the database directly. They should call methods from the appropriate **Services**.
4.  **Standardized Response**: Every action **MUST** return a `SuccessData` object (or `SuccessDataAny`) to ensure the client can handle successes and errors consistently.
5.  **Logging**: All action results must be reported using the `Logger` class.

## Folder Structure

Actions should be organized semantically into sub-folders based on the domain they handle:

```
actions/
├── quiz/
│   └── create-quiz.action.ts
├── question/
└── result/
```

## Implementation Workflow

### Example Action Template

```typescript
'use server';

import { getQuizService } from '@/services/quiz';
import { SuccessDataAny, handleError } from '@/lib/errors';
import { Logger } from '@/lib/logger';
import { Quiz } from '@/schemas/zod/quiz.zod';

export const createQuizAction = async (
  quiz: Quiz
): Promise<SuccessDataAny<Quiz>> => {
  const context = 'createQuizAction';
  try {
    const service = getQuizService();
    const result = await service.createQuiz(quiz);

    Logger.report(context, result);
    return result;
  } catch (error) {
    const failedResult = handleError<Quiz>(error);
    Logger.report(context, failedResult);
    return failedResult;
  }
};
```

## Mandates

- **Naming**: Files should use the `.action.ts` suffix.
- **Error Handling**: Use the `handleError` utility from `@/lib/errors` to catch and format any unexpected server-side errors.
- **Payload Validation**: While Zod validation happens at the form level, actions should ideally re-validate or at least assume the types exported from Zod schemas.
