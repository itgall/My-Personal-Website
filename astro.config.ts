/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * Astro Academic Site — Master Configuration
 *
 * Production-grade academic website template built on Astro 6.
 * Zero JS by default, BibTeX-driven publications, Pagefind search,
 * bidirectional backlinks, research graph.
 *
 * See ARCHITECTURE.md for full documentation of design decisions,
 * feature flags, content authoring guide, and deployment instructions.
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import remarkMath from "remark-math";
import remarkWikilinks from "./src/utils/wikilinks";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

/**
 * Astro 6 master configuration.
 *
 * Tailwind CSS 4 integration: Uses @tailwindcss/vite plugin directly rather than
 * @astrojs/tailwind, which does not yet support Astro 6. The Vite plugin approach
 * is the canonical method for Tailwind CSS 4's CSS-first configuration.
 *
 * Output: Pure static site generation (SSG). No server-side rendering.
 * Every page is pre-rendered at build time for maximum performance and
 * compatibility with Cloudflare Pages' free tier.
 */
export default defineConfig({
  site: "https://isaac-gallegos.com",
  output: "static",

  integrations: [
    /**
     * MDX: Enables embedded React/Svelte components in blog posts.
     * Only posts that import components ship JS; pure Markdown posts remain zero-JS.
     */
    mdx(),

    /**
     * Sitemap: Auto-generates sitemap.xml at build time from all static routes.
     * Excludes admin/CMS pages. entryLimit splits into sub-sitemaps when the
     * site exceeds 1000 pages, enabling per-section monitoring in Google Search
     * Console without manual configuration.
     */
    sitemap({
      filter: (page) => !page.includes("/admin"),
      entryLimit: 1000,
    }),

    /**
     * React: Enables React Islands for interactive components (ThemeToggle,
     * SearchWidget, ResearchGraph, CopyButton, LinkPreview). Each Island
     * hydrates independently — no global React runtime.
     */
    react(),
  ],

  /**
   * Vite configuration: Tailwind CSS 4 via its official Vite plugin.
   * This replaces the @astrojs/tailwind integration which is incompatible with Astro 6.
   */
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    /**
     * Remark plugins: Process Markdown AST before HTML conversion.
     * - remark-math: Parses $...$ (inline) and $$...$$ (display) math delimiters
     *   into math AST nodes.
     */
    remarkPlugins: [remarkMath, remarkWikilinks],

    /**
     * Rehype plugins: Process HTML AST after Markdown conversion.
     *
     * rehype-katex: Renders math nodes to KaTeX HTML at build time.
     * KaTeX outputs native <span> elements which are inherently inline,
     * completely avoiding Tailwind Preflight's svg { display: block }
     * conflict that breaks inline math with SVG-based renderers.
     * KaTeX also produces selectable text and smaller output (~127KB).
     *
     * rehype-slug: Adds id attributes to headings for deep linking.
     * rehype-autolink-headings: Wraps heading text in anchor links.
     *
     * Footnotes: Handled by Astro's built-in GFM support (remark-gfm).
     * No custom plugin needed — standard [^1] syntax produces accessible
     * <sup> reference links and a <section data-footnotes> at the bottom.
     */
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["heading-anchor"],
            ariaLabel: "Link to this section",
          },
        },
      ],
    ],

    /**
     * remarkRehype: Configuration for the remark-to-rehype bridge.
     * footnoteBackContent: Appends VS15 (U+FE0E) to force the ↩ backref
     * arrow to render as a text glyph rather than a colorful emoji.
     */
    remarkRehype: {
      footnoteBackContent: "↩\uFE0E",
    },

    /**
     * Shiki syntax highlighting: Built into Astro, no additional dependency.
     * github-dark-default chosen to complement the dark-first design aesthetic.
     */
    shikiConfig: {
      themes: {
        light: "github-light-default",
        dark: "github-dark-default",
      },
    },
  },

  /**
   * Redirects: Handled by netlify.toml for the production deployment.
   * Netlify's edge-level redirects fire before static file serving,
   * avoiding the generation of unnecessary HTML redirect stub files.
   * See netlify.toml [[redirects]] for /writing/ → /blog/ and
   * /research/ → /publications/ mappings.
   */
});
