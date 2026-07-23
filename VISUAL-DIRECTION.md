# Visual direction

The binding direction for the visual remediation. Every fix traces here; a fix
that can't is out of scope. Derived from the instrumented audit
(`audit/visual-audit.md`) and its measurements (`audit/inventory.md`).

## The one idea

**The figures are the design.** This is an optical-imaging researcher's site,
and the things only he can supply — instrument diagrams, imaging data, plots,
photographs — are the identity. Every major page carries exactly one real
artifact from the practice, treated as a museum plate: shown whole, never
cropped through its content, on a white plate, captioned in the mono data
voice. A visitor should leave remembering "the physicist whose site shows the
actual instruments and data." No generator can imitate this, because a
generator cannot own the artifacts.

Corollary: decoration is never added where an artifact could stand, and no
artifact is ever fabricated. A gap waits for the real thing
(`needs-from-isaac.md`) rather than being filled with a stand-in.

## The systems that express it

**Type.** Two working voices (Source Serif 4 for reading, IBM Plex Mono for
data) under a Newsreader display. Display commits: page titles ≥48px at
desktop (display/body ≥3:1) so hierarchy is an event, not a step. Prose
measure held to 45–75 characters. Headings `text-wrap: balance`; prose
`text-wrap: pretty`; mono data gets `font-variant-numeric: tabular-nums`;
uppercase always tracked (the existing 1.5px small-caps voice is retained).

**Value.** Ink-on-paper with a real value range: near-black ink carries
titles and figures, near-white paper is the ground, and *body text reads in
body color* — the muted grey is reserved for genuine metadata (it carried 56%
of the site's text at baseline; the target is under 30%). Contrast is
hierarchy; AA is the floor, measured.

**Color.** One pigment: the forest green (#345130 / #8FB07F). It directs —
at most one green object per page with a job — and never decorates. Link
styling in prose stays functional, not ornamental.

**Space.** One rhythm, with density that follows importance: the working
sections (selected work, figures, publications) sit denser; thin pages get a
compressed top and a narrow measure so brevity reads intentional rather than
stranded. One licensed break per page type: the figure plate may exceed the
text measure to the wide container. Nothing else crosses its boundary.

**Surface.** No shadows. No cards where spacing can separate. Radii from a
set of at most four values (4 / 6 / 12px + the functional circle). Hairlines
only where spacing cannot do the job.

**Motion.** One easing, chosen once, documented here: `cubic-bezier(0.2, 0,
0, 1)` (fast-out, settled) at 150ms for color/hover; no entrance animation
anywhere; `prefers-reduced-motion` always honored.

## Real assets this direction needs (see needs-from-isaac.md)

1. One bench photograph — the all-fiber SRS amplifier or the OCT cart.
2. The CHSH Bell-violation plot (S = 2.51 ± 0.04) — the single most authored
   image this site could carry.
3. The conference poster (PDF or export) for a CV plate.
Already on hand and under-used: the two project figures
(`/images/uploads/IMG_2457/8.jpeg`), the portrait, the travel photography.

## Calibration anchors

- **karpathy.ai** — research figures inline as first-class content; figures
  sit in the flow at full measure, no card apology.
- **craigmod.com** — photography as identity; generous captioned plates.
- **ciechanow.ski** — the technical diagram as the brand; what a visitor
  remembers is the instrument graphic.

The target is *authored, not quirky*: every exception listed here exists for
a reason a reader could reconstruct. Anything not covered by this document
follows the site's existing design notes (`DESIGN.md`).
