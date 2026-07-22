/**
 * Navigation Configuration — typed, CMS-editable, three-tier.
 *
 * Primary and More navigation are editable via the CMS admin panel
 * (file collection "Navigation" → src/data/navigation.json).
 * Changes are committed to git and take effect on the next build.
 *
 * Footer navigation and social links are hardcoded here because they
 * change rarely and represent a complete sitemap rather than a curated
 * selection.
 *
 * Architecture:
 *   - primaryNav: top nav bar items (CMS-editable)
 *   - moreNav: overflow/mobile menu items (CMS-editable)
 *   - footerNav: complete site map in footer (hardcoded)
 *   - socialLinks: external profile links (hardcoded)
 */

import rawNav from "./navigation.json";

/* ── Type definitions ─────────────────────────────────────────────────────── */

export interface NavItem {
  /** Display label */
  label: string;
  /** URL path (internal) or full URL (external) */
  href: string;
  /** Optional: highlight as current page when URL matches this regex pattern */
  activeMatch?: string;
  /** Optional: open in new tab */
  external?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  /** Icon identifier for the social link (rendered by Footer component) */
  icon: "github" | "linkedin" | "orcid" | "scholar" | "email" | "rss";
}

interface NavigationData {
  primaryNav: NavItem[];
  moreNav: NavItem[];
}

/* ── Safe defaults (used if navigation.json is missing or malformed) ───── */

const defaultPrimaryNav: NavItem[] = [
  { label: "Research", href: "/projects/", activeMatch: "/projects|/publications" },
  { label: "Publications", href: "/publications/", activeMatch: "/publications" },
  { label: "Writing", href: "/blog/", activeMatch: "/blog" },
  { label: "About", href: "/about/", activeMatch: "/about" },
];

const defaultMoreNav: NavItem[] = [
  { label: "Podcast", href: "/podcast/", activeMatch: "/podcast" },
  { label: "Notes", href: "/notes/", activeMatch: "/notes" },
  { label: "Speaking", href: "/speaking/", activeMatch: "/speaking" },
];

/* ── Merge raw JSON with defaults ─────────────────────────────────────── */

const raw = rawNav as Partial<NavigationData>;

export const primaryNav: NavItem[] =
  Array.isArray(raw.primaryNav) && raw.primaryNav.length > 0
    ? raw.primaryNav
    : defaultPrimaryNav;

export const moreNav: NavItem[] =
  Array.isArray(raw.moreNav) && raw.moreNav.length > 0
    ? raw.moreNav
    : defaultMoreNav;

/* ── Footer navigation (hardcoded — complete sitemap) ─────────────────── */

export const footerNav: NavItem[] = [
  { label: "Research", href: "/projects/" },
  { label: "Publications", href: "/publications/" },
  { label: "Podcast", href: "/podcast/" },
  { label: "Ventures", href: "/ventures/" },
  { label: "Essays", href: "/blog/" },
  { label: "Speaking", href: "/speaking/" },
  { label: "Notes", href: "/notes/" },
  { label: "Teaching", href: "/teaching/" },
  { label: "CV", href: "/documents/gallegos-cv.pdf" },
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Now", href: "/now/" },
  { label: "Uses", href: "/uses/" },
  { label: "Bookshelf", href: "/bookshelf/" },
  { label: "Colophon", href: "/colophon/" },
  { label: "Tags", href: "/tags/" },
  { label: "Search", href: "/search/" },
  { label: "Graph", href: "/graph/" },
  { label: "RSS", href: "/rss.xml", external: true },
];

/* ── Social links (hardcoded — rarely change) ─────────────────────────── */

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/itgall", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/isaactgallegos", icon: "linkedin" },
  { label: "ORCID", href: "https://orcid.org/0009-0007-9290-6289", icon: "orcid" },
  { label: "Email", href: "mailto:itgall@mit.edu", icon: "email" },
  { label: "RSS Feed", href: "/rss.xml", icon: "rss" },
];
