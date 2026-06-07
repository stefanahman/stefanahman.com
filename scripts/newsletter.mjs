#!/usr/bin/env node
// Create a Buttondown email from a prepared payload.
//
// SAFE BY DEFAULT: this creates a *draft* (status="draft"). It never sends
// unless you pass --send. Buttondown's API sends to your whole list immediately
// if you omit status, so we ALWAYS set it explicitly. Do not change that.
//
// The /newsletter Claude skill assembles the payload (intro in Stefan's voice +
// excerpt + tracked link) and calls this. You can also run it by hand.
//
// Usage:
//   node --env-file=.env scripts/newsletter.mjs --payload .newsletter/payload.json
//   # add --send to send immediately (you almost never want this)
//   # add --force to create even if an email with this slug already exists
//
// Env:
//   BUTTONDOWN_API_KEY    required (Settings -> API in Buttondown)
//   BUTTONDOWN_API_BASE   optional, default https://api.buttondown.com/v1
//   BUTTONDOWN_SEGMENT    optional, "1" to filter the send by content_type tag.
//                         Requires Buttondown Tags (paid) to be enabled and the
//                         filter schema below to be verified. Off by default.
//
// Payload JSON shape:
//   { "subject": "...", "body": "...(markdown)...", "slug": "post-slug",
//     "canonicalUrl": "https://stefanahman.com/writing/post-slug/",
//     "contentType": "tech" | "life" | null }

import { readFileSync } from 'node:fs';

const API_BASE = process.env.BUTTONDOWN_API_BASE ?? 'https://api.buttondown.com/v1';
const API_KEY = process.env.BUTTONDOWN_API_KEY;

function fail(msg) {
  console.error(`✖ ${msg}`);
  process.exit(1);
}

const args = process.argv.slice(2);
const hasFlag = (n) => args.includes(n);
const getOpt = (n) => {
  const i = args.indexOf(n);
  return i >= 0 ? args[i + 1] : undefined;
};

const payloadPath = getOpt('--payload');
const doSend = hasFlag('--send');
const force = hasFlag('--force');

if (!API_KEY)
  fail(
    'BUTTONDOWN_API_KEY is not set. Add it to .env and run with ' +
      '`node --env-file=.env scripts/newsletter.mjs ...`, or export it first.',
  );
if (!payloadPath) fail('Missing --payload <file.json>.');

let payload;
try {
  payload = JSON.parse(readFileSync(payloadPath, 'utf8'));
} catch (e) {
  fail(`Could not read payload ${payloadPath}: ${e.message}`);
}

const { subject, body, slug, canonicalUrl, contentType } = payload;
for (const [k, v] of Object.entries({ subject, body, slug })) {
  if (!v || typeof v !== 'string')
    fail(`Payload field "${k}" is required and must be a non-empty string.`);
}

async function bd(path, init = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Token ${API_KEY}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = text;
  }
  return { ok: res.ok, status: res.status, json };
}

// Dedup by slug (slug is unique per newsletter). We match client-side so this
// works whether or not the API honours ?slug= filtering. Listing defaults to
// status=about_to_send, so we ask for each status explicitly. We only check the
// first page per status; with a slug filter that is plenty, and it keeps this
// O(1)-ish rather than scanning the whole archive.
async function findExistingBySlug(wanted) {
  const statuses = ['draft', 'scheduled', 'about_to_send', 'sent'];
  for (const status of statuses) {
    const { ok, json } = await bd(
      `/emails?slug=${encodeURIComponent(wanted)}&status=${status}`,
    );
    const results = ok && json && Array.isArray(json.results) ? json.results : [];
    const match = results.find((e) => e.slug === wanted);
    if (match) return match;
  }
  return null;
}

if (!force) {
  const existing = await findExistingBySlug(slug);
  if (existing)
    fail(
      `An email with slug "${slug}" already exists ` +
        `(status: ${existing.status}, id: ${existing.id}). ` +
        'Nothing sent. Use --force to create another anyway.',
    );
}

const status = doSend ? 'about_to_send' : 'draft'; // explicit, always
const email = {
  subject,
  body,
  slug,
  status,
  canonical_url: canonicalUrl,
  // content_type is recorded now (harmless, useful later) even though the
  // emails endpoint can't yet be filtered by metadata.
  metadata: { content_type: contentType ?? null, source: 'newsletter-skill' },
};

// --- segmentation seam (inert by default) ---
// Sends only to subscribers tagged with this post's bucket (plus "both").
// Requires Buttondown Tags (paid) AND verifying this filter shape against
// https://docs.buttondown.com/api-filtering before flipping BUTTONDOWN_SEGMENT=1.
if (process.env.BUTTONDOWN_SEGMENT === '1' && contentType) {
  console.warn(
    '! BUTTONDOWN_SEGMENT=1: applying a tag filter. Verify the filter schema ' +
      'against Buttondown docs before trusting this in production.',
  );
  email.filters = {
    predicate: 'and',
    groups: [
      {
        predicate: 'or',
        filters: [
          { field: 'tag', operator: 'equals', value: contentType },
          { field: 'tag', operator: 'equals', value: 'both' },
        ],
      },
    ],
  };
}

const { ok, status: httpStatus, json } = await bd('/emails', {
  method: 'POST',
  body: JSON.stringify(email),
});

if (!ok) {
  const detail = typeof json === 'object' ? JSON.stringify(json) : String(json);
  // A duplicate-slug rejection is a benign "already handled" signal if the
  // pre-check above missed it (e.g. slug filtering not honoured server-side).
  if (/slug/i.test(detail) && /uniqu|already|exist/i.test(detail))
    fail(`Buttondown says slug "${slug}" already exists. Looks already handled.`);
  fail(`Buttondown returned ${httpStatus}: ${detail}`);
}

console.log(`✓ Created ${status === 'draft' ? 'a draft' : 'a send'} for "${slug}".`);
console.log(`  id:  ${json.id}`);
if (json.absolute_url) console.log(`  url: ${json.absolute_url}`);
if (status === 'draft')
  console.log('  → Review it in Buttondown and hit Send. It has NOT been sent.');
