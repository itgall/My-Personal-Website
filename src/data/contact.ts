import rawContact from "./contact.json";

/**
 * Contact page content (contact.json), edited in the CMS under
 * Pages -> Contact. The email address and profile links come from the
 * site-wide identity source in src/data/meta.ts; only the prose lives here.
 * Every value falls back to the wording below, so blank or malformed values
 * can never break the page (the JSON file itself is required at build time).
 */
interface RawContact {
  metaDescription?: unknown;
  intro?: unknown;
  roleLine?: unknown;
  availability?: unknown;
}

const DEFAULT_META_DESCRIPTION =
  "Get in touch with Isaac Gallegos. Email, LinkedIn, GitHub, and ORCID.";
const DEFAULT_INTRO = "The best way to reach me is by email.";
const DEFAULT_ROLE_LINE =
  "Doctoral Researcher \u00b7 University of Colorado Boulder";
const DEFAULT_AVAILABILITY = "I'll do my best to get back to you quickly.";

/** Keep a present-but-blank string (it hides the element); fall back otherwise. */
function optionalStr(value: unknown, fallback: string): string {
  return typeof value === "string" ? value.trim() : fallback;
}

/** Trimmed non-empty string or the fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

const raw = rawContact as RawContact;

export const metaDescription: string = str(raw.metaDescription, DEFAULT_META_DESCRIPTION);
export const intro: string = str(raw.intro, DEFAULT_INTRO);
/** Blank hides the line. */
export const roleLine: string = optionalStr(raw.roleLine, DEFAULT_ROLE_LINE);
/** Blank hides the line. */
export const availability: string = optionalStr(raw.availability, DEFAULT_AVAILABILITY);
