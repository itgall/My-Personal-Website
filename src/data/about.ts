import rawAbout from "./about.json";

/**
 * About page content (about.json), edited in the CMS under Pages -> About.
 * Page structure (headings, section layout, the Learn more row) stays in the
 * template; the tagline, bio, timeline entries and meta description are
 * editable. Every value falls back to the wording below, so blank or
 * malformed values can never break the page (the JSON file itself is
 * required at build time).
 */
export interface TimelineEntry {
  period: string;
  role: string;
  institution: string;
  description: string;
  current: boolean;
  future: boolean;
}

interface RawAbout {
  metaDescription?: unknown;
  tagline?: unknown;
  bio?: unknown;
  timeline?: unknown;
}

const DEFAULT_META_DESCRIPTION =
  "Isaac Gallegos is a physics PhD student at the University of Colorado Boulder, working on quantum photonics, neuromorphic computing, and photonic integrated circuits.";
const DEFAULT_TAGLINE =
  "I build optical systems. Lately I've been learning to build quantum ones too.";
const DEFAULT_BIO =
  "I'm a physics PhD student at the University of Colorado Boulder, working on quantum photonics, neuromorphic computing, and photonic integrated circuits. Before Boulder, from 2025 to 2026, I was a research engineer at the Wellman Center for Photomedicine, where I built swept-source interferometric systems and wrote inverse models that figure out what a sample is made of from how it scatters light. I studied engineering physics at Colorado School of Mines, where I built solid-state lasers from scratch, measured a Bell-inequality violation with entangled photon pairs, and designed a photon-counting circuit on an FPGA. Outside the lab I travel, play neoclassical piano, learn languages, and climb.";
const DEFAULT_TIMELINE: TimelineEntry[] = [
  {
    period: "2026 \u2014 present",
    role: "Doctoral Researcher",
    institution: "University of Colorado Boulder \u00b7 Department of Physics",
    description:
      "Physics PhD. Working on quantum photonics, neuromorphic computing, and photonic integrated circuits.",
    current: true,
    future: false,
  },
  {
    period: "2025 \u2014 2026",
    role: "Research Engineer",
    institution: "Wellman Center for Photomedicine \u00b7 Harvard Medical School \u00b7 MGH",
    description:
      "Built swept-source interferometric systems, wrote inverse models for spectral measurements, and prototyped broadband micro-LED imaging hardware. First-author manuscript in preparation.",
    current: false,
    future: false,
  },
  {
    period: "2023 \u2014 2024",
    role: "Research Assistant & Project Lead",
    institution: "Colorado School of Mines \u2014 Physics Department & Ultrafast Laser Lab",
    description:
      "Computed Fisher information metrics for Ising models to test holographic duality conjectures. Also led a five-person team designing supersonic gas nozzles for high harmonic generation.",
    current: false,
    future: false,
  },
  {
    period: "2021 \u2014 2024",
    role: "B.S. Engineering Physics",
    institution: "Colorado School of Mines \u00b7 3.99 GPA",
    description:
      "Three years of quantum optics, laser physics, and electronics. Built solid-state lasers (Pr:YLF and Nd:YAG), measured Bell inequality violations with entangled photons, and designed a gated photon-counting circuit on an FPGA.",
    current: false,
    future: false,
  },
];

/** Trimmed non-empty string or the fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function normalizeTimeline(value: unknown): TimelineEntry[] {
  if (!Array.isArray(value)) return DEFAULT_TIMELINE;
  const valid = (value as unknown[])
    .map((item) => {
      const o = (item ?? {}) as {
        period?: unknown;
        role?: unknown;
        institution?: unknown;
        description?: unknown;
        current?: unknown;
        future?: unknown;
      };
      return {
        period: typeof o.period === "string" ? o.period.trim() : "",
        role: typeof o.role === "string" ? o.role.trim() : "",
        institution: typeof o.institution === "string" ? o.institution.trim() : "",
        description: typeof o.description === "string" ? o.description.trim() : "",
        current: o.current === true,
        future: o.future === true,
      };
    })
    .filter((e) => e.period.length > 0 && e.role.length > 0 && e.institution.length > 0);
  return valid.length > 0 ? valid : DEFAULT_TIMELINE;
}

const raw = rawAbout as RawAbout;

export const metaDescription: string = str(raw.metaDescription, DEFAULT_META_DESCRIPTION);
export const tagline: string = str(raw.tagline, DEFAULT_TAGLINE);
export const bio: string = str(raw.bio, DEFAULT_BIO);
export const timeline: TimelineEntry[] = normalizeTimeline(raw.timeline);
