// Fails the build if any *published* writing post violates the mechanically
// checkable voice rules: em-dashes (rule 3) and the banned phrases listed in
// scripts/banned-phrases.txt (rule 5 in .claude/rules/writing-style.md points
// here). One entry per line: /.../i lines are regexes, others case-insensitive
// literals, # lines are comments. Vetoed words in voice-corrections.md are
// judgment-level and deliberately not enforced here.

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const WRITING_DIR = 'src/content/writing';
const PHRASES_FILE = 'scripts/banned-phrases.txt';

const phrases = await readFile(PHRASES_FILE, 'utf-8');

const checks = [[/—/, 'rule 3: em-dash']];
for (const raw of phrases.split('\n')) {
  const line = raw.trim();
  if (!line || line.startsWith('#')) continue;
  const asRegex = line.match(/^\/(.+)\/(\w*)$/);
  if (asRegex) {
    checks.push([new RegExp(asRegex[1], asRegex[2]), `rule 5: ${line}`]);
  } else {
    checks.push([
      new RegExp(line.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
      `rule 5: "${line}"`,
    ]);
  }
}

const files = (await readdir(WRITING_DIR)).filter(
  (f) => f.endsWith('.md') || f.endsWith('.mdx'),
);
const offenders = [];

for (const file of files) {
  const content = await readFile(join(WRITING_DIR, file), 'utf-8');
  const fm = content.match(/^---\n([\s\S]*?)\n---/);

  // Drafts don't ship; the review loop catches them before publish.
  if (fm && /^draft:\s*true\s*$/m.test(fm[1])) continue;

  const body = fm ? content.slice(fm[0].length) : content;
  const lines = body.split('\n');

  lines.forEach((line, i) => {
    for (const [re, label] of checks) {
      if (re.test(line)) {
        offenders.push(`${file}:${i + 1} — ${label}\n    ${line.trim()}`);
      }
    }
  });
}

if (offenders.length > 0) {
  console.error('\nVoice rule violations in published posts:');
  for (const o of offenders) console.error(`  ${o}`);
  console.error('\nSee .claude/rules/writing-style.md. Fix or set draft: true.\n');
  process.exit(1);
}

console.log(
  `✓ ${files.length} posts checked against ${checks.length} voice rules.`,
);
