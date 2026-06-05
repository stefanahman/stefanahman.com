# UTM tagging (the source axis)

Umami auto-collects `utm_*` params (since v2.11.0), so the only work is *discipline*: tag every link you post on a channel you control. Never put UTMs on internal links or anything a crawler / the canonical tag sees.

## Taxonomy

| Param | Values |
|---|---|
| `utm_source` | `linkedin`, `bluesky`, `x`, `threads`, `hn`, `lobsters`, `devto`, `medium`, `substack`, `newsletter` |
| `utm_medium` | `social`, `community`, `syndication`, `email` |
| `utm_campaign` | the post slug (e.g. `thunder-and-lightning`) |

Example:

```
https://stefanahman.com/writing/thunder-and-lightning/?utm_source=bluesky&utm_medium=social&utm_campaign=thunder-and-lightning
```

## Bookmarklet

Make a new bookmark with this as the URL. On any page of the site, click it, answer two prompts, and the UTM-tagged URL lands on your clipboard. It strips any existing query string and sets `utm_campaign` to the slug automatically.

```js
javascript:(function(){var u=new URL(location.href);u.search='';var s=prompt('utm_source? (bluesky, linkedin, x, hn, lobsters, devto, medium, substack, newsletter)');if(!s)return;u.searchParams.set('utm_source',s.trim());var m=prompt('utm_medium?','social');if(m)u.searchParams.set('utm_medium',m.trim());var slug=u.pathname.replace(/\/+$/,'').split('/').pop()||'home';u.searchParams.set('utm_campaign',slug);navigator.clipboard.writeText(u.href).then(function(){alert('Copied:\n'+u.href);},function(){prompt('Copy:',u.href);});})();
```

## Reading it back

In Umami, the UTM insight breaks views down by source/medium/campaign. Cross it with the `content_type` property (fired by `BaseLayout.astro` on article views) to answer the real question: which crowd (tech vs life) arrives from which channel.
