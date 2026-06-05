# Growing stefanahman.com in 2026: a grounded playbook

*Researched June 2026. Each claim is marked **[primary]** (vendor docs, official guidelines, peer-reviewed, or this repo), **[secondary]** (industry analysis), or **[contested]**. Primary claims were adversarially verified; treat marketing-blog material as directional.*

**Top line:** Run one owned hub (this site), syndicate outward with canonical tags pointing home, and instrument two measurement axes (traffic *source* × content *type*) so the "life" and "tech" crowds stay legible. ~70% of the infrastructure already exists. The work is distribution discipline and a small measurement patch, not a rebuild.

---

## What already exists (don't rebuild)

From the repo, verified:
- **Canonical tags** on every page (`BaseLayout.astro`), correct JSON-LD (`BlogPosting`, `Person`, `BreadcrumbList`), `sameAs` to GitHub/LinkedIn. GEO/SEO fundamentals are done.
- **Two content buckets already encoded**: every post carries a `tech` or `life` routing tag (`lib/content.ts`), and the site ships `/feed/tech.xml` + `/feed/life.xml` + `/rss.xml`.
- **Umami analytics** self-hosted at `umami.steflix.net` (`BaseLayout.astro`). This is the segmentation engine. Keep it.

The gap: content-type lives in *frontmatter*, not the URL, so Umami can't see it yet. One small patch fixes that.

---

## Priority 1 — Two-axis measurement (this week, ~1 hour)

Tell the two crowds apart by where they come from. Two axes:

### Axis A — Source (which channel). Free, already on. [primary: Umami docs]
Umami **automatically collects** `utm_source/medium/campaign/term/content` and gives a built-in UTM report, zero config (https://docs.umami.is/docs/utm). It just needs *discipline*: tag every link posted on a channel you control.

| Param | Values | Notes |
|---|---|---|
| `utm_source` | `linkedin`, `bluesky`, `x`, `threads`, `hn`, `lobsters`, `devto`, `medium`, `substack`, `newsletter` | the specific place |
| `utm_medium` | `social`, `community`, `syndication`, `email` | the *type* of place |
| `utm_campaign` | the post slug (e.g. `thunder-and-lightning`) | compare posts |

Example: `https://stefanahman.com/writing/thunder-and-lightning/?utm_source=bluesky&utm_medium=social&utm_campaign=thunder-and-lightning`

Rule: UTMs go **only** on outbound links placed by hand. Never on internal links or anything a crawler/canonical sees.

### Axis B — Content type (life vs tech). One small patch. [primary: Umami + repo]
Fire a custom event on article views carrying the type. In `BaseLayout.astro`, derive it from the tags already passed, and emit an event when `type === 'article'`:

```astro
---
// add near the other prop logic
const contentType = tags.includes('tech') ? 'tech'
  : tags.includes('life') ? 'life'
  : undefined;
---
{import.meta.env.PROD && type === 'article' && contentType && (
  <script is:inline define:vars={{ contentType, slug: path }}>
    (function send() {
      if (window.umami) umami.track('article-view', { content_type: contentType, slug });
      else setTimeout(send, 300); // tracker loads deferred; retry until ready
    })();
  </script>
)}
```

Now in Umami's **Insights** report, break down and filter by the `content_type` property and cross it with source. The read: *filter `content_type = life`, look at the UTM/referrer breakdown; then `content_type = tech`, same.* If life essays convert from Bluesky and tech essays from HN, it shows directly.

**Limitation Umami can't fix:** it's JavaScript-based, so it cannot see **RSS feed fetches or AI-crawler hits** (no JS runs). `/feed/tech.xml` vs `/feed/life.xml` subscriber counts won't appear. To measure RSS, use server-log analysis or a feed proxy (FeedPress) that counts subscriber pulls.

### Metrics to watch (and ignore)
Watch: returning readers, newsletter signups per post, source→content_type cross-tab, read-through on long essays. Ignore: raw pageview spikes (an HN spike that retains nobody is vanity), follower counts on platforms you don't own.

---

## Priority 2 — Capture an owned audience (the one durable asset)

Social reach is rented; AI search erodes Google referrals; the email list survives algorithm changes. Simon Willison's stated biggest regret is not starting an email list sooner: *"way more people want to subscribe via email than via RSS"* [primary: simonwillison.net].

**Tooling:** Buttondown's **free plan sends from your own domain** (`newsletter@stefanahman.com`), the capability that matters when the site is already the canonical home. The paid ($29/mo) custom-domain *archive* hosting is redundant here, because the site already hosts the archive [primary: docs.buttondown.com, buttondown.com/pricing]. Cross-vendor cost comparisons (Substack's cut, Beehiiv/Ghost at scale) **failed verification**, so no price ranking. Decision: an ESP that sends well and stays out of the way. Buttondown fits and has a free tier; Kit/Ghost are fine if outgrown.

