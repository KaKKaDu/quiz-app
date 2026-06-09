# UI & Visual Standards

This document defines the visual and structural standards for all UI elements in the `templates/` folder.

## 1. Visual Style & Color System

- **Minimalism**: Design should be clean and minimalistic, primarily using **shadcn/ui** primitives.
- **Color Palette**: Use a monochrome base (Black, White, Gray).
  - **Primary**: Black/White for main text and backgrounds.
  - **Neutral**: Grays for borders, secondary text, and subtle backgrounds.
  - **Accents**:
    - **Green**: Only for successes, correct answers, or positive actions.
    - **Red**: Only for errors, mistakes, or destructive actions.
- **Type Safety**: All props for a component or section **MUST** be declared as a TypeScript `type` at the top of the file. Do **NOT** create mock or empty prop types if the component does not explicitly need them.
- **Navigation Isolation**: Separate all navigation segments (e.g., `Link` groups, primary call-to-action buttons) into dedicated sub-components.

## 2. Icons

- **Library**: Use **Phosphor Icons** (`@phosphor-icons/react`) exclusively for all icons in the project.
- **Naming**: Always use the version of icons with the **`Icon` suffix** (e.g., `CheckIcon`, `TrashIcon`, `PlusIcon`). Do **NOT** use the deprecated unsuffixed names.
- **Consistency**: Maintain consistent weight (e.g., `regular`, `bold`, `fill`) across related UI elements.

## 3. Layout & Structure

- **Flexbox First**: Use Flexbox for almost all layouts.
- **Grid**: Use CSS Grid **ONLY** for explicit table-like or strict grid structures.
- **Consistency**: Maintain a clear hierarchy using persistent spacing.
- **Responsiveness**:
  - **Minimum Support**: Design must remain functional and visually clean down to **20rem (320px)**.
  - **Breakpoints**: Use **40rem (640px)** as the primary mobile breakpoint (`sm:` in Tailwind by default, but be mindful of the rem conversion).
  - **Fluidity**: Prefer fluid layouts (percentages, `flex-1`) over fixed widths to ensure a smooth experience across devices.

## 4. Spacing System (Paddings & Gaps)

Stick strictly to the following REM-based system for `padding`, `margin`, and `gap`. Exceptions are highly discouraged.

| Step | REM     | Tailwind Class (Typical) | Usage                                        |
| :--- | :------ | :----------------------- | :------------------------------------------- |
| XS   | 0.25rem | `p-1`, `gap-1`           | Tight groupings, small labels                |
| S    | 0.5rem  | `p-2`, `gap-2`           | Content within cards, small gaps             |
| M    | 0.75rem | `p-3`, `gap-3`           | Moderate spacing                             |
| L    | 1rem    | `p-4`, `gap-4`           | Main container padding                       |
| XL   | 2rem    | `p-8`, `gap-8`           | Large page elements (e.g., between sections) |

## 4. shadcn/ui Integration

- Add shadcn components as needed using `npx shadcn@latest add <component>`.
- Components will be automatically placed in `templates/components/ui/` per `components.json` configuration.
