/**
 * og/[...slug].png.ts — Static OG image endpoint.
 *
 * Generates a 1200×630 PNG for every content page at build time.
 * Images are served at /og/{slug}.png and referenced in <meta> tags.
 *
 * Coverage:
 *   - /og/writing/{id}.png     — essays and notes
 *   - /og/projects/{id}.png    — research projects
 *   - /og/podcast/{id}.png     — podcast episodes
 *   - /og/ventures/{id}.png    — ventures
 *   - /og/index.png            — homepage
 *
 * Each page type gets a distinct visual treatment (badge color, label)
 * while sharing the same layout structure.
 */
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "@utils/og-image";
import { formatDate } from "@utils/dates";

interface OgEntry {
  slug: string;
  title: string;
  type: string;
  subtitle?: string;
  tags?: string[];
  /** Astro's getStaticPaths props require an index signature. */
  [key: string]: unknown;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const entries: OgEntry[] = [];

  /* Homepage */
  entries.push({
    slug: "index",
    title: "Isaac Gallegos",
    type: "page",
    subtitle: "Doctoral Researcher · University of Colorado Boulder",
  });

  /* Writing (essays + notes) */
  const writing = await getCollection("writing", ({ data }: { data: { published: boolean } }) => data.published);
  for (const entry of writing) {
    entries.push({
      slug: `writing/${entry.id}`,
      title: entry.data.title,
      type: entry.data.kind === "essay" ? "post" : "note",
      subtitle:
        entry.data.kind === "essay"
          ? `${formatDate(entry.data.date)} · essay`
          : `${entry.data.maturity} · ${formatDate(entry.data.date)}`,
      tags: entry.data.tags,
    });
  }

  /* Projects */
  const projects = await getCollection("projects", ({ data }: { data: { published: boolean } }) => data.published);
  for (const project of projects) {
    entries.push({
      slug: `projects/${project.id}`,
      title: project.data.title,
      type: "project",
      subtitle: project.data.institution,
      tags: project.data.tags,
    });
  }

  /* Podcast episodes */
  const episodes = await getCollection("podcast", ({ data }: { data: { published: boolean } }) => data.published);
  for (const ep of episodes) {
    const guestNames = ep.data.guests.map((g: { name: string }) => g.name);
    entries.push({
      slug: `podcast/${ep.id}`,
      title: ep.data.title,
      type: "podcast",
      subtitle: guestNames.length > 0
        ? `with ${guestNames.join(", ")}`
        : formatDate(ep.data.date),
      tags: ep.data.tags,
    });
  }

  /* Ventures */
  const ventures = await getCollection("ventures", ({ data }: { data: { published: boolean } }) => data.published);
  for (const venture of ventures) {
    entries.push({
      slug: `ventures/${venture.id}`,
      title: venture.data.title,
      type: "venture",
      subtitle: venture.data.tagline,
      tags: venture.data.tags,
    });
  }

  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: entry,
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { title, type, subtitle, tags } = props as OgEntry;

  const png = await generateOgImage({
    title,
    type: type as "post" | "project" | "note" | "podcast" | "venture" | "page",
    subtitle,
    tags,
  });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
