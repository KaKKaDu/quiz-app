# Component Architecture Standards

Components in this project are modular units of UI that focus on presentation and local interactivity.
**Must adhere to [UI & Visual Standards](../GEMINI.md).**

## Standards & Conventions

- **Definition**: Components must accept props and return UI. They can contain internal state or simple business logic.
- **Data Isolation**: Components **CAN NOT** contain any fetch requests or direct database interactions. All data must be passed via props.
- **Type Safety**: All props for a component **MUST** be declared as a TypeScript `type` at the top of the file.
- **Rendering Strategy**:
  - Favor **Server Components** by default for better performance and SEO.
  - Use **Client Components** (`'use client'`) only when necessary for interactivity (state, effects, event listeners).
  - **Interactivity Optimization**:
    - **Avoid `useEffect`**: Do NOT use `useEffect` until it is explicitly needed for synchronization with external systems.
    - **Event-Driven**: Prefer wrapping logic into `useCallback` and triggering it from specific events (e.g., `onClick`, `onSubmit`, or parent-to-child callbacks).
    - **Dependency Discipline**: If `useEffect` must be used, include only the absolute minimum dependencies that truly matter for the effect's logic. Avoid exhaustive dependency lists if they lead to unnecessary re-renders or loops.
  - If a component requires interactivity, consider moving the interactive parts into a separate client component to keep the parent as a server component.
- **Location**: Store reusable UI primitives in `templates/components/ui/` and feature-specific components in `templates/components/<feature>/`.
- **UI Consistency**:
  - **Button Heights**: Small buttons MUST have a height of **36px (2.25rem)**. Big/Default buttons MUST have a height of **42px (2.625rem)**. This rule applies project-wide to maintain a consistent visual rhythm.
