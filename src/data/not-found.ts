import rawNotFound from "./not-found.json";

/**
 * 404 page content (not-found.json), edited in the CMS under
 * Pages -> 404 Page. Falls back to the wording below, so a blank value can
 * never break the page (the JSON file itself is required at build time).
 */
interface RawNotFound {
  message?: unknown;
}

const DEFAULT_MESSAGE =
  "This page seems to have diffracted away. It may have been moved or removed.";

/** Trimmed non-empty string or the fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

const raw = rawNotFound as RawNotFound;

export const message: string = str(raw.message, DEFAULT_MESSAGE);
