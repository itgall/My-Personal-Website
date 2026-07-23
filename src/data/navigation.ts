/**
 * Navigation Configuration — typed, CMS-editable, three-tier.
 *
 * Primary and More navigation are editable via the CMS admin panel
 * (file collection "Navigation" → src/data/navigation.json).
 * Changes are committed to git and take effect on the next build.
 *
 *   - primaryNav: top nav bar items (CMS-editable)
 *   - moreNav: overflow/mobile menu items (CMS-editable)
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

interface NavigationData {
  primaryNav: NavItem[];
  moreNav: NavItem[];
}

/* ── Safe defaults (used if navigation.json is missing or malformed) ───── */

const defaultPrimaryNav: NavItem[] = [
  { label: "Research", href: "/projects/", activeMatch: "/projects|/publications" },
  { label: "Publications", href: "/publications/", activeMatch: "/publications" },
  { label: "Writing", href: "/writing/", activeMatch: "/writing" },
  { label: "About", href: "/about/", activeMatch: "/about" },
];

const defaultMoreNav: NavItem[] = [
  { label: "Podcast", href: "/podcast/", activeMatch: "/podcast" },
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
