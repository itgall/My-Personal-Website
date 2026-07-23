import rawColophon from "./colophon.json";

/**
 * Colophon page content (colophon.json), edited in the CMS under
 * Pages -> Colophon. The body is markdown rendered by src/utils/markdown.ts.
 * Every value falls back to the wording below, so blank or malformed values
 * can never break the page (the JSON file itself is required at build time).
 */
interface RawColophon {
  subtitle?: unknown;
  body?: unknown;
}

const DEFAULT_SUBTITLE = "How this site is built.";
const DEFAULT_BODY =
  "Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com), hosted on [Netlify](https://netlify.com). Everything is statically generated \u2014 no server, no database. The few interactive pieces (search, command palette) use Astro's Islands architecture so they hydrate independently without loading a full framework.\n\nType is Newsreader for display, Source Serif 4 for reading, IBM Plex Sans for interface text, and IBM Plex Mono for code and data. Search is handled by [Pagefind](https://pagefind.app), which builds its index at compile time so there is nothing to load at runtime. Publications are parsed from BibTeX.\n\nThe source is on [GitHub](https://github.com/itgall/My-Personal-Website).";

/** Trimmed non-empty string or the fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

const raw = rawColophon as RawColophon;

export const subtitle: string = str(raw.subtitle, DEFAULT_SUBTITLE);
export const body: string = str(raw.body, DEFAULT_BODY);
