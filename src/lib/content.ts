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

/**
 * Tags too broad to signal real relatedness. `tech`/`life` are RSS routing
 * tags every post must carry; `reflection` spans most posts. Excluding them
 * means relatedness is driven by topical tags only (food, health, craft, ...),
 * and any future topical tag counts automatically. Edit this set, not a
 * whitelist, as the tag vocabulary grows.
 */
const BROAD_TAGS = new Set(['tech', 'life', 'reflection']);

/**
 * Related posts for internal linking (discovery + indexing). A post's explicit
 * `related:` slugs win when set. Otherwise, auto-match on shared *topical* tags
 * (broad tags excluded) and show nothing when there's no genuine overlap rather
 * than a weak guess. Pass the already-filtered published list so drafts never
 * surface in production.
 */
export function getRelatedPosts(
  current: CollectionEntry<'writing'>,
  all: CollectionEntry<'writing'>[],
  limit = 3,
): CollectionEntry<'writing'>[] {
  const others = all.filter((post) => post.id !== current.id);

  const manual = current.data.related;
  if (manual?.length) {
    const byId = new Map(others.map((post) => [post.id, post]));
    return manual
      .map((id) => byId.get(id))
      .filter((post): post is CollectionEntry<'writing'> => Boolean(post))
      .slice(0, limit);
  }

  const topical = (tags: string[]) => tags.filter((tag) => !BROAD_TAGS.has(tag));
  const currentTopical = new Set(topical(current.data.tags));
  if (currentTopical.size === 0) return [];

  return others
    .map((post) => ({
      post,
      shared: topical(post.data.tags).filter((tag) => currentTopical.has(tag))
        .length,
    }))
    .filter((entry) => entry.shared > 0)
    .sort(
      (a, b) =>
        b.shared - a.shared ||
        b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf(),
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}
