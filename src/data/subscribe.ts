import rawSubscribe from "./subscribe.json";

/**
 * Subscribe page content (subscribe.json), edited in the CMS under
 * Pages -> Subscribe. The publication domain drives the embed and the
 * direct-subscribe fallback link, so moving the newsletter is a one-field
 * change. Every value falls back to the wording below, so blank or malformed
 * values can never break the page (the JSON file itself is required at
 * build time).
 */
interface RawSubscribe {
  metaDescription?: unknown;
  subtitle?: unknown;
  publication?: unknown;
  whatToExpect?: unknown;
}

const DEFAULT_META_DESCRIPTION =
  "Subscribe to Isaac Gallegos's newsletter. Photonics, quantum sensing, optics, and whatever I'm reading or building.";
const DEFAULT_SUBTITLE =
  "Occasional notes on photonics, quantum sensing, optics, and whatever I'm reading or building.";
const DEFAULT_PUBLICATION = "isaactgallegos.substack.com";
const DEFAULT_WHAT_TO_EXPECT =
  "Papers I'm reading, code I'm writing, things I'm building in the lab, and sometimes personal essays. Short and infrequent. No spam. Unsubscribe in one click.";

/** Trimmed non-empty string or the fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

/** Bare domain: tolerate a pasted URL by stripping protocol and slashes. */
function domain(value: unknown, fallback: string): string {
  const cleaned = str(value, fallback)
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
  return cleaned.length > 0 ? cleaned : fallback;
}

const raw = rawSubscribe as RawSubscribe;

export const metaDescription: string = str(raw.metaDescription, DEFAULT_META_DESCRIPTION);
export const subtitle: string = str(raw.subtitle, DEFAULT_SUBTITLE);
export const publication: string = domain(raw.publication, DEFAULT_PUBLICATION);
export const whatToExpect: string = str(raw.whatToExpect, DEFAULT_WHAT_TO_EXPECT);
