import rawHomepage from "./homepage.json";

const DEFAULT_PROFILE_IMAGE = "/images/profile-v2.jpg";

interface RawHomepage { profileImage?: string; }

const raw = rawHomepage as RawHomepage;

export const profileImage: string =
  raw.profileImage?.trim() || DEFAULT_PROFILE_IMAGE;
