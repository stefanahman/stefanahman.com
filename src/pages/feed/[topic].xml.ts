import rss from '@astrojs/rss';
import { SITE_TITLE } from '../../consts';
import { getPublishedWriting } from '../../lib/content';
import type { APIContext } from 'astro';

const MAIN_TOPICS = ['tech', 'life'] as const;
type Topic = (typeof MAIN_TOPICS)[number];

export async function getStaticPaths() {
  return MAIN_TOPICS.map((topic) => ({ params: { topic } }));
}

export async function GET(context: APIContext) {
  const topic = context.params.topic as Topic;
  const posts = (await getPublishedWriting())
    .filter((post) => post.data.tags.includes(topic))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: `${SITE_TITLE} — ${topic}`,
    description: `Posts tagged ${topic}.`,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/writing/${post.id}/`,
    })),
  });
}
