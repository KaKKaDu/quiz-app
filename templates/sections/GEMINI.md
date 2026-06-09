# Section Architecture Standards

Sections are the high-level building blocks of the application that compose multiple components into logical segments.
**Must adhere to [UI & Visual Standards](../GEMINI.md).**

## Standards & Conventions

- **Definition**: Sections represent a logical block of the application (e.g., `HeroSection`, `QuizListSection`).
- **Data Management**: Sections are responsible for all **data fetching** and **update logic** (mutations). They act as the "smart" containers for components.
- **Composition**: Sections should be composed of one or more components from the `templates/components/` directory.
- **Type Safety**: All props for a section **MUST** be declared as a TypeScript `type` at the top of the file.
- **Rendering Strategy**:
  - Prefer **Server Components** for sections to handle data fetching on the server.
  - Transition to **Client Components** only when the specific section flow benefits from it or requires client-side state management that cannot be lifted.
- **Location**: Sections should be stored in the `templates/sections/` directory. To ensure readability and organization, sections related to a specific page **MUST** be placed inside an appropriate sub-folder named after that page (e.g., `templates/sections/home/`, `templates/sections/create-quiz/`). Only truly global or shared sections should remain in the root of the `sections/` directory.
