# Visual AI-tell audit — isaac-gallegos.com

Instrumented, adversarial, visual-only. Evidence gathered before any opinion was
formed: 80 full-page screenshots (19 pages × 375/768/1440/1920px), hover/focus
state captures, a computed-style inventory extracted from the rendered DOM
(`inventory.md` / `inventory.json`), and derived views — 20px blur pass,
grayscale pass, contact sheet, and edge/box overlays (`derived/`). The site
ships exactly one reachable color scheme (light); dark exists as machinery with
no visitor-facing control, documented with forced-render shots.

## Verdict

**The first-generation AI signature is measurably gone. A second-generation
signature remains: a competently-configured minimal system that under-deploys —
and in one place actively damages — the only material that can prove
authorship: Isaac's real figures and photographs.** The site no longer looks
like a template. On its thirteen text-only interior pages it looks like
*nothing at all* — and evenly-distributed nothing still reads as generated.

What works, in one line: the micro-typography is genuinely crafted (small-caps
tracking ×95, a real mono data voice ×172, negative display tracking, zero
shadows, zero cards-as-decoration) — the earlier cleanup fully removed the SaaS
layer, and the measurements prove it.

## The measurements (Phase 1)

From `inventory.md`, aggregated across 19 rendered pages at 1440px:

| Signal | Measured | Reading |
|---|---|---|
| box-shadow | **0 occurrences** | SaaS furniture absent — confirmed |
| Keyframe animations | **0 running** | no decorative entrance motion |
| Card-shaped containers | **4 site-wide** | "everything is a card" tell absent |
| Text colors | 7 distinct; muted `rgb(115,109,97)` = **56% of all text** (412/739) | the dominant voice is the de-emphasized one |
| Border colors | 1 hairline = **77%** of visible borders (79/103) | separation monoculture |
| Font sizes | 19 distinct; mass in 9–16px; **12px is the most common (152)**; one 60px | hierarchy jumps exist but are rare events |
| Families | Source Serif 4 (487) · Plex Mono (172) · Newsreader (79) · Plex Sans (1) | two working voices + display; the "UI sans" barely exists |
| Transition easings | Tailwind default cubic-bezier (161) + `ease` (140), 0.15/0.2s | motion vocabulary is entirely stock defaults |
| Letter-spacing | 1.5px small-caps ×95; negative display tracking ×~50 | real micro-typographic craft present |
| Container max-widths | 13 distinct (1200/960/760/720/576…) | multiple measures; but one spine per page, never broken |
| Dark scheme | hardcoded `light`; toggle only in disabled palette | one reachable scheme; dark is dormant machinery |

## Findings (severity-ordered)

### V1 — HIGH · The visual hierarchy inverts the importance hierarchy
**Evidence:** `derived/blur/home__1440.jpg`. At squint distance the homepage has
exactly two tonal events: the portrait (top) and the four **hobby** plates
(bottom). The middle ~60% — Selected work and Research interests, the
professional core — is featureless grey fog. Travel and caving get imagery;
spectroscopic OCT gets 13px text.
**The tell:** a generated page distributes assets by availability; an authored
one distributes them by importance.
**Fix:** give the two Selected-work entries their real figures as contained,
captioned plates — the assets already exist (`/images/uploads/IMG_2457/8.jpeg`).
Rendered proof: `mockup/selected-work-CURRENT.png` vs
`mockup/selected-work-VARIANT.png`. **Effort S; no new assets.**

### V2 — HIGH · The uniform card crop mutilates the only research artifacts
**Evidence:** `derived/gray/research__1440.jpg`. Both project figures pass
through a 16:10 `cover` crop; the OCT workflow figure is truncated mid-word on
both edges ("…ess from raw spectral data", "Atter/Coefficie").
**The tell:** a real, information-dense human artifact treated as decorative
texture by a machine-uniform frame. The figure's maker would never crop it
mid-caption.
**Fix:** `object-fit: contain` (or per-figure aspect) for figure-type heroes,
white plate ground, caption in the mono voice. **Effort S.**

### V3 — HIGH · 13 of 19 pages carry zero visual material; thin pages read abandoned
**Evidence:** `derived/contact-sheet.jpg`. Colophon, contact, notes, now,
search, tags, teaching, essays, uses, 404, cv, publications and the text
sections of about are pure text on paper; several are a few lines stranded
top-left on an empty 1440px canvas. The ~19 real photographs/figures the site
does have are concentrated almost entirely in the hobby sections.
**The tell:** deep pages — where a professional visitor lands — are where the
site still reads generated.
**Fix:** one real artifact per major page (see Direction) and merge or
de-navigate the thinnest pages. **Effort M; needs assets only Isaac can supply.**

