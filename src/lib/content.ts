import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Drafts are visible during `pnpm dev` and hidden in production builds.
 * Set `draft: true` in a post's frontmatter to keep it out of the live site
 * while iterating locally.
 */
export async function getPublishedWriting(): Promise<CollectionEntry<'writing'>[]> {
  return getCollection('writing', ({ data }) =>
    import.meta.env.DEV || !data.draft
  );
}
