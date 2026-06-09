# Schema Architecture Standards

This document defines the rules for data validation and database schemas in the `quiz_app`.

## Folder Structure

Schemas are organized into semantic sub-folders under `schemas/`:

- `zod/`: Contains Zod validation schemas for domain models and forms.
- `mongodb/`: Contains MongoDB/Mongoose schemas.

## Core Mandates

1.  **Centralization**: **ALL** schemas (domain models, API requests, or forms) must reside in the `schemas/` folder.
2.  **Naming Convention**:
    - Related schemas must share the same prefix.
    - Zod schemas: `{name}.zod.ts`
    - MongoDB schemas: `{name}.mongo.ts`

3.  **Schema Dependency**:
    - **Every** MongoDB schema **MUST** have a corresponding Zod schema.
    - Validation should happen primarily through Zod before reaching the database layer.

4.  **Type Safety & Inference**:
    - **Every** Zod schema **MUST** have a corresponding TypeScript type representing the object.
    - Use `z.infer<typeof schema>` to derive types from Zod schemas. This ensures that your TypeScript types and validation logic are always in sync.
    - Do not define separate interfaces or types for the same object if they can be inferred from a Zod schema.

5.  **Semantic Separation**:
    - Keep schemas modular. A single file should represent a single logical entity or a group of closely related sub-entities.

## Example

### `schemas/zod/user.zod.ts`

```typescript
import { z } from 'zod';

export const UserZodSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().min(3),
});

export type User = z.infer<typeof UserZodSchema>;
```

### `schemas/mongodb/user.mongo.ts`

```typescript
import { Schema, model } from 'mongoose';
import { User } from '../zod/user.zod';

const UserMongoSchema = new Schema<User>({
  email: { type: String, required: true },
  username: { type: String, required: true },
});

export const UserModel = model<User>('User', UserMongoSchema);
```
