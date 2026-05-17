// Fails the build if any *published* writing post lacks a main tag (tech or life).
// Drafts are allowed to be partial since they don't ship; the Claude hook catches
// them in real-time during editing.

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const WRITING_DIR = 'src/content/writing';
const MAIN_TAGS = ['tech', 'life'];

const files = (await readdir(WRITING_DIR)).filter((f) => f.endsWith('.md'));
const offenders = [];

for (const file of files) {
  const content = await readFile(join(WRITING_DIR, file), 'utf-8');
  const fm = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) continue;

  const frontmatter = fm[1];

  // Skip drafts
  if (/^draft:\s*true\s*$/m.test(frontmatter)) continue;

  const tagsMatch = frontmatter.match(/^tags:\s*\[([^\]]*)\]/m);
  if (!tagsMatch) {
    offenders.push(`${file} (no tags)`);
    continue;
  }

  const tags = tagsMatch[1]
    .split(',')
    .map((t) => t.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);

  if (!MAIN_TAGS.some((m) => tags.includes(m))) {
    offenders.push(`${file} (has: ${tags.join(', ') || 'none'})`);
  }
}

if (offenders.length > 0) {
  console.error('\nWriting posts missing a main tag (tech or life):');
  for (const o of offenders) console.error(`  - ${o}`);
  console.error('\nEvery published post needs at least one of: tech, life.');
  console.error('This ensures the post lands in one of the topic RSS feeds.\n');
  process.exit(1);
}

console.log(`✓ ${files.length} writing posts checked, all have a main tag.`);
