/**
 * settings.ts — Typed site settings reader.
 *
 * Reads src/data/settings.json at build time and exports typed accessors
 * with safe defaults for every field. Components import from this module
 * to check feature flags and appearance settings.
 *
 * The settings file is editable via the Sveltia CMS admin page
 * (file collection "Site Settings" → "Features & Appearance").
 * Changes are committed to git and take effect on the next build.
 *
 * Settings are baked into static HTML at build time. A missing key falls
 * back to a sensible default (generally "enabled" for existing features).
 */

import rawSettings from "./settings.json";

/* ── Type definitions ─────────────────────────────────────────────────────── */

export interface FeatureSettings {
  /** Block all content with a maintenance overlay (bypass with ?preview=true) */
  maintenanceMode: boolean;
  /** Default accent color preset ID (see src/data/accents.ts; default "forest") */
  defaultAccent: string;
  /** Compute and display bidirectional backlinks */
  backlinks: boolean;
  /** Show table of contents on blog posts */
  tableOfContents: boolean;
  /** Enable hover/focus link preview popovers */
  linkPreviews: boolean;
  /** Enable the /search/ page with Pagefind */
  searchPage: boolean;
  /** Enable the /graph/ page with D3 force-directed visualization */
  researchGraph: boolean;
  /** Show seedling/budding/evergreen maturity badges on notes */
  contentMaturityBadges: boolean;
  /** Show copy button on code blocks */
  copyCodeButton: boolean;
  /** Click-to-zoom on images inside article content */
  imageZoom: boolean;
  /** Inline document/PDF preview overlay */
  documentViewer: boolean;
  /** Show reading progress bar on article pages */
  readingProgressBar: boolean;
  /** Enable ⌘K / Ctrl+K command palette */
  commandPalette: boolean;
  /** Enable ambient canvas visual effects */
  visualEffects: boolean;
  /** Enable AI chat widget */
  chatWidget: boolean;
  /** Enable CV/resume document request modal with gated access */
  documentRequestModal: boolean;
}

export interface SectionSettings {
  /** Show Publications section in nav and build publication pages */
  publications: boolean;
  /** Show Projects/Research section */
  projects: boolean;
  /** Show Writing section (essays and notes) */
  writing: boolean;
  /** Show Teaching section */
  teaching: boolean;
  /** Show CV page */
  cv: boolean;
  /** Show About page */
  about: boolean;
  /** Show Contact page */
  contact: boolean;
  /** Show Ventures section */
  ventures: boolean;
  /** Show Speaking & Media section */
  speaking: boolean;
}

export interface AppearanceSettings {
  /** Default theme: light, dark, or system (follows OS preference) */
  defaultTheme: "light" | "dark" | "system";
  /** Site style: default (current design) or minimal (typography-first, no accent) */
  siteStyle: "default" | "minimal";
  /** Loading animation style: none, monogram, terminal, pulse, name */
  loadingAnimation: "none" | "monogram" | "terminal" | "pulse" | "name";
  /** Enable Astro View Transitions for smooth page navigation */
  viewTransitions: boolean;
  /** Enable scroll-reveal animations on page elements */
  scrollReveal: boolean;
  /** Use custom SVG cursor themed to accent color */
  customCursor: boolean;
}

export interface SiteSettings {
  features: FeatureSettings;
  sections: SectionSettings;
  appearance: AppearanceSettings;
  analytics: AnalyticsSettings;
  newsletter: NewsletterSettings;
}

export interface AnalyticsSettings {
  /** Analytics provider: "plausible", "fathom", "umami", or "none" */
  provider: "plausible" | "fathom" | "umami" | "none";
  /** Domain to track (e.g., "isaac-gallegos.com") — empty string disables */
  domain: string;
  /** Master enable/disable switch */
  enabled: boolean;
}

export interface NewsletterSettings {
  /** Email provider for the owned subscriber list */
  provider: "buttondown" | "none";
  /** Buttondown username (from your buttondown.com/USERNAME URL). Empty = not configured. */
  buttondownUsername: string;
  /** Master switch: keep false until you are ready to accept live signups */
  enabled: boolean;
}

/* ── Safe defaults ────────────────────────────────────────────────────────── */

const defaultFeatures: FeatureSettings = {
  maintenanceMode: false,
  defaultAccent: "forest",
  backlinks: true,
  tableOfContents: true,
  linkPreviews: true,
  searchPage: true,
  researchGraph: true,
  contentMaturityBadges: true,
  copyCodeButton: true,
  imageZoom: true,
  documentViewer: true,
  readingProgressBar: false,
  commandPalette: false,
  visualEffects: false,
  chatWidget: false,
  documentRequestModal: true,
};

const defaultSections: SectionSettings = {
  publications: true,
  projects: true,
  writing: true,
  teaching: true,
  cv: true,
  about: true,
  contact: true,
  ventures: true,
  speaking: true,
};

const defaultAppearance: AppearanceSettings = {
  defaultTheme: "light",
  siteStyle: "default",
  loadingAnimation: "none",
  viewTransitions: true,
  scrollReveal: false,
  customCursor: false,
};

const defaultAnalytics: AnalyticsSettings = {
  provider: "plausible",
  domain: "",
  enabled: false,
};

const defaultNewsletter: NewsletterSettings = {
  provider: "buttondown",
  buttondownUsername: "",
  enabled: false,
};

/* ── Merge raw JSON with defaults (handles missing keys gracefully) ───── */

const raw = rawSettings as Partial<SiteSettings>;

export const features: FeatureSettings = {
  ...defaultFeatures,
  ...(raw.features ?? {}),
};

export const sections: SectionSettings = {
  ...defaultSections,
  ...(raw.sections ?? {}),
};

export const appearance: AppearanceSettings = {
  ...defaultAppearance,
  ...(raw.appearance ?? {}),
};

export const analytics: AnalyticsSettings = {
  ...defaultAnalytics,
  ...(raw.analytics ?? {}),
};

export const newsletter: NewsletterSettings = {
  ...defaultNewsletter,
  ...(raw.newsletter ?? {}),
};

/** Full settings object for components that need everything */
export const settings: SiteSettings = {
  features,
  sections,
  appearance,
  analytics,
  newsletter,
};
