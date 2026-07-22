import rawBookshelf from "./bookshelf.json";

/**
 * Bookshelf page content (bookshelf.json), edited in the CMS under
 * Pages -> Bookshelf. The shelf/book structure below is also the fallback,
 * so blank or malformed values can never break the page (the JSON file
 * itself is required at build time).
 */
export interface BookEntry {
  title: string;
  author: string;
  note: string;
}

export interface BookshelfSection {
  label: string;
  books: BookEntry[];
}

interface RawBookshelf {
  subtitle?: unknown;
  footerNote?: unknown;
  sections?: unknown;
}

const DEFAULT_SUBTITLE =
  "Books that have shaped how I think about physics, technology, and building.";
const DEFAULT_FOOTER_NOTE = "Updated as I read.";
const DEFAULT_SECTIONS: BookshelfSection[] = [
  {
    label: "Physics & foundations",
    books: [
      {
        title: "The Principles of Quantum Mechanics",
        author: "P.A.M. Dirac",
        note: "I keep coming back to this. Nobody has stated the framework more cleanly since.",
      },
      {
        title: "Optics",
        author: "Eugene Hecht",
        note: "My most-used reference. If I need to re-derive something in Fourier optics or interferometry, this is where I go.",
      },
      {
        title: "Biomedical Optics",
        author: "Lihong V. Wang & Hsin-i Wu",
        note: "How I learned tissue optics and the photoacoustic effect. Covers light transport with enough rigor to actually build systems from.",
      },
    ],
  },
  {
    label: "Technology & building",
    books: [
      {
        title: "The Hard Thing About Hard Things",
        author: "Ben Horowitz",
        note: "Read this during a rough stretch. Most startup books are about strategy; this one is about what happens when strategy fails.",
      },
      {
        title: "Zero to One",
        author: "Peter Thiel",
        note: "Short and opinionated. The best part is the framing around secrets \u2014 what important truths do few people agree with you on.",
      },
      {
        title: "The Innovator's Dilemma",
        author: "Clayton Christensen",
        note: "Required reading if you want to understand why good companies lose to worse products.",
      },
    ],
  },
  {
    label: "Science & systems",
    books: [
      {
        title: "The Structure of Scientific Revolutions",
        author: "Thomas S. Kuhn",
        note: "Made me realize how much of what we call 'normal science' is puzzle-solving within assumptions nobody questions.",
      },
      {
        title: "G\u00f6del, Escher, Bach",
        author: "Douglas Hofstadter",
        note: "Changed how I think about self-reference and formal systems. Dense and worth rereading.",
      },
      {
        title: "The Emperor's New Mind",
        author: "Roger Penrose",
        note: "Penrose arguing that consciousness is non-computable. I don't fully agree, but the argument is worth wrestling with.",
      },
    ],
  },
  {
    label: "History & biography",
    books: [
      {
        title: "Surely You're Joking, Mr. Feynman!",
        author: "Richard Feynman",
        note: "The reason I got into physics.",
      },
      {
        title: "The Making of the Atomic Bomb",
        author: "Richard Rhodes",
        note: "The best science history book I've read. Shows how theoretical physics became the most consequential engineering project in history.",
      },
      {
        title: "Elon Musk",
        author: "Walter Isaacson",
        note: "Complicated person, useful case study for thinking about deep-tech at scale.",
      },
    ],
  },
];

/** Keep a present-but-blank string (it hides the element); fall back otherwise. */
function optionalStr(value: unknown, fallback: string): string {
  return typeof value === "string" ? value.trim() : fallback;
}

/** Trimmed non-empty string or the fallback. */
function str(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function normalizeBooks(value: unknown): BookEntry[] {
  if (!Array.isArray(value)) return [];
  return (value as unknown[])
    .map((item) => {
      const o = (item ?? {}) as { title?: unknown; author?: unknown; note?: unknown };
      return {
        title: typeof o.title === "string" ? o.title.trim() : "",
        author: typeof o.author === "string" ? o.author.trim() : "",
        note: typeof o.note === "string" ? o.note.trim() : "",
      };
    })
    .filter((b) => b.title.length > 0);
}

function normalizeSections(value: unknown): BookshelfSection[] {
  if (!Array.isArray(value)) return DEFAULT_SECTIONS;
  const valid = (value as unknown[])
    .map((item) => {
      const o = (item ?? {}) as { label?: unknown; books?: unknown };
      return {
        label: typeof o.label === "string" ? o.label.trim() : "",
        books: normalizeBooks(o.books),
      };
    })
    .filter((s) => s.label.length > 0 && s.books.length > 0);
  return valid.length > 0 ? valid : DEFAULT_SECTIONS;
}

const raw = rawBookshelf as RawBookshelf;

export const subtitle: string = str(raw.subtitle, DEFAULT_SUBTITLE);
/** Blank hides the footer note. */
export const footerNote: string = optionalStr(raw.footerNote, DEFAULT_FOOTER_NOTE);
export const sections: BookshelfSection[] = normalizeSections(raw.sections);
