import rawNow from "./now.json";

/**
 * Now page content (now.json), edited in the CMS under
 * Pages -> Now. Headings and page chrome stay in the template;
 * section bodies are markdown rendered by src/utils/markdown.ts. Every value
 * falls back to the wording below, so blank or malformed values can never
 * break the page (the JSON file itself is required at build time).
 */
export interface PageSection {
  heading: string;
  body: string;
}

interface RawPage {
  subtitle?: unknown;
  updated?: unknown;
  sections?: unknown;
}

const DEFAULT_SUBTITLE = "What I'm focused on right now.";
const DEFAULT_UPDATED = "July 2026 \u00b7 Boulder, CO";
const DEFAULT_SECTIONS: PageSection[] = [
  {
    heading: "Research",
    body: "Starting a physics PhD at the University of Colorado Boulder, working on quantum photonics, neuromorphic computing, and photonic integrated circuits.",
  },
  {
    heading: "Podcast",
    body: "Developing a science podcast exploring how fundamental physics innovation translates into technologies that solve grand challenges in health, energy, and information. Currently in pre-production: building the guest pipeline, production stack, and first episode scripts.",
  },
  {
    heading: "Ventures",
    body: "Thinking about deep-tech companies in photonics, quantum sensing, and AI. Nothing to announce yet.",
  },
  {
    heading: "Learning",
    body: "Quantum computing fundamentals, Lean 4 theorem proving, advanced fiber optics, and the business mechanics of deep-tech company formation.",
  },
];

/** Keep a present-but-blank string (it hides the element); fall back otherwise. */
function optionalStr(value: unknown, fallback: string): string {
  return typeof value === "string" ? value.trim() : fallback;
}

/** Trimmed non-empty string or the fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function normalizeSections(value: unknown): PageSection[] {
  if (!Array.isArray(value)) return DEFAULT_SECTIONS;
  const valid = (value as unknown[])
    .map((item) => {
      const o = (item ?? {}) as { heading?: unknown; body?: unknown };
      return {
        heading: typeof o.heading === "string" ? o.heading.trim() : "",
        body: typeof o.body === "string" ? o.body.trim() : "",
      };
    })
    .filter((s) => s.heading.length > 0 && s.body.length > 0);
  return valid.length > 0 ? valid : DEFAULT_SECTIONS;
}

const raw = rawNow as RawPage;

export const subtitle: string = str(raw.subtitle, DEFAULT_SUBTITLE);
/** Blank hides the line entirely. */
export const updated: string = optionalStr(raw.updated, DEFAULT_UPDATED);
export const sections: PageSection[] = normalizeSections(raw.sections);
