import { Metadata } from 'next';

export type Nullable<T> = T | null | undefined;

/**
 * Standardized type for metadata generation functions.
 * Ensures all metadata factories are asynchronous and return Next.js Metadata.
 */
export type MetadataFactory<T = unknown> = (params: T) => Promise<Metadata>;
