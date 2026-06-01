import rawGallery from "./homepage-gallery.json";

export type GallerySectionId = "travel" | "caving" | "languages" | "reading";

interface RawTile { label?: string; caption?: string; image?: string; }

export interface GalleryTile {
  id: GallerySectionId;
  label: string;
  caption: string;
  image: string;
  href: string;
  gradient: string;
}

const TILE_PRESETS: Record<GallerySectionId, { label: string; caption: string; gradient: string }> = {
  travel: { label: "Travel", caption: "where I've been", gradient: "linear-gradient(150deg, #8ba3bd, #4a6a8a)" },
  caving: { label: "Caving", caption: "underground", gradient: "linear-gradient(150deg, #6b6258, #34302a)" },
  languages: { label: "Languages", caption: "studying Mandarin", gradient: "linear-gradient(150deg, #b08968, #7a5a3a)" },
  reading: { label: "Reading", caption: "topology & geometry", gradient: "linear-gradient(150deg, #b57a7a, #8C1515)" },
};

const ORDER: GallerySectionId[] = ["travel", "caving", "languages", "reading"];
const raw = rawGallery as Partial<Record<GallerySectionId, RawTile>>;

export const galleryTiles: GalleryTile[] = ORDER.map((id) => {
  const preset = TILE_PRESETS[id];
  const override = raw[id] ?? {};
  return {
    id,
    label: override.label?.trim() || preset.label,
    caption: override.caption?.trim() || preset.caption,
    image: override.image?.trim() || "",
    href: `/misc/#${id}`,
    gradient: preset.gradient,
  };
});
