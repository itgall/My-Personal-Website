# Design notes

These are the rules the site holds itself to. Most were learned the hard
way during the 2026 redesign — find a generic default, fix it, keep the fix
as a rule. The point is to keep the site from drifting into genericness one
small unexamined decision at a time.

One test covers most of it: the site should read as the work of one person
who made deliberate choices, not as whatever a template, framework, or tool
happened to default to.

## I. Photographs

Photographs are shown untouched. Text is never placed on an image; captions
sit beneath it, in the editorial voice. Photographs share one corner radius
site-wide (12px — the hero portrait, cards, and gallery plates all agree).
A plate's whole surface is its link. Hover feedback lives in the text: a
title, label, or link may change color or gain an underline. The object
itself — photograph, card, plate — never moves, scales, or casts a shadow.
Reduced-motion preferences are honored everywhere. Non-photographs (figures,
diagrams) may appear among photographs only when they can hold their own
edge on the page.

## II. Vertical rhythm — one boundary, one gap

Between any two neighboring regions of a page there is exactly one source
of space. Sections carry no vertical padding of their own; the page
composes them. The scale: 96px between sections on desktop, 64px on
mobile; page tops are 64/48px for index pages and 48px for reading pages
(deliberately tighter); the footer's own margin (96/64px) is the sole exit
gap on every page — no container carries bottom padding. There are no
exceptions: the About page once used alternating color bands, but they were
removed so it composes on the same rhythm as everything else.

## III. Typography — two voices

The site speaks in exactly two registers.

The **editorial voice** is serif: Source Serif 4 for prose, and serif
letterspaced small caps (`.sc-label` — uppercase, 0.14em; the nav at
0.12em) for navigation, kickers, section labels, and calls to action.

The **data voice** is monospace, and it is reserved: dates, periods,
venues, counts, identifiers (DOI, BibTeX), type and status badges,
keyboard hints, and code. The test is strict — if monospace appears, it
must be saying "this is a datum." Monospace never performs headings,
navigation, or persuasion.

Arrows appear on buttons, never on small-caps text links.

## IV. Apparatus proportional to content

Machinery must earn its place. Filters, sorting, and result counters
render only once a list reaches six items (`SHOW_CONTROLS_AT = 6`); below
that they are apparatus without purpose and read as template output.
Empty states are quiet sentences, not chrome. No decorative stickers,
no emoji as design elements, no duplicated taxonomies on one screen.

## V. Subtraction first

When something reads as generic, the first move is deletion, not addition.
A subtitle that restates its title is deleted. An excerpt ends at a
sentence, never mid-thought. Decoration must justify itself against the
question: would a careful person have chosen this, or did it merely arrive?

## VI. Specificity is the human signal

Real sentences beat labels; named details beat categories. "Boston Grotto,
weekends underground" is design. Copy that could appear on anyone's site
should not appear on this one.

## VII. Single sources of truth

Identity (name, role, affiliation, email, profiles) lives in one place and
flows everywhere — hero, About, Contact, footer, structured data. Content
lives in CMS-owned data files and collections. Components render; they do
not store. A fact should never need editing twice.

## VIII. Color

Near-monochrome ink on paper, with one accent: the muted forest green,
applied sparingly — links, the active state, small moments of emphasis.
The restraint is the point, and the green is a deliberate choice, not a
default tint.

## IX. Change discipline

Visualize before implementing; measure before changing. Refactors have to
prove zero regression: extract and compare page text, links, headings, and
descriptions before and after. Deploys are transactional and hash-gated —
they apply completely or not at all. Where a rule lives in code, a comment
marks it so the next editor doesn't break it by accident.

## X. How this site grows

The architecture is built to carry its owner from researcher to whatever
comes next without a rebuild. The plumbing for future eras already exists:
Ventures, Speaking, and Podcast are complete collections with admin
screens and settings toggles, currently dormant and already speaking the
house voice. They activate on thresholds, because a thin section damages
credibility more than an absent one.

This dormant machinery is a deliberate, eyes-open trade. Alongside those
sections it includes optional interactive islands (command palette, research
graph, link previews, reading progress, ambient canvas, an assistant widget,
a document-request flow) and a multi-preset accent switcher — all off by
default, none rendered on the live site. The cost is that a reader of the
*source* may read the unused breadth as scaffolding; the benefit is that
future eras turn on by flipping a flag, not by a rebuild. The standing rule
that keeps the trade honest: dormant code still obeys the house palette and
voice (only the forest accent's variables are inlined per page; no violet
ships), and nothing dormant is ever linked or rendered until it is real.

**Now — doctoral researcher.** Nav: Research, Publications, Writing,
About, Misc. Everything visible is real and current. As the doctorate
proceeds the research deepens and the list controls self-activate when a
collection crosses six items. Teaching enters the nav only if it becomes
substantial; otherwise it stays where it is.

**Founder era.** Ventures activates at one venture with a real narrative
and a committed status — something built or building, never something
merely considered.

**Public-voice era.** Speaking activates at three real talks with venues
and dates; one talk reads worse than none. Podcast activates at a trailer
plus two published episodes, minimum. The newsletter joins the nav once
its cadence is real.

**The nav law.** Five top-level items, plus or minus one, forever. When
something earns entry, something else merges or retires — Misc is the
natural absorber. The nav states what matters now; it is not an archive.

**Freshness.** The Now page is either current or honestly dated. Nothing
dormant is linked; nothing linked is stale.

## XI. What stays constant

A few things don't change from one era to the next. The name is the
identity, and this domain is the name. The work is physics turned into
instruments and pointed at real problems; the particular instruments
change freely. The two voices — serif for reading, mono for data — stay
put, and so does the restraint. The photographs and figures are always the
owner's own, which is the strongest authenticity signal the site has.

This site is the stable center of the owner's public identity: other
profiles point here, and it doesn't follow another platform's redesign.

## Changing these rules

The rules can change. When one does, say which rule and why, and update
this file in the same commit as the change. The thing to avoid is silent
drift.
