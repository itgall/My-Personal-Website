/**
 * Content Collections Configuration — Astro 6 format.
 *
 * This file defines the data layer for the entire site. Every content type
 * has a Zod schema that validates frontmatter at build time. If a field is
 * wrong, misspelled, or missing, the build fails with a clear error — not
 * a silent runtime bug on the live site.
 *
 * Architecture principles:
 *   1. Shared fragments for consistency (dateField, tagsField, crossRefFields)
 *   2. Cross-referencing fields on every collection that needs them
 *   3. Safe defaults (.default([]) or .optional()) so new fields never break
 *      existing content files
 *   4. Zod enums for controlled vocabularies (categories, statuses, types)
 *   5. Free-form tags with lowercase/trim/dedup enforcement
 *
 * Content types:
 *   - posts:      Blog articles (technical notes, theses, essays, dispatches, build logs)
 *   - projects:   Research projects with structured or freeform content modes
 *   - teaching:   Courses taught or TA'd
 *   - notes:      Digital garden notes with maturity levels (seedling/budding/evergreen)
 *   - ventures:   Company ideas that grow out of the research
 *   - speaking:   Talks, panels, and media appearances
 *   - podcast:    Video-first podcast episodes with show notes and transcripts
 *
 * Publications are NOT a Content Collection — they're parsed from
 * bibliography.bib at build time via src/utils/bibtex.ts.
 *
 * Cross-referencing:
 *   Collections link to each other via slug arrays (relatedProjects,
 *   relatedPosts, relatedEpisodes) and BibTeX citation keys
 *   (relatedPublications). These fields power "Related content" sections
 *   and bidirectional navigation. A reverse index is built at page
 *   generation time to surface incoming links automatically.
 */

import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* Shared schema fragments.
 *
 * Reusable field definitions that keep the collections consistent. Change a
 * fragment here and every collection using it updates. */

/** ISO date string or Date object, coerced to Date at build time. */
const dateField = z
  .union([z.string(), z.date()])
  .transform((val) => new Date(val));

/** Tag list — lowercase, trimmed, deduplicated at build time. */
const tagsField = z
  .array(z.string().trim().toLowerCase())
  .default([])
  .transform((tags) => [...new Set(tags)]);

/**
 * Cross-referencing slug fields.
 * Each field is an array of slug strings referencing entries in another
 * collection. All default to empty arrays so they're always safe to
 * iterate over in templates without null checks.
 */
const relatedProjectsField = z.array(z.string()).default([]);
const relatedPostsField = z.array(z.string()).default([]);
const relatedEpisodesField = z.array(z.string()).default([]);
const relatedPublicationsField = z.array(z.string()).default([]);
const relatedNotesField = z.array(z.string()).default([]);

/** URL field that accepts valid URLs or empty strings (for optional URLs). */
const optionalUrlField = z.string().url().optional().or(z.literal(""));

/* Posts (essays).
 *
 * Blog articles — technical notes, theses, essays, dispatches, build logs.
 * Categories use a Zod enum. Cross-references: relatedProjects (projects
 * discussed), relatedPublications (papers cited), relatedEpisodes. */

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/posts" }),
  schema: z.object({
    title: z.string().min(1, "Post title is required"),
    date: dateField,
    updatedDate: dateField.optional(),
    category: z
      .enum(["technical", "thesis", "essay", "dispatch", "build-log"])
      .default("technical"),
    description: z.string().min(1, "Post description is required for SEO"),
    tags: tagsField,
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
    ogImage: z.string().optional(),
    readingTime: z.string().optional(),
    /* Cross-references */
    relatedProjects: relatedProjectsField,
    relatedPublications: relatedPublicationsField,
    relatedEpisodes: relatedEpisodesField,
  }),
});

/* Projects (research).
 *
 * Research projects in structured or freeform content modes. status
 * (active/completed/archived) drives listing-page filtering; endDate,
 * description, and the relatedPosts/relatedEpisodes cross-refs are optional. */

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/projects" }),
  schema: z.object({
    title: z.string().min(1, "Project title is required"),
    number: z.string().default("99"),
    date: dateField,
    endDate: dateField.optional(),
    status: z
      .enum(["active", "completed", "archived"])
      .default("active"),
    description: z.string().default(""),
    tags: tagsField,
    highlightTag: z.string().optional(),
    institution: z.string().min(1, "Institution is required"),
    contentMode: z.enum(["structured", "freeform"]).default("structured"),
    problem: z.string().optional(),
    outcomes: z.array(z.string()).default([]),
    impact: z.string().optional(),
    heroImage: z.string().optional(),
    heroCaption: z.string().optional(),
    videoUrl: optionalUrlField,
    interactiveUrl: z.string().optional(),
    interactiveHeight: z.number().default(500),
    gallery: z
      .array(
        z.object({
          image: z.string(),
          caption: z.string().default(""),
        }),
      )
      .default([]),
    techStack: z.array(z.string()).default([]),
    linkUrl: z.string().optional(),
    linkText: z.string().default("View presentation →"),
    githubUrl: optionalUrlField,
    published: z.boolean().default(true),
    featured: z.boolean().default(false),
    /* Cross-references */
    relatedPublications: relatedPublicationsField,
    relatedPosts: relatedPostsField,
    relatedEpisodes: relatedEpisodesField,
  }),
});

/* Teaching.
 *
 * Courses taught or TA'd. No cross-referencing — teaching entries rarely
 * link to other content types. */

