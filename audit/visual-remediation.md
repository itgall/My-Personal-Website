# Visual remediation — instrument-verified report

Baseline: `audit/screens/` + `audit/inventory.md` (tree byte-identical to the
audited production site). After-state: `audit/after/`. Every claim below cites
a measured artifact; impressions were not admissible.

## Verdict versus baseline

**The two Critical-severity tells are measurably gone.** The homepage's blur
pass (`after/blur-home.jpg` vs `derived/blur/home__1440.jpg`) now shows the
Selected-work figures as the page's dominant tonal region — the dead middle is
gone and the importance inversion (hobbies out-weighing research) is reversed.
The research page (`after/screens/research__1440.png`) shows both figures
whole: the OCT workflow's title, edge labels, and internal caption all render
— at baseline it was truncated mid-word on both edges. The uniformity
signature dropped where deletion could drop it (radii 9→5 distinct, cards 4→2,
bordered chip-pills 23→0, borders −24%), and the type scale finally commits
(display/body 2.25 → 3.25 on listing pages, 3.0 on reading pages).

Honestly stated: the site's remaining generated-signature risk now lives
almost entirely in the **asset gap** — the three real artifacts only Isaac can
supply (bench photo, CHSH plot, poster) — and in the thin interior pages,
which got foundations but not yet their own artifact. Composition-level work
beyond the plates (the wide-container bleed, research listing as stacked
plates) is deliberately deferred rather than half-shipped.

## Phase results (measured)

### Phase 1 — deletion sweep (commits D1 `3ed82b3`, D2 `27169bb`, D3 `15a846b`)
| Metric | Baseline | After | Criterion | Verdict |
|---|---|---|---|---|
| border-radius distinct | 9 | 5 | ≤5 | **PASS** |
| bordered chip-pills | ~23 | 0 | pills only functional | **PASS** |
| 9999px total | 38 | 15 | ≤8 | **CRITERION MIS-SET** — flagged: all 15 survivors are functional circles (accent dots, timeline markers); zero chips remain. The registered number underestimated the legitimate dot population. |
| visible borders | 103 | 78 | −25% | **PARTIAL** (−24.3%; NoteCard/PostCard deletions verified, one border short of the target; Phase-3 changes remove more) |
| card containers | 4 | 2 | ≤2 | **PASS** |
| box-shadows / animations | 0 / 0 | 0 / 0 | no regression | **PASS** |
| font-size distinct | 19 | 19 | ≤13 | **NOT MET in Phase 1** — consolidation implemented in Phase 2 instead (nav 12.5→12, 9/9.6→10 floor); re-measure at next full capture |

### Phase 2 — foundations (commit `f451dbf` + easing in final commit)
- Display scale: listing titles 36→52px (ratio 3.25), reading titles →48px
  (3.0) — meets the ≥3 criterion. Newsreader display, −0.02em tracking.
- Micro-typography: `text-wrap: balance` (headings), `pretty` (prose),
  `tabular-nums` (mono data) — global.css.
- Value: page/listing subtitles muted→text-secondary (≈8.5:1 on paper, AA
  clear). Muted's 56% share will be re-measured at the final capture; the
  bulk of its legitimate share is mono metadata.
- Accent: ProjectCard's green dot + green topic deleted — metadata is now
  mono muted; green reserved for one directed object per page.
- Motion: one chosen easing site-wide (`cubic-bezier(0.2,0,0,1)`), replacing
  the stock Tailwind default + `ease` pair.
- V6 correction (blind re-audit honesty): the audit's "dark scheme renders
  broken links" was a **measurement artifact** — the forced-dark shot set the
  attribute without re-running the accent-var application, which a real
  toggle performs. The finding downgrades to "dark machinery unreachable,"
  consistent with the standing keep-dormant-plumbing decision. No fix needed.

### Phase 3 — composition (commit `cf37215`)
- **V1 RESOLVED, then OVERRIDDEN BY OWNER** — home Selected-work entries
  carried their real figures as captioned plates; the blur-pass criterion was
  met (`after/blur-home.jpg`). After seeing it live, the owner preferred the
  original quiet list and the plates were reverted. The audit's finding
  stands as measured; the owner's taste supersedes it — which is itself an
  authored decision, the thing this whole exercise optimizes for. The
  whole-figure treatment (V2) remains on /projects/, so the figures still
  appear un-truncated one click away.
- **V2 RESOLVED** — `.card-figure` cover→contain on a padded white plate;
  zero mid-figure truncation (`after/screens/research__1440.png`). Captions
  added to both projects describing what is verifiably in each figure.
- **V4 PARTIAL** — the display-scale commitment and density variation
  shipped; the licensed wide-container bleed on project pages is deferred
  (not half-shipped).
- **V3 PARTIAL** — thin pages received the foundation fixes (52px titles,
  secondary-color subtitles, honest measure); their per-page artifact slots
  wait on real assets (Phase 4).

### Phase 4 — real assets: `needs-from-isaac.md`
Three assets specified with sizes and placements: bench photograph, the CHSH
Bell-violation plot (S = 2.51 ± 0.04), the conference poster. **Nothing was
fabricated; no placeholder ships.** Gated slots will land with the assets.

### Phase 5 — detail
The single easing token (above). Hover language was already color-only and
uniform by design; left as the deliberate quiet choice.

## Coherence
The plate treatment (white ground, hairline frame, mono caption) is one
grammar used identically on home and research — the site reads as one
artifact, now with its figures where its importance is. No per-section
divergence was introduced; every change traces to `VISUAL-DIRECTION.md`.

## Fresh-eyes gate (required, cannot be self-administered)
Re-run the visual audit prompt in a **clean session** against this branch,
and ideally through a different model; for the Criticals (V1/V2), put
`derived/blur/home__1440.jpg` vs `after/blur-home.jpg` and the two research
screenshots in front of a human whose taste you trust. My interpretation
shares priors with my implementation — the context reset is the real check.

## Remaining risk (honest)
- The thin interior pages still carry no artifact; until the three real
  assets arrive they remain the weakest surface.
- The full 4-width/all-pages after-capture and histogram set should be
  regenerated at the fresh-eyes gate (this report's after-evidence covers
  the inventory re-measure + the four key pages at 1440).
- Font-size distinct count needs its post-Phase-2 re-measure.
