import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getPublishedWriting } from '../lib/content';
import type { APIContext } from 'astro';

// The one sentence here that no page says. Stefan's wording: edit it in place.
const DIRECTION = "I'm a software engineer, growing into agent architecture.";

// llms.txt (llmstxt.org): an H1, a blockquote summary, then H2 lists of
// `- [name](url): notes`. "Optional" holds what an agent can skip. Built from
// the content collection so a published post is listed without a second edit.
export async function GET(context: APIContext) {
  const url = (path: string) => new URL(path, context.site!).href;
  const day = (date: Date) => date.toISOString().slice(0, 10);

  const posts = (await getPublishedWriting())
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const writing = posts.map(
    (post) =>
      `- [${post.data.title}](${url(`/writing/${post.id}/`)}): ${post.data.description} ` +
      `Published ${day(post.data.pubDate)}. Tags: ${post.data.tags.join(', ')}.`,
  );

  const body = `# ${SITE_TITLE}

> ${SITE_DESCRIPTION}

${DIRECTION}

## Writing

${writing.join('\n')}

## About

- [About](${url('/about')}): who I am and how to reach me.
- [GitHub](https://github.com/stefanahman)
- [LinkedIn](https://www.linkedin.com/in/stefanahman/)

## Feeds

- [RSS](${url('/rss.xml')}): every post.
- [Tech feed](${url('/feed/tech.xml')}): posts tagged tech.
- [Life feed](${url('/feed/life.xml')}): posts tagged life.

## Optional

- [All writing](${url('/writing')}): the same posts as a page.
- [Tags](${url('/writing/tags/')}): topics across the writing.
- [Sitemap](${url('/sitemap-index.xml')})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
