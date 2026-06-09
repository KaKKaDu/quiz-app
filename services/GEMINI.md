# Service & Repository Architecture

This document defines the architectural standards for Services and Repositories in the `quiz_app`.

## Core Structure

Each service must be contained within its own folder under `app/services/` with the following files:

1.  **Repository Class (`{name}.repository.ts`)**: Handles all data communication (fetches, DB operations).
2.  **Service Class (`{name}.service.ts`)**: Contains business logic. Accepts a Repository instance in its constructor.
3.  **Container (`index.ts`)**: Exports a `get{Name}Service` function that returns a singleton instance of the service.

## Mandates

### 1. Separation of Concerns

- **Repositories**:
  - Responsible for all external data interactions (fetching, DB queries).
  - **MUST** wrap operations in `try/catch` blocks.
  - **MUST** use `handleError` from `@/app/errors` to catch and format errors.
  - **MUST** return a `SuccessData` type.
- **Services**:
  - **MUST NOT** perform fetches directly.
  - **MUST** accept the repository via the constructor (Dependency Injection).
  - **MUST** return a `SuccessData` type.

### 2. Error Handling & Logging

- All operation results (success or failure) from repositories and services must be reported through the `Logger` class from `@/lib/logger`.
- Errors must be caught locally in repositories, handled via `handleError`, and then returned as a failed `SuccessData` object.

### 3. Return Types

- Every service and repository method should return `SuccessData<T, D>` (or `SuccessDataAny<D>`) to ensure consistent response handling across the application.

## Example File Structure

```
services/quiz/
├── quiz.repository.ts
├── quiz.service.ts
└── index.ts
```

## Example Repository Method

```typescript
async getById(id: string): Promise<SuccessDataAny<Quiz>> {
  try {
    const data = await db.quiz.findUnique({ where: { id } });
    const result = { success: true, data };
    Logger.report('QuizRepository.getById', result);
    return result;
  } catch (error) {
    const failedResult = handleError<Quiz>(error);
    Logger.report('QuizRepository.getById', failedResult);
    return failedResult;
  }
}
```
