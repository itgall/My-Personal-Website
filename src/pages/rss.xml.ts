/**
 * rss.xml.ts — RSS feed generator.
 *
 * Generates an RSS 2.0 feed from all published writing (essays and notes).
 */
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { siteMetadata } from "@data/meta";

export async function GET(context: APIContext) {
  const entries = await getCollection("writing", ({ data }: { data: { published: boolean } }) => data.published);

  const sorted = [...entries].sort(
    (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
      b.data.date.getTime() - a.data.date.getTime(),
  );

  return rss({
    title: siteMetadata.title,
    description: siteMetadata.description,
    site: context.site?.toString() ?? siteMetadata.siteUrl,
    items: sorted.map((entry: { id: string; data: { title: string; date: Date; description: string; tags: string[] } }) => ({
      title: entry.data.title,
      pubDate: entry.data.date,
      description: entry.data.description,
      link: `/writing/${entry.id}/`,
      categories: entry.data.tags,
    })),
    customData: `<language>${siteMetadata.language}</language>`,
  });
}
