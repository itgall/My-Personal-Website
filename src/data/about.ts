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
  "Isaac Gallegos builds interferometric imaging systems and spectral inverse models at the Wellman Center for Photomedicine. Applying to PhD programs for Fall 2027.";
const DEFAULT_TAGLINE =
  "I build optical systems. Lately I've been learning to build quantum ones too.";
const DEFAULT_BIO =
  "I work at the Wellman Center for Photomedicine, where I build swept-source interferometric systems and write inverse models that try to figure out what a sample is made of from how it scatters light. I've also built spectral unmixing pipelines for photoacoustic data and prototyped a broadband imaging system that uses individually addressable micro-LEDs instead of a swept laser. Before coming to Harvard I spent three years at Colorado School of Mines studying engineering physics, where I got to build solid-state lasers from scratch, violate the Bell inequality with entangled photon pairs, and design photon-counting circuits on an FPGA. These days I'm reading a lot about quantum information, quantum networks and photonic interconnects, and entanglement distribution between spin-based quantum nodes, and I'm applying to physics PhD programs for Fall 2027.";
const DEFAULT_TIMELINE: TimelineEntry[] = [
  {
    period: "2027 (target)",
    role: "PhD program",
    institution: "Physics, Fall 2027 (applying)",
    description:
      "Pursuing a physics PhD in quantum information and quantum networks: photonic interconnects and entanglement distribution between spin-based quantum nodes.",
    current: false,
    future: true,
  },
  {
    period: "2025 \u2014 present",
    role: "Research Engineer",
    institution: "Wellman Center for Photomedicine \u00b7 Harvard Medical School \u00b7 MGH",
    description:
      "I build swept-source interferometric systems, write inverse models for spectral measurements, and prototype broadband micro-LED imaging hardware. First-author manuscript in preparation.",
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
