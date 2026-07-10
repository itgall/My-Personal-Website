import rawUses from "./uses.json";

/**
 * Uses page content (uses.json), edited in the CMS under
 * Pages -> Uses. Headings and page chrome stay in the template;
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

const DEFAULT_SUBTITLE =
  "Tools, software, and equipment I use for research, development, and daily work.";
const DEFAULT_UPDATED = "June 2026";
const DEFAULT_SECTIONS: PageSection[] = [
  {
    heading: "Research & lab",
    body: "**COMSOL Multiphysics** for computational optical modeling \u2014 finite element simulations of light propagation, waveguide design, and photoacoustic wave propagation. **Zemax OpticStudio** for optical system design, ray tracing, and tolerance analysis. **MATLAB** for inverse algorithm development, signal processing, spectral analysis, and Jones matrix polarization simulations. **SolidWorks** for mechanical design of optical assemblies and optomechanical components.",
  },
  {
    heading: "Computation & ML",
    body: "**Python** as the primary language for research computing, with **PyTorch** and **JAX** for physics-informed neural networks and differentiable forward models. **NumPy**, **SciPy**, and **scikit-learn** for numerical methods and data analysis. **Jupyter** for exploratory analysis and **LaTeX** for manuscripts and technical documentation.",
  },
  {
    heading: "Development",
    body: "**VS Code** as the primary editor, with Vim keybindings. **Git** and **GitHub** for version control. This site is built with **Astro 6**, **Tailwind CSS v4**, and **TypeScript**, hosted on **Netlify**. **Claude Code** for AI-assisted development. See the [colophon](/colophon/) for full site architecture details.",
  },
  {
    heading: "Productivity",
    body: "**Obsidian** for research notes, literature reviews, and the working notes that feed this site's notes section. **Superhuman** for email. **Reclaim.ai** for calendar management and time blocking. **Fathom** for meeting transcription and action items.",
  },
  {
    heading: "Hardware",
    body: "Research workstation with NVIDIA GPU for COMSOL and ML training. Lab equipment includes swept-source lasers, fiber optic test benches, optical spectrum analyzers, and custom catheter assembly fixtures.",
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

const raw = rawUses as RawPage;

export const subtitle: string = str(raw.subtitle, DEFAULT_SUBTITLE);
/** Blank hides the note. */
export const updated: string = optionalStr(raw.updated, DEFAULT_UPDATED);
export const sections: PageSection[] = normalizeSections(raw.sections);
