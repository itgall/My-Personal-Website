/**
 * contentMaturity.ts — Content maturity level configuration.
 *
 * Each digital-garden note carries a maturity stage. It renders as a quiet
 * data-voice label (see ContentMaturity.astro / NoteCard.astro) — no emoji,
 * no per-stage color; the word carries the meaning.
 *   - seedling:   Early idea, may be incomplete or speculative
 *   - budding:    Work in progress, main ideas forming
 *   - evergreen:  Mature, well-developed, regularly maintained
 */

export type MaturityLevel = "seedling" | "budding" | "evergreen";

export interface MaturityConfig {
  /** Human-readable label */
  label: string;
  /** Longer description for tooltips and screen readers */
  description: string;
}

export const maturityConfig: Record<MaturityLevel, MaturityConfig> = {
  seedling: {
    label: "Seedling",
    description: "Early idea — may be incomplete or speculative",
  },
  budding: {
    label: "Budding",
    description: "Work in progress — main ideas are forming",
  },
  evergreen: {
    label: "Evergreen",
    description: "Mature and well-developed — regularly maintained",
  },
};

/** Get config for a maturity level with type safety */
export function getMaturityConfig(level: MaturityLevel): MaturityConfig {
  return maturityConfig[level];
}
