# Design direction

The committed direction for this site. It exists so that every element is an
instance of one decision, not a default that happened to arrive. Where a later
change departs from this, it amends this file in the same commit.

The site already had most of this in its code; what was missing was a single
written standard and the removal of the places where an older, more generic
direction still leaked through (violet social-card images, comments naming
fonts the site no longer uses). This document is that standard.

## Palette

Near-monochrome ink on paper, with exactly one accent.

| Token | Light | Dark |
|---|---|---|
| Paper (bg) | `#FCFCFB` | `#1B1A17` |
| Ink (headings) | `#211F1C` | `#F4F2EC` |
| Body text | `#39372F` | `#ECEAE3` |
| Muted | `#736D61` | `#9C968B` |
| Accent (forest) | `#345130` | `#8FB07F` |

The accent is used sparingly and with conviction: links, the active nav state,
and small moments of emphasis. Nothing else.

**Why this green, specifically.** It is desaturated and slightly blue-shifted —
deliberately not stock Tailwind `green-500` (`#22c55e`), which reads as a
framework default. `#345130` on paper measures ~8:1 contrast (well past AA), and
its dark-mode pair `#8FB07F` clears AA on the dark background. It reads as a
mixed pigment, not a swatch.

**Binding rule: forest green is the only accent that ever ships.** No violet,
no indigo, no gradient-filled text, no second accent. Any surviving
`#6B4C9A` / `#A587CC` (the old "405nm violet" that lingered in the social-image
generator and the inlined theme presets) is removed on sight. The accent-preset
switcher may exist in code as dormant machinery, but the built site renders one
accent.

## Type

Two voices, and only two.

- **Editorial (serif).** Display and headings: **Newsreader** (an optical-size
  serif — it sets differently at 12px and 48px, which is the point). Long-form
  prose: **Source Serif 4**. Small-caps labels, kickers, nav, and calls to
  action use letterspaced serif caps (`.sc-label`).
- **Data (mono).** **IBM Plex Mono**, reserved strictly for data: dates, venues,
  identifiers (DOI, ORCID, BibTeX), counts, type/status badges, keyboard hints,
  and code. If mono appears, it is saying "this is a datum." It never performs a
  heading or persuasion.
- **UI (sans).** **IBM Plex Sans** for chrome where a sans is warranted.

**Why not Inter everywhere.** Inter-as-body is the single most common template
default; an editorial serif body with a distinct display serif is what a person
who cares about type would choose. (The repo's older comments still say
"Inter / JetBrains Mono" — those are stale and are being corrected to match the
fonts actually loaded.)

Scale: 1.25 modular. Arrows appear on buttons, never on small-caps text links.

## Spacing and rhythm

One boundary, one gap. Between any two neighboring regions there is exactly one
source of space: 96px between sections on desktop, 64px on mobile; index-page
tops 64/48px, reading-page tops 48px (deliberately tighter). Sections carry no
vertical padding of their own — the page composes them. The footer's own margin
is the sole exit gap on every page.

Deliberate break: none currently licensed. (The About page's alternating
full-width color bands were a licensed exception; they are being removed, so the
exception retires with them.)

## Density

Content-forward, moderate density. Type is sized for reading, not for filling a
viewport; whitespace serves rhythm, not the masking of thin content. The
homepage — headshot, intro, a real list of work, a date-aligned writing list — is
the density reference: something to read on every screen, no oversized hero.

## Voice

First person, plain, declarative, specific.

- Short-to-medium sentences. Prose where a real person would write prose;
  lists only where the content is genuinely a list.
- **Refuses:** grandiose vagueness ("grounded in", "leveraging", "seamless",
  "translating X into real-world impact", "at the intersection of"); the rule of
  three as a reflex; mission-statement taglines; em-dash overuse; and any
  sentence that could sit unchanged on a stranger's site.
- **Prefers** named details over categories. "Boston Grotto, weekends
  underground" over "passionate about caving." A specific instrument, a specific
  number, a specific opinion.

## Reference sites

The calibration anchors — real people whose sites read as hand-made, not
generated. Every "does this read as AI?" judgment is made against these, not
against unanchored intuition.

- **Geoffrey Litt** — geoffreylitt.com
- **Andrej Karpathy** — karpathy.ai
- **Patrick Collison** — patrickcollison.com

They share the qualities this site is aiming for: content is the feature,
decoration is minimal and earned, and the writing sounds like one person with a
point of view.
