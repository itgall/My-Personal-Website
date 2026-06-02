import rawHomepage from "./homepage.json";

const DEFAULT_PROFILE_IMAGE = "/images/profile-v2.jpg";

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

interface RawHomepage { profileImage?: string; profileFocal?: string; }

const raw = rawHomepage as RawHomepage;

export const profileImage: string =
  raw.profileImage?.trim() || DEFAULT_PROFILE_IMAGE;

export const profileFocal: FocalPosition = normalizeFocal(raw.profileFocal);