Add a plain email-capture form to the post template and homepage. RSS already exists. Don't move the canonical home into any newsletter platform.

---

## Priority 3 — The compounding loop (every post): POSSE

**Post on your Own Site, Syndicate Elsewhere.** Publish first here (canonical), repost on platforms with a canonical tag pointing home, then distribute the link on social. Canonical support varies and dictates publishing *order* [secondary + primary help-docs]:

| Platform | Canonical support | How | Use for |
|---|---|---|---|
| **dev.to** | full | `canonical_url:` frontmatter, or RSS-import auto-flag | tech essays |
| **Medium** | full | Import tool (`medium.com/p/import`, auto-canonical + backdates) or Story Settings → Advanced | either bucket |
| **Substack** | none | cannot point elsewhere | Notes + summaries that *link* home, never the canonical original |

Because Substack can't defer canonical, **never let Substack be the only home of a piece**. Publish here, post a teaser/summary on Substack linking back, use Notes for distribution.

Caveats [contested]: (1) Google increasingly **picks its own canonical** regardless of the tag, and has occasionally credited a Medium copy over an older original; (2) duplicate-content *penalty* risk has softened, but set canonical anyway for attribution.

---

## Priority 4 — Channel playbook (the two crowds live in different places)

### Tech essays
- **Hacker News** [primary: HN guidelines]: post own work *"part of the time"*, never solicit upvotes (voting-ring detector defeats it), use the **original title, no editorializing/linkbait/caps/exclamations**. Converts to subscribers via a visible email signup + strong internal links (`getRelatedPosts` already does this).
- **Lobsters** [primary: lobste.rs/about]: invite-only (authors of posted links are welcomed to join via chat), self-promo **under ~25%** of activity, **narrowly computing-scoped**. Tech essays qualify; life essays explicitly don't.
- **dev.to**: cross-post with canonical.
- **Bluesky**: strong tech + writer community, **no link penalty**.

### Life essays
- **Substack Notes**: the literary-essay social layer.
- **Bluesky**: literary writers have concentrated here; best **referral + subscriber conversion** of the X-alternatives (publishers report ~3× the traffic, ~4.5× the paid conversions of Threads) [secondary: eMarketer, Buffer].
- **X**: largest and densest with media/writers, but **demotes external links** — presence over click-through.
- **Threads**: easiest cold-start (imports Instagram graph), skews lifestyle/light.

### LinkedIn (both buckets, unusually favorable in 2026) [secondary, directional]
Rewards **dwell time and substantive comments over likes**; depth over formatting tricks ("broetry" is now penalized). Native **Articles and Newsletters are boosted** and bypass the feed via subscriber notifications. Personal profiles >> company pages. Catch: **external links in the body cut reach** (~19–60% range; "link in first comment" workaround is contested). Move: write the essay's core as a native post/Article, put the link in the first comment or accept the reach hit. Keep topics consistent so the interest graph can categorize you.

**Cross-channel takeaway:** Bluesky is the best single bet for *driving readers to the site* (no link penalty, high conversion). LinkedIn is best for *native long-form reach*. HN/Lobsters are episodic tech-only spikes.

---

