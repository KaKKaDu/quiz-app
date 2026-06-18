# Page Maintenance Skill

This document defines the mandatory standards for creating and maintaining pages in the `quiz_app`.

## 1. Metadata Separation

All pages **MUST** separate their metadata generation logic into a dedicated `metadata.ts` file located in the same directory as the `page.tsx`.

- **Standardization**: Use the `MetadataFactory` type from `@/types/common.types`.
- **OpenGraph**: Every metadata implementation **MUST** include `openGraph` properties to ensure high-quality link sharing.
- **Dynamic SEO**: Use dynamic titles and descriptions derived from the page's data.

### Implementation Pattern

1. **`metadata.ts`**: Contains the logic and the factory function.
2. **`page.tsx`**: Defines the `generateMetadata` wrapper that calls the factory.

### Example `metadata.ts`:

```typescript
import { MetadataFactory } from '@/types/common.types';
import { getCachedData } from '@/lib/metadata/metadata-fetchers';

export const getPageMetadata: MetadataFactory<string> = async (id) => {
  const data = await getCachedData(id);
  return {
    title: `${data.name} | QuizApp`,
    description: data.description,
    openGraph: {
      title: data.name,
      description: data.description,
      type: 'website',
    },
  };
};
```

### Example `page.tsx`:

```typescript
import { Metadata } from 'next';
import { getPageMetadata } from './metadata';

export const generateMetadata = async ({ params }): Promise<Metadata> => {
  const { id } = await params;
  return getPageMetadata(id);
};

export default async function Page() {
  // Page implementation
}
```

## 2. Data Deduplication

- **React `cache()`**: Always use the cached fetchers from `@/lib/metadata/metadata-fetchers.ts` in both `metadata.ts` and `page.tsx`.
- **Single Request Scope**: This ensures that data is fetched only once per request, even when shared between metadata and the page body.
- **No Cross-Reload Persistence**: The `cache()` utility is scoped to the request, ensuring fresh data on every manual reload.

## 3. Rendering Strategy

- **Server Components**: Pages **MUST** be Server Components by default.
- **Dynamic Configuration**: For pages with dynamic data, explicitly set:
  ```typescript
  export const dynamic = 'force-dynamic';
  export const revalidate = 0;
  ```
- **Plain Object Serialization**: When passing data from Server Components (Pages/Sections) to Client Components, always serialize complex objects using `JSON.parse(JSON.stringify(data))` to prevent hydration issues with non-serializable types (like MongoDB `ObjectId`).

## 4. Section Composition

- Pages should be minimalist and primarily act as data-fetching containers.
- The actual UI and complex logic **MUST** be encapsulated in a Section from `templates/sections/`.
