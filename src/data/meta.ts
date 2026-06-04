/**
 * Site Metadata — typed, centralized configuration.
 *
 * All personal information is in one place for easy updates. Used by
 * Head.astro, SEO.astro, and JSON-LD structured data generation.
 *
 * ⚠️  Replace every placeholder value below before deploying.
 */

export interface SiteMetadata {
  /** Site title — used in <title> and Open Graph */
  title: string;
  /** Full name of the site owner */
  name: string;
  /** Primary professional role */
  role: string;
  /** Secondary role/affiliation line */
  subtitle: string;
  /** Short bio for meta descriptions (≤160 chars) */
  description: string;
  /** Production URL — no trailing slash */
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
 * Default site metadata — replace ALL placeholder values with your own.
 *
 * This file is the single source of personal information for the entire site.
 * Update every field below before deploying.
 */
export const siteMetadata: SiteMetadata = {
  title: "Isaac Gallegos",
  name: "Isaac Gallegos",
  role: "Research Engineer",
  subtitle: "Wellman Center for Photomedicine · Harvard Medical School",
  description:
    "Isaac Gallegos — Research Engineer at the Wellman Center for Photomedicine, Harvard Medical School. Quantum information, quantum networks and photonic interconnects, and entanglement distribution between spin-based quantum nodes.",
  siteUrl: "https://isaac-gallegos.com",
  image: "/images/profile-v2.jpg",
  language: "en",

  contact: {
    professionalEmail: "itgall@mit.edu",
    personalEmail: "",
    linkedin: "https://linkedin.com/in/isaactgallegos",
    linkedinHandle: "isaactgallegos",
    github: "https://github.com/itgall",
    googleScholar: "https://scholar.google.com/citations?user=gr1ZNUAAAAAJ&hl=en",
    orcid: "0009-0007-9290-6289",
  },

  affiliations: [
    {
      name: "Wellman Center for Photomedicine",
      parent: "Massachusetts General Hospital / Harvard Medical School",
      url: "https://wellman.massgeneral.org",
    },
  ],

  education: [
    {
      degree: "B.S. Engineering Physics, summa cum laude",
      school: "Colorado School of Mines",
      dates: "2021–2024",
    },
  ],

  experience: [
    {
      title: "Research Engineer",
      org: "Wellman Center for Photomedicine, MGH / Harvard Medical School",
      dates: "2025–Present",
      current: true,
    },
  ],

  knowsAbout: [
    "Quantum Information",
    "Quantum Networks",
    "Photonic Interconnects",
    "Entanglement Distribution",
    "Spin-Photon Interfaces",
    "Many-Body Quantum Systems",
    "Optical Coherence Tomography",
    "Laser Physics",
    "Single-Photon Detection",
    "Physics-Constrained Inverse Problems",
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} Isaac Gallegos. All rights reserved.`,
    disclaimer:
      "The views expressed on this site are my own and do not represent those of any affiliated institution.",
  },
} as const;
