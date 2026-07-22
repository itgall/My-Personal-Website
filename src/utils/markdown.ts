import { Marked } from "marked";

/**
 * Markdown renderers for small CMS-editable text blocks (page sections,
 * colophon prose, the About bio). Content collections go through Astro's
 * own pipeline; this is only for strings stored in src/data/*.json.
 *
 * External links open in a new tab with rel="noopener noreferrer" to match
 * the site's hand-written markup. Internal links are left alone. Input is
 * the site author's own CMS content, so no sanitizer is applied.
 */
const marked = new Marked({
  renderer: {
    link(token) {
      const text = this.parser.parseInline(token.tokens);
      const title = token.title ? ` title="${token.title}"` : "";
      const external = /^https?:\/\//.test(token.href);
      const attrs = external ? ` target="_blank" rel="noopener noreferrer"` : "";
      return `<a href="${token.href}"${title}${attrs}>${text}</a>`;
    },
  },
});

/** Render a markdown string to an HTML fragment (paragraphs, lists, ...). */
export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false });
}

/**
 * Render a single line/paragraph of markdown WITHOUT the surrounding <p>,
 * for text that lives inside an already-styled element.
 */
export function renderInlineMarkdown(md: string): string {
  return marked.parseInline(md, { async: false });
}
