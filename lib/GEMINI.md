# Lib Architecture Standards

This document defines the standards for utilities, classes, and shared logic within the `lib/` directory.

## Core Mandates

1.  **High Reusability**: Any logic placed in `lib/` **MUST** be designed for generic use. It should solve a common problem in a way that is not tied to a specific domain or feature (unless it's a domain-specific core utility).
2.  **Modularity**: Logic must be self-contained. It should not depend on higher-level layers like Services, Actions, or Sections. It can depend on other `lib/` items or `types/`.
3.  **Independence**: Even if a utility is currently used only once, it should be implemented as if it were a standalone package. This ensures that if the same logic is needed elsewhere, it can be imported without refactoring.
4.  **Semantic Organization**:
    - `lib/utils/`: Small, focused helper functions (e.g., date formatting, color math).
    - `lib/errors/`: Standardized error handling logic.
    - `lib/logger.ts`: Centralized reporting and debugging.

## Implementation Workflow

- Use pure functions whenever possible to ensure predictability.
- Provide clear TypeScript signatures for all inputs and outputs.
- Avoid side effects unless the purpose of the utility is specifically to handle them (e.g., a logging utility).

## Example: Utility Standards

```typescript
/**
 * Good: Independent, pure, reusable.
 */
export const formatCurrency = (
  amount: number,
  locale: string = 'en-US'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Bad: Dependent on external state or specific feature schemas.
 */
export const getParticipantScoreLabel = (score: number) => {
  // Logic tied to a specific feature's business rules belongs in a Service, not Lib.
};
```