## Priority 5 — Discovery in the AI-search era (GEO/SEO)

Google's May 2026 guidance: optimizing for AI Overviews **is just SEO**, same ranking systems, **no special files/schema/Markdown** needed [primary: Google AI optimization guide]. Highest-leverage move it names: favor **unique, first-hand, experience-based** content, *"Don't just recycle what others have said, or could easily be produced by a generative AI model."* That is exactly what a voice-driven essayist produces.

Caveats: (1) Google-only; ChatGPT/Claude/Perplexity use different retrieval, citation overlap with Google rankings fell ~76%→~38% in eight months [secondary, contested] — off-Google citation rewards Reddit/forum presence and quotable passages. (2) **llms.txt** is *not* a ranking factor today; cheap future-proofing only [secondary]. (3) The "40% GEO uplift" figure **failed verification — don't use it.**

The site rule of leading with a concrete answer doubles as GEO: extractable first sentences get cited.

---

## Priority 6 — Learn from the best (repeatable moves)

**Simon Willison** [primary: his own post] — hybrid-tech model. 7,600+ posts since 2003. Signature: **credit the source author by name, add your own context, quote liberally.** *"The value is in writing frequently and having something to show for it over time."* Distributes via Bluesky/Mastodon. Regret: build the email list sooner.

**Craig Mod** [secondary: his essay] — hybrid-literary model. **Reintroduce yourself in the first paragraph of every issue**, one-line footer bio, one-click prominent unsubscribe, no login-walls (they trigger spam reports), system fonts, strong POV: *"If you're sending a 'list newsletter' you better have one hell of a point of view."*

**Ava / bookbear express** [secondary: Tim Denning] — literary-essay model. Built an audience on X *first*; publishes **at least one free essay monthly** for sharing, paywalls the rest, reveals a generous chunk before the paywall; unmistakable voice; years of consistency.

Thread across all three: **high cadence, an unmistakable point of view, owning the list.** None won on growth hacks.

---

## Contested / changed-from-old-advice
- "**Link in first comment**" on LinkedIn is now contested; some sources say patched. [contested]
- **X removed its link penalty** (Oct 2025), so "X penalizes links" is stale for X specifically; LinkedIn/Instagram/TikTok suppression persists. [contested]
- **Substack network/pricing claims** ("50% of subs from the network", cost-at-scale) **failed verification**.
- Vendor ESP rankings beyond "Buttondown free tier sends from your domain" did not survive verification.

---

## First-week checklist
1. Patch `BaseLayout.astro` with the `content_type` event. Verify in Umami → Events that `article-view` fires.
2. Adopt the UTM scheme; make a snippet/bookmarklet so tags are never hand-typed.
3. Add a Buttondown free-tier signup form to the post footer and homepage.
4. Warm up **Bluesky** (both buckets); set a **LinkedIn** native-post cadence (tech-leaning, given the network).
5. Next tech essay: publish on-site → cross-post to dev.to with `canonical_url` → submit to HN with the exact title → share on Bluesky with UTMs.
6. After 2–3 posts, read the **source × content_type** cross-tab and let it tell you where each crowd comes from.

---

## Key sources
- Buttondown: https://docs.buttondown.com/hosting-on-a-custom-domain , https://buttondown.com/pricing
- Google AI optimization: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- GEO paper (KDD 2024): https://arxiv.org/abs/2311.09735
- HN guidelines: https://news.ycombinator.com/newsguidelines.html
- Lobsters: https://lobste.rs/about
- Simon Willison on link-blogging: https://simonwillison.net/2024/Dec/22/link-blog/
- Craig Mod on newsletters: https://craigmod.com/essays/on_writing_good_newsletters/
- Ava / bookbear (Tim Denning): https://timdenning.com/ava-bookbear-substack/
- Bluesky referral data: https://www.emarketer.com/content/bluesky-surpasses-threads-x-referral-traffic-source
- Umami UTM + tracker: https://docs.umami.is/docs/utm , https://docs.umami.is/docs/track-events , https://docs.umami.is/docs/tracker-functions
