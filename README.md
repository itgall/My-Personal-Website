# isaac-gallegos.com

Source for my personal and academic website. Built with Astro; the content
lives in Markdown and small data files, and the publications list is generated
from a single BibTeX file.

## Running it locally

Requires Node.js ≥ 22 and npm.

```bash
git clone https://github.com/itgall/My-Personal-Website.git
cd My-Personal-Website
npm install
npm run dev        # dev server with hot reload
npm run build      # static build into dist/ (also builds the Pagefind index)
npm run preview    # preview the production build
```

Other scripts:

| Command | What it does |
|---------|--------------|
| `npm run check` | TypeScript / Astro type checking |
| `npm run format` | Prettier |
| `npm run new:post` / `new:project` / `new:note` | scaffold a content file |
| `npm run refresh:citations` | pull citation counts from Semantic Scholar |

## How it's organized

```
src/
├── content/     # Markdown: writing (essays + notes), news, projects, teaching, misc
├── data/        # identity, CV (cv.yaml), bibliography (.bib), page copy, settings
├── layouts/     # page shells
├── components/  # Astro components (mostly zero-JS)
├── islands/     # the few React components that hydrate on demand
├── pages/       # file-based routes
└── styles/      # global + component CSS
```

Design rules I hold the site to are written down in [`DESIGN.md`](./DESIGN.md).

## Editing content

Most things are plain Markdown with YAML frontmatter under `src/content/`.
All the prose — essays and shorter notes — lives in one `writing` collection
(`src/content/writing/`); each file declares `kind: essay` or `kind: note`
and only appears on the site once `published: true`. Short updates go in
`src/content/news/` — a date, an optional link, and a sentence or two; they
aren't rendered anywhere yet. Identity, CV, page copy, and feature toggles
are small JSON/YAML files under `src/data/`, and publications live in
`src/data/bibliography.bib`. There's also a browser-based editor at `/admin/`
(Sveltia CMS) that commits straight to this repo via the GitHub API — see
`public/admin/config.yml` for how it's wired.

## Stack

Astro 6 (static), Tailwind CSS 4, MDX + Content Collections, Pagefind for
search, KaTeX for math, hosted on Netlify.

## License

MIT — see [LICENSE](./LICENSE).
