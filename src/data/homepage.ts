import rawHomepage from "./homepage.json";

const DEFAULT_PROFILE_IMAGE = "/images/profile-v2.jpg";

/**
 * Default homepage prose. These mirror the wording previously hardcoded in
 * src/pages/index.astro and act as a safe fallback whenever the matching field
 * in homepage.json is missing.
 */
const DEFAULT_BIO =
  "I'm a physics PhD student at the University of Colorado Boulder, working on quantum photonics, neuromorphic computing, and photonic integrated circuits. Before Boulder, from 2025 to 2026, I was a research engineer at the Wellman Center for Photomedicine (Harvard Medical School and MGH), building swept-source interferometric systems and the inverse models that turn broadband measurements into physical quantities. I got into optics at Colorado School of Mines, building solid-state lasers, measuring a Bell-inequality violation with entangled photons, and putting a photon-counting circuit on an FPGA. Outside the lab I travel, play neoclassical piano, learn languages, and climb.";

const DEFAULT_CURRENTLY =
  "finishing a laser safety calculator for tissue exposure limits, and reading about topology and differential geometry.";

const DEFAULT_RESEARCH_INTERESTS =
  "Right now my work centers on quantum photonics, neuromorphic computing, and photonic integrated circuits. Around that I'm drawn to quantum information and quantum networks, and to many-body and statistical physics. Single-photon detection, nonlinear optics, and laser physics are where I started, and I keep coming back to them.";

/**
 * The nine valid CSS object-position / background-position keyword pairs.
 * These strings ARE valid CSS values -- no translation layer needed.
 * Shared across the homepage profile photo, the homepage gallery tiles,
 * and the misc collection (which imports normalizeFocal from here).
 */
export const FOCAL_POSITIONS = [
  "top left",
  "top",
  "top right",
  "left",
  "center",
  "right",
  "bottom left",
  "bottom",
  "bottom right",
] as const;

export type FocalPosition = (typeof FOCAL_POSITIONS)[number];

/**
 * Validate an arbitrary value against the nine focal positions.
 * Trims whitespace, checks membership, falls back to "center" on
 * anything unrecognized (undefined, empty, typo, wrong type).
 */
export function normalizeFocal(value: unknown): FocalPosition {
  if (typeof value === "string") {
    const trimmed = value.trim() as FocalPosition;
    if ((FOCAL_POSITIONS as readonly string[]).includes(trimmed)) {
      return trimmed;
    }
  }
  return "center";
}

interface RawHomepage {
  profileImage?: string;
  profileFocal?: string;
  bio?: string;
  currentlyText?: string;
  researchInterests?: string;
}

const raw = rawHomepage as RawHomepage;

export const profileImage: string =
  raw.profileImage?.trim() || DEFAULT_PROFILE_IMAGE;

export const profileFocal: FocalPosition = normalizeFocal(raw.profileFocal);

/** Hero bio paragraph. Falls back to the default wording when blank. */
export const bio: string = raw.bio?.trim() || DEFAULT_BIO;

/**
 * Optional "Currently:" status text (the label itself is fixed in the
 * template). An explicit empty string hides the line; a missing key falls
 * back to the default wording.
 */
export const currentlyText: string =
  typeof raw.currentlyText === "string" ? raw.currentlyText.trim() : DEFAULT_CURRENTLY;

/** Research-interests paragraph. Falls back to the default wording when blank. */
export const researchInterests: string =
  raw.researchInterests?.trim() || DEFAULT_RESEARCH_INTERESTS;