const teaching = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/teaching" }),
  schema: z.object({
    title: z.string().min(1, "Course title is required"),
    courseCode: z.string().optional(),
    role: z.enum(["instructor", "ta", "guest-lecturer"]).default("ta"),
    institution: z.string().min(1, "Institution is required"),
    semester: z.string().min(1, "Semester is required (e.g., 'Fall 2025')"),
    year: z.number(),
    description: z.string().default(""),
    tags: tagsField,
    syllabusUrl: optionalUrlField,
    published: z.boolean().default(true),
  }),
});

/* Notes (digital garden).
 *
 * Notes with maturity levels. They connect two ways: relatedNotes (curated
 * in frontmatter) and backlinks (auto-discovered from [[wikilink]] parsing
 * at build time). relatedProjects and relatedPublications add research
 * context. */

const notes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/notes" }),
  schema: z.object({
    title: z.string().min(1, "Note title is required"),
    date: dateField,
    updatedDate: dateField.optional(),
    maturity: z.enum(["seedling", "budding", "evergreen"]).default("seedling"),
    description: z.string().default(""),
    tags: tagsField,
    backlinks: z.array(z.string()).default([]),
    published: z.boolean().default(true),
    /* Cross-references */
    relatedNotes: relatedNotesField,
    relatedProjects: relatedProjectsField,
    relatedPublications: relatedPublicationsField,
  }),
});

/* Ventures.
 *
 * Company ideas that grow out of the research. Each can link back to the
 * projects, publications, essays, and episodes it came from. */

const ventures = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/ventures" }),
  schema: z.object({
    title: z.string().min(1, "Venture name is required"),
    tagline: z.string().min(1, "One-line description is required"),
    role: z.string().default("Founder"),
    status: z
      .enum(["active", "in-development", "stealth"])
      .default("in-development"),
    date: dateField,
    tags: tagsField,
    problem: z.string().optional(),
    researchFoundation: z.string().optional(),
    techStack: z.array(z.string()).default([]),
    websiteUrl: optionalUrlField,
    heroImage: z.string().optional(),
    published: z.boolean().default(true),
    /* Cross-references */
    relatedPublications: relatedPublicationsField,
    relatedProjects: relatedProjectsField,
    relatedPosts: relatedPostsField,
    relatedEpisodes: relatedEpisodesField,
  }),
});

/* ── Speaking Collection ─────────────────────────────────────────────────── */

const speaking = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/speaking" }),
  schema: z.object({
    title: z.string().min(1, "Talk title is required"),
    event: z.string().min(1, "Event/venue name is required"),
    location: z.string().optional(),
    date: dateField,
    type: z
      .enum(["talk", "panel", "keynote", "guest-lecture", "podcast", "media"])
      .default("talk"),
    description: z.string().default(""),
    tags: tagsField,
    videoUrl: optionalUrlField,
    slidesUrl: optionalUrlField,
    eventUrl: optionalUrlField,
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    /* Cross-references */
    relatedProjects: relatedProjectsField,
    relatedEpisodes: relatedEpisodesField,
  }),
});

/* Podcast.
 *
 * Video-first episodes, each with its own page: embedded video, show notes,
 * chapter markers, guest info, and transcript. episodeType is a controlled
 * vocabulary for filtering; chapters are timestamped markers. Schema.org
 * PodcastEpisode structured data is generated from these fields. */

const podcast = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/podcast" }),
  schema: z.object({
    title: z.string().min(1, "Episode title is required"),
    episodeNumber: z.number().int().positive().optional(),
    season: z.number().int().positive().optional(),
    date: dateField,
    description: z.string().min(1, "Episode description is required for SEO"),
    episodeType: z
      .enum(["solo", "interview", "panel", "journal-club", "ama", "case-study"])
      .default("interview"),
    tags: tagsField,
    guests: z
      .array(
        z.object({
          name: z.string(),
          title: z.string().optional(),
          url: z.string().url().optional(),
        }),
      )
      .default([]),
    chapters: z
      .array(
        z.object({
          time: z.string(),
          title: z.string(),
        }),
      )
      .default([]),
    youtubeUrl: optionalUrlField,
    spotifyUrl: optionalUrlField,
    appleUrl: optionalUrlField,
    duration: z.string().optional(),
    hasTranscript: z.boolean().default(false),
    featured: z.boolean().default(false),
    published: z.boolean().default(false),
    /* Cross-references */
    relatedProjects: relatedProjectsField,
    relatedPublications: relatedPublicationsField,
    relatedPosts: relatedPostsField,
  }),
});

/* Transcripts.
 *
 * Full episode transcripts, each at /podcast/transcripts/{slug}/. Linked
 * from the episode page when hasTranscript is true. */

const transcripts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/transcripts" }),
  schema: z.object({
    title: z.string().min(1, "Transcript title is required"),
    /** Slug of the corresponding podcast episode (must match episode filename) */
    episodeSlug: z.string().min(1, "Episode slug is required"),
    date: dateField,
    published: z.boolean().default(false),
  }),
});

/* Misc, then the collection exports. */

const misc = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/misc" }),
  schema: z.object({
    title: z.string().min(1, "Entry title is required"),
    section: z.enum(["travel", "caving", "languages", "reading"]),
    date: dateField,
    location: z.string().optional(),
    summary: z.string().default(""),
    heroImage: z.string().optional(),
    heroCaption: z.string().optional(),
    heroFocal: z
      .enum([
        "top left",
        "top",
        "top right",
        "left",
        "center",
        "right",
        "bottom left",
        "bottom",
        "bottom right",
      ])
      .default("center"),
    tags: tagsField,
    order: z.number().default(0),
    published: z.boolean().default(true),
  }),
});

export const collections = {
  posts,
  projects,
  teaching,
  notes,
  ventures,
  speaking,
  podcast,
  transcripts,
  misc,
};
