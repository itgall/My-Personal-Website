/**
 * Navigation Configuration — typed, centralized, three-tier.
 *
 * Three navigation tiers based on UX research:
 *
 *   primaryNav (8 items) — always visible in the nav bar.
 *     Order exploits the serial position effect:
 *     Primacy zone: Research → Publications → Podcast (what I study → publish → communicate)
 *     Bridge:       Ventures → Notes (dual identity + intellectual depth)
 *     Recency zone: CV → About
 *
 *   moreNav (2 items) — accessible via mobile menu and footer.
 *     Essays (renamed from Blog) and Speaking — accessible but
 *     not competing for primary nav slots.
 *
 *   footerNav — complete site map in footer.
 *
 * Note: "Research" displays as the label but routes to /projects/
 * to preserve existing URLs and content collection structure.
 * "Essays" displays as the label but routes to /blog/ for the same reason.
 */

export interface NavItem {
  /** Display label */
  label: string;
  /** URL path (internal) or full URL (external) */
  href: string;
  /** Optional: highlight as current page when URL starts with this path */
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

/**
 * Primary navigation — 5 items displayed in the top nav bar.
 * Order: Research → Writing → CV → Podcast → About
 * Research credibility leads. Writing shows intellectual range.
 * CV carries credentials. Podcast is subordinate but first-class.
 * About holds the narrative (including ventures and contact).
 */
export const primaryNav: NavItem[] = [
  { label: "Research", href: "/projects/", activeMatch: "/projects|/publications" },
  { label: "Writing", href: "/blog/", activeMatch: "/blog" },
  { label: "CV", href: "/cv/", activeMatch: "/cv" },
  { label: "Podcast", href: "/podcast/", activeMatch: "/podcast" },
  { label: "About", href: "/about/", activeMatch: "/about" },
];

/**
 * "More" items — accessible via mobile menu and footer.
 * Notes, Publications (if browsed separately), Speaking.
 */
export const moreNav: NavItem[] = [
  { label: "Publications", href: "/publications/", activeMatch: "/publications" },
  { label: "Notes", href: "/notes/", activeMatch: "/notes" },
  { label: "Speaking", href: "/speaking/", activeMatch: "/speaking" },
];

/**
 * Footer navigation — complete site map.
 * Includes all primary nav items, more nav items, and Contact.
 */
export const footerNav: NavItem[] = [
  { label: "Research", href: "/projects/" },
  { label: "Publications", href: "/publications/" },
  { label: "Podcast", href: "/podcast/" },
  { label: "Ventures", href: "/ventures/" },
  { label: "Essays", href: "/blog/" },
  { label: "Speaking", href: "/speaking/" },
  { label: "Notes", href: "/notes/" },
  { label: "Teaching", href: "/teaching/" },
  { label: "CV", href: "/cv/" },
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

/** Social links — displayed in footer and contact page. */
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/itgall", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/isaactgallegos", icon: "linkedin" },
  { label: "ORCID", href: "https://orcid.org/0009-0007-9290-6289", icon: "orcid" },
  { label: "Email", href: "mailto:itgall@mit.edu", icon: "email" },
  { label: "RSS Feed", href: "/rss.xml", icon: "rss" },
];