### V4 — MEDIUM · No macro-compositional decision anywhere
**Evidence:** `derived/edges/home.png` + contact sheet: one container spine per
page, zero overlap, zero boundary-crossings, every block a stacked rectangle.
The decision test surfaced five real **micro** choices (⅔-measure interests
column, small-caps label voice, mono data voice, negative display tracking, the
math-diagram reading plate) — and zero **compositional** ones: no scale drama,
no rhythm break for emphasis, nothing exceeding its frame. Craft lives below
16px; composition was never composed.
**Fix:** license exactly one break per page type — e.g., project-page figure
plates bleed to the wide container while text holds its measure. **Effort M.**

### V5 — MEDIUM · The accent never directs attention
**Evidence:** inventory — green text ×38, uniformly on links/labels/dots. It
marks *category* (link-ness), never *priority* (this one thing). With 56% of
text muted, no page has a single element that claims the eye.
**Fix:** at most one green object per page with a job; everything else neutral.
**Effort S.**

### V6 — LOW · Unreachable dark machinery that would ship broken
**Evidence:** `screens/home__1440-darkforced.png` — CV/email links render
near-illegible dark-on-dark; no visitor-facing toggle exists (palette feature
is off; theme script hardcodes light). Finish it (visible toggle + contrast
pass) or delete the dead scheme.

### V7 — LOW · Motion vocabulary is two stock defaults applied identically
**Evidence:** inventory — 0.15s/0.2s, Tailwind's default cubic-bezier + `ease`,
color-only hovers everywhere. Acceptable as a quiet-site choice; noted honestly
as *a default, not a decision*.

## Phase 2 test results (summary)

- **Isolated-screenshot:** text-only pages → "minimal academic starter" genre;
  home is the only page that approaches authored in isolation.
- **Default-generation:** "tasteful minimal academic site, serif, one green
  accent" is itself a 2026 generator default; what beats the default here is
  exclusively the real material (portrait, figures, travel photography) — which
  is why its placement (V1/V3) and treatment (V2) are the high findings.
- **Focal-point:** home partial pass (portrait primary, dead middle); research
  carried by figures but half-empty; all text pages fail (no focal event).
- **Decision test:** five micro-decisions found (listed in V4); zero
  macro-decisions — that asymmetry is the headline of this audit.
- **Human-artifact:** ≈19 genuine images (portrait, 2 research figures, ~15
  travel photographs, 1 math diagram). Not absent — **misallocated**: strongest
  where stakes are lowest, and damaged (V2) where stakes are highest. No
  instrument/bench photography, no data plots, no video anywhere on the site,
  despite the owner producing all three.
- **Provenance:** forest green #345130 — chosen, off-default. 6px radius,
  0.15s, Tailwind bezier — uncommon-defaults at best. The type stack —
  Newsreader + Source Serif 4 + Plex Mono — is a genuine combination.

## Direction — the one visual idea

**"The figures are the design."** An optical-imaging researcher's site where
every major page carries exactly one real artifact from the practice — a
figure, a plot, a bench photograph, a poster crop — treated as a museum plate:
shown whole, on a white plate, captioned in the mono data voice. A visitor
should remember "the physicist whose site shows the actual instruments and
data" — unimitable by a generator because the generator cannot own the
artifacts.

**Ordered moves:**
1. **Home Selected-work → figure plates** (V1). Rendered variant included;
   assets exist. Expected impact: the professional core becomes the page's
   visual center within one small change.
2. **Figure-integrity treatment site-wide** (V2): contain, intrinsic ratio,
   caption. Turns the two damaged artifacts into proof of authorship.
3. **One artifact per major page** (V3). CV: poster thumbnail (it already
   appears behind the portrait). Publications: first-page thumbnails.
   Teaching: a real problem-set/lab-guide crop.
   **Assets needed from Isaac (flagged, not fabricated):** one bench photograph
   (the all-fiber SRS amplifier or the OCT cart), one data plot — *the CHSH
   Bell-violation curve (S = 2.51 ± 0.04) would be the single most authored
   image this site could carry* — and the poster PDF.
4. **License one compositional break per page type** (V4).
5. **Re-aim the green** (V5): one directed accent per page.

**References:**
- **karpathy.ai** — research figures inline as first-class content, zero
  apology. Take: figures sit in the flow at full measure, not in cards.
- **craigmod.com** — photography as identity rather than decoration. Take: the
  plate treatment — generous, captioned, unhurried.
- **ciechanow.ski** — technical diagrams *as* the brand. Take: the instrument
  graphic as the thing a visitor remembers.

## Artifacts

- `screens/` — 80 full-page captures (19 pages × 4 widths, light) + forced-dark
  evidence + hover/focus states (bulk, not committed)
- `derived/blur/`, `derived/gray/` — squint and value passes (bulk)
- `derived/contact-sheet.jpg` — all pages tiled (committed)
- `derived/edges/` — box overlays for home/about/research/publications/misc/cv
- `inventory.md` / `inventory.json` — computed-style frequency tables (committed)
- `mockup/selected-work-CURRENT.png` / `mockup/selected-work-VARIANT.png` —
  rendered before/after of move #1 (committed)
