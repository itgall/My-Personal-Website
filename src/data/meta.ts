/**
 * Site Metadata -- typed, centralized configuration.
 *
 * The single source of personal information for the entire site, consumed by
 * Head.astro, SEO.astro, Nav, structured data, RSS, the contact and CV pages,
 * and the homepage hero.
 *
 * Editable identity and contact values (name, role, affiliation, email, social
 * links, ORCID, CV path) are sourced from src/data/identity.json so they can be
 * edited from the CMS without touching code. Every value falls back to a safe
 * canonical default when the JSON is absent or a field is blank, so the site can
 * never render an empty name or a broken link. Import the resolved `identity`
 * object anywhere identity data is displayed so there is exactly one source of
 * truth.
 */
import identityRaw from "./identity.json";

export interface SiteMetadata {
  /** Site title -- used in <title> and Open Graph */
  title: string;
  /** Full name of the site owner */
  name: string;
  /** Primary professional role */
  role: string;
  /** Secondary role/affiliation line */
  subtitle: string;
  /** Short bio for meta descriptions (<=160 chars) */
  description: string;
  /** Production URL -- no trailing slash */
  siteUrl: string;
  /** Path to profile image relative to public/ */
  image: string;
  /** ISO language code */
  language: string;
  /** Contact information */
  contact: {
    professionalEmail: string;
    personalEmail: string;
    linkedin: string;
    linkedinHandle: string;
    github: string;
    googleScholar: string;
    orcid: string;
  };
  /** Institutional affiliations */
  affiliations: Array<{
    name: string;
    parent?: string;
    url?: string;
  }>;
  /** Education */
  education: Array<{
    degree: string;
    school: string;
    dates: string;
  }>;
  /** Professional experience */
  experience: Array<{
    title: string;
    org: string;
    dates: string;
    current: boolean;
  }>;
  /** Research interests for JSON-LD knowsAbout */
  knowsAbout: string[];
  /** Footer text */
  footer: {
    copyright: string;
    disclaimer: string;
  };
}

/**
 * Shape of the CMS-editable identity file. Every field is optional and treated
 * defensively, so a malformed or partial identity.json can never break a build.
 */
interface RawIdentity {
  name?: string;
  role?: string;
  affiliation?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  googleScholar?: string;
  orcid?: string;
  cvPath?: string;
}

/**
 * Canonical fallbacks -- used when identity.json is missing or a field is blank.
 * These mirror the values that were previously hardcoded across the site.
 */
const IDENTITY_FALLBACKS = {
  name: "Isaac Gallegos",
  role: "Doctoral Researcher",
  affiliation: "University of Colorado Boulder",
  email: "Isaac.gallegos@colorado.edu",
  linkedin: "https://linkedin.com/in/isaactgallegos",
  github: "https://github.com/itgall",
  googleScholar: "https://scholar.google.com/citations?user=gr1ZNUAAAAAJ&hl=en",
  orcid: "0009-0007-9290-6289",
  cvPath: "/documents/gallegos-cv.pdf",
} as const;

/** Trim a candidate value; fall back when it is missing, non-string, or empty. */
function field(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

const rawIdentity = identityRaw as RawIdentity;

/**
 * Resolved identity/contact values -- the single source of truth. Import this
 * wherever identity data is displayed (e.g. the homepage hero) instead of
 * hardcoding names, emails, or links.
 */
export const identity = {
  name: field(rawIdentity.name, IDENTITY_FALLBACKS.name),
  role: field(rawIdentity.role, IDENTITY_FALLBACKS.role),
  affiliation: field(rawIdentity.affiliation, IDENTITY_FALLBACKS.affiliation),
  email: field(rawIdentity.email, IDENTITY_FALLBACKS.email),
  linkedin: field(rawIdentity.linkedin, IDENTITY_FALLBACKS.linkedin),
  github: field(rawIdentity.github, IDENTITY_FALLBACKS.github),
  googleScholar: field(rawIdentity.googleScholar, IDENTITY_FALLBACKS.googleScholar),
  orcid: field(rawIdentity.orcid, IDENTITY_FALLBACKS.orcid),
  cvPath: field(rawIdentity.cvPath, IDENTITY_FALLBACKS.cvPath),
};

/**
 * Default site metadata. Editable identity/contact fields are sourced from
 * `identity` above (CMS-editable via src/data/identity.json); the remaining
 * fields are maintained here in code.
 */
export const siteMetadata: SiteMetadata = {
  title: identity.name,
  name: identity.name,
  role: identity.role,
  subtitle: identity.affiliation,
  description:
    "Isaac Gallegos is a physics PhD student at the University of Colorado Boulder, working on quantum photonics, neuromorphic computing, and photonic integrated circuits. Previously a research engineer at the Wellman Center for Photomedicine, Harvard Medical School.",
  siteUrl: "https://isaac-gallegos.com",
  image: "/images/profile-v2.jpg",
  language: "en",

  contact: {
    professionalEmail: identity.email,
    personalEmail: "",
    linkedin: identity.linkedin,
    linkedinHandle: "isaactgallegos",
    github: identity.github,
    googleScholar: identity.googleScholar,
    orcid: identity.orcid,
  },

  affiliations: [
    {
      name: "University of Colorado Boulder",
      url: "https://www.colorado.edu/physics/",
    },
  ],

  education: [
    {
      degree: "B.S. Engineering Physics, summa cum laude",
      school: "Colorado School of Mines",
      dates: "2021\u20132024",
    },
  ],

  experience: [
    {
      title: "Doctoral Researcher",
      org: "University of Colorado Boulder, Department of Physics",
      dates: "2026\u2013Present",
      current: true,
    },
    {
      title: "Research Engineer",
      org: "Wellman Center for Photomedicine, MGH / Harvard Medical School",
      dates: "2025\u20132026",
      current: false,
    },
  ],

  knowsAbout: [
    "Quantum Photonics",
    "Neuromorphic Computing",
    "Photonic Integrated Circuits",
    "Quantum Information",
    "Quantum Networks",
    "Photonic Interconnects",
    "Many-Body Quantum Systems",
    "Optical Coherence Tomography",
    "Laser Physics",
    "Single-Photon Detection",
  ],

  footer: {
    copyright: `\u00a9 ${new Date().getFullYear()} Isaac Gallegos. All rights reserved.`,
    disclaimer:
      "The views expressed on this site are my own and do not represent those of any affiliated institution.",
  },
};
