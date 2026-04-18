/**
 * og-image.ts — Build-time OG image generation using Satori + Sharp.
 *
 * Generates 1200×630 PNG images for social sharing (Open Graph / Twitter Card).
 * Each content type gets a distinct visual treatment while sharing a consistent
 * layout structure rooted in the site's Slate & Terracotta design language.
 *
 * Architecture:
 *   1. Satori converts a JSX-like object tree into an SVG string
 *   2. Sharp converts the SVG into an optimized PNG buffer
 *   3. The buffer is returned as the response body from a static endpoint
 *
 * Font loading: Reads .woff files from @fontsource packages at build time.
 * No network requests during build — fonts are bundled in node_modules.
 */

import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/* ── Font loading ────────────────────────────────────────────────────────── */

function loadFont(relativePath: string): ArrayBuffer {
  const absolute = resolve(process.cwd(), relativePath);
  const buffer = readFileSync(absolute);
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

const fonts = [
  {
    name: "Inter",
    data: loadFont(
      "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff",
    ),
    weight: 700 as const,
    style: "normal" as const,
  },
  {
    name: "Inter",
    data: loadFont(
      "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff",
    ),
    weight: 400 as const,
    style: "normal" as const,
  },
  {
    name: "Inter",
    data: loadFont(
      "node_modules/@fontsource/inter/files/inter-latin-600-normal.woff",
    ),
    weight: 600 as const,
    style: "normal" as const,
  },
];

/* ── Color tokens (matching tailwind.css) ────────────────────────────────── */

const colors = {
  bg: "#FDFCFB",
  bgDark: "#1C1E22",
  text: "#36454F",
  muted: "#6B7885",
  accent: "#2b6cb0",
  accentLight: "rgba(43, 108, 176, 0.12)",
  border: "#D5D0CB",
};

/* ── Content type configuration ──────────────────────────────────────────── */

const typeConfig: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  post: { label: "Essay", color: colors.accent, icon: "✦" },
  project: { label: "Research", color: "#4A7C6F", icon: "◈" },
  note: { label: "Note", color: "#5B7BA5", icon: "❋" },
  podcast: { label: "Podcast", color: "#8B6CAF", icon: "◉" },
  venture: { label: "Venture", color: "#C17F3E", icon: "△" },
  publication: { label: "Publication", color: "#4A6FA5", icon: "◇" },
  teaching: { label: "Teaching", color: "#6B8E6B", icon: "▣" },
  page: { label: "", color: colors.accent, icon: "" },
};

/* ── Core rendering function ─────────────────────────────────────────────── */

export interface OgImageOptions {
  title: string;
  /** Content type — determines badge label and color */
  type?: keyof typeof typeConfig;
  /** Optional subtitle (e.g., date, institution, category) */
  subtitle?: string;
  /** Author name — defaults to site owner */
  author?: string;
  /** Site name */
  siteName?: string;
  /** Optional tags to display */
  tags?: string[];
}

/**
 * Generate a 1200×630 PNG OG image buffer.
 *
 * Design structure:
 *   ┌──────────────────────────────────────┐
 *   │  [type badge]                        │
 *   │                                      │
 *   │  Title (Inter 700, large)     │
 *   │                                      │
 *   │  subtitle                            │
 *   │                                      │
 *   │  ──────────────────────              │
 *   │  Author Name   ·   site name        │
 *   │  [tag] [tag] [tag]                   │
 *   └──────────────────────────────────────┘
 */
export async function generateOgImage(
  options: OgImageOptions,
): Promise<Buffer> {
  const {
    title,
    type = "page",
    subtitle,
    author = "Isaac Gallegos",
    siteName = "isaac-gallegos.com",
    tags = [],
  } = options;

  const config = typeConfig[type] ?? typeConfig.page;

  /* Truncate title if too long */
  const displayTitle =
    title.length > 80 ? title.slice(0, 77) + "…" : title;

  /* Limit tags to 4 */
  const displayTags = tags.slice(0, 4);

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 64px",
          backgroundColor: colors.bg,
          fontFamily: "Inter",
          position: "relative",
        },
        children: [
          /* Top accent line */
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "0",
                left: "0",
                right: "0",
                height: "6px",
                backgroundColor: config.color,
              },
            },
          },

          /* Top section: type badge */
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "10px",
              },
              children: config.label
                ? [
                    {
                      type: "span",
                      props: {
                        style: {
                          fontSize: "14px",
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase" as const,
                          color: config.color,
                          backgroundColor: colors.accentLight,
                          padding: "4px 14px",
                          borderRadius: "4px",
                          border: `1px solid ${config.color}33`,
                        },
                        children: `${config.icon}  ${config.label}`,
                      },
                    },
                  ]
                : [],
            },
          },

          /* Middle section: title + subtitle */
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                flex: "1",
                justifyContent: "center",
                gap: "16px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontFamily: "Inter",
                      fontSize: displayTitle.length > 50 ? "38px" : "46px",
                      fontWeight: 700,
                      color: colors.text,
                      lineHeight: "1.15",
                      letterSpacing: "-0.025em",
                    },
                    children: displayTitle,
                  },
                },
                ...(subtitle
                  ? [
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: "18px",
                            color: colors.muted,
                            lineHeight: "1.4",
                          },
                          children: subtitle,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },

          /* Bottom section: divider + author + tags */
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              },
              children: [
                /* Divider */
                {
                  type: "div",
                  props: {
                    style: {
                      width: "100%",
                      height: "1px",
                      backgroundColor: colors.border,
                    },
                  },
                },
                /* Author + site */
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          },
                          children: [
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontSize: "16px",
                                  fontWeight: 600,
                                  color: colors.text,
                                },
                                children: author,
                              },
                            },
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontSize: "16px",
                                  color: colors.border,
                                },
                                children: "·",
                              },
                            },
                            {
                              type: "span",
                              props: {
                                style: {
                                  fontSize: "15px",
                                  color: colors.muted,
                                },
                                children: siteName,
                              },
                            },
                          ],
                        },
                      },
                      /* Tags */
                      ...(displayTags.length > 0
                        ? [
                            {
                              type: "div",
                              props: {
                                style: {
                                  display: "flex",
                                  gap: "8px",
                                },
                                children: displayTags.map((tag) => ({
                                  type: "span",
                                  props: {
                                    style: {
                                      fontSize: "12px",
                                      color: colors.muted,
                                      border: `1px solid ${colors.border}`,
                                      padding: "2px 10px",
                                      borderRadius: "12px",
                                    },
                                    children: tag,
                                  },
                                })),
                              },
                            },
                          ]
                        : []),
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    },
  );

  const png = await sharp(Buffer.from(svg)).png({ quality: 90 }).toBuffer();
  return png;
}
