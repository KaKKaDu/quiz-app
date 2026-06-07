# Typing Architecture Standards

This document defines the strict typing standards for the `quiz_app` project. All developers and AI agents must adhere to these rules when creating or modifying types.

## Core Mandates

1.  **Strict Typisation**:
    - **No `any`**: The use of `any` is strictly prohibited.
    - **No `unknown`**: Avoid `unknown` unless it is functionally required for type narrowing or external data validation.
    - **No `object`**: Never use the generic `object` type. Define precise structures or use specific utility types (e.g., `Record<string, T>`).
    - **Explicit Types**: All types that can be explicitly written **MUST** be written. Do not rely on inference for variables, constants, or function return types, even if they seem obvious.
    - **Nullable Utility**: Use `Nullable<T>` (from `@/app/types/common.types`) for any variable or property that can be `null` or `undefined`. This makes the optionality of the value explicit and searchable.

2.  **Type over Interface**:
    - Use `type` aliases for all definitions (objects, unions, intersections).
    - Use `interface` **only** when absolutely necessary, such as when extending existing classes or utilizing declaration merging (rare in this project).

3.  **Centralized Organization**:
    - All shared types must reside in `app/types/`.
    - Types should be separated semantically into modular files or sub-folders.
    - Local types (used only within a single file/component) are permissible but should be moved to `app/types/` if reused.

4.  **Modular & Semantic**:
    - Type files must be small and focused.
    - Files should contain only types semantically related to their filename (e.g., `user.ts` for User-related types, `quiz.ts` for Quiz structures).

## File Structure Example

- `app/types/quiz.ts`: Types for quiz data structures.
- `app/types/api.ts`: Types for API requests and responses.
- `app/types/common.ts`: Generic utility types.
