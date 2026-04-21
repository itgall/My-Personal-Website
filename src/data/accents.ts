/**
 * accents.ts — Accent color presets.
 *
 * Three custom accents (405nm violet, ink teal, plain web blue)
 * plus university brand colors for target PhD programs.
 * All values WCAG 2.2 AA compliant (≥4.5:1) on both
 * light (#FDFCFB) and dark (#1C1E22) backgrounds.
 */

export interface AccentPreset {
  id: string;
  label: string;
  swatch: string;
  light: {
    accent: string;
    accentBg: string;
    accentBorder: string;
    link: string;
    linkHover: string;
    selection: string;
    print: string;
  };
  dark: {
    accent: string;
    accentBg: string;
    accentBorder: string;
    link: string;
    linkHover: string;
    selection: string;
  };
}

export const accentPresets: AccentPreset[] = [
  {
    id: "violet",
    label: "405nm Violet",
    swatch: "#A587CC",
    light: {
      accent: "#6B4C9A",
      accentBg: "rgba(107, 76, 154, 0.06)",
      accentBorder: "rgba(107, 76, 154, 0.22)",
      link: "#6B4C9A",
      linkHover: "#523878",
      selection: "rgba(107, 76, 154, 0.16)",
      print: "#523878",
    },
    dark: {
      accent: "#A587CC",
      accentBg: "rgba(165, 135, 204, 0.10)",
      accentBorder: "rgba(165, 135, 204, 0.25)",
      link: "#A587CC",
      linkHover: "#BCA1DA",
      selection: "rgba(165, 135, 204, 0.18)",
    },
  },
  {
    id: "ink-teal",
    label: "Ink Teal",
    swatch: "#7FB3D3",
    light: {
      accent: "#1B5E7B",
      accentBg: "rgba(27, 94, 123, 0.06)",
      accentBorder: "rgba(27, 94, 123, 0.22)",
      link: "#1B5E7B",
      linkHover: "#124455",
      selection: "rgba(27, 94, 123, 0.16)",
      print: "#124455",
    },
    dark: {
      accent: "#7FB3D3",
      accentBg: "rgba(127, 179, 211, 0.10)",
      accentBorder: "rgba(127, 179, 211, 0.25)",
      link: "#7FB3D3",
      linkHover: "#9DC7DE",
      selection: "rgba(127, 179, 211, 0.18)",
    },
  },
  {
    id: "web-blue",
    label: "Web Blue",
    swatch: "#6CB4EE",
    light: {
      accent: "#0066CC",
      accentBg: "rgba(0, 102, 204, 0.06)",
      accentBorder: "rgba(0, 102, 204, 0.22)",
      link: "#0066CC",
      linkHover: "#004D99",
      selection: "rgba(0, 102, 204, 0.16)",
      print: "#004D99",
    },
    dark: {
      accent: "#6CB4EE",
      accentBg: "rgba(108, 180, 238, 0.10)",
      accentBorder: "rgba(108, 180, 238, 0.25)",
      link: "#6CB4EE",
      linkHover: "#8DC8F4",
      selection: "rgba(108, 180, 238, 0.18)",
    },
  },
  {
    id: "harvard",
    label: "Harvard",
    swatch: "#E8808E",
    light: {
      accent: "#A51C30",
      accentBg: "rgba(165, 28, 48, 0.06)",
      accentBorder: "rgba(165, 28, 48, 0.22)",
      link: "#A51C30",
      linkHover: "#7C1524",
      selection: "rgba(165, 28, 48, 0.16)",
      print: "#7C1524",
    },
    dark: {
      accent: "#E8808E",
      accentBg: "rgba(232, 128, 142, 0.10)",
      accentBorder: "rgba(232, 128, 142, 0.25)",
      link: "#E8808E",
      linkHover: "#EFA0AB",
      selection: "rgba(232, 128, 142, 0.18)",
    },
  },
  {
    id: "mit",
    label: "MIT",
    swatch: "#E67D8C",
    light: {
      accent: "#A31F34",
      accentBg: "rgba(163, 31, 52, 0.06)",
      accentBorder: "rgba(163, 31, 52, 0.22)",
      link: "#A31F34",
      linkHover: "#7A1727",
      selection: "rgba(163, 31, 52, 0.16)",
      print: "#7A1727",
    },
    dark: {
      accent: "#E67D8C",
      accentBg: "rgba(230, 125, 140, 0.10)",
      accentBorder: "rgba(230, 125, 140, 0.25)",
      link: "#E67D8C",
      linkHover: "#ED9DA8",
      selection: "rgba(230, 125, 140, 0.18)",
    },
  },
  {
    id: "stanford",
    label: "Stanford",
    swatch: "#D97A7A",
    light: {
      accent: "#8C1515",
      accentBg: "rgba(140, 21, 21, 0.06)",
      accentBorder: "rgba(140, 21, 21, 0.22)",
      link: "#8C1515",
      linkHover: "#6A0F0F",
      selection: "rgba(140, 21, 21, 0.16)",
      print: "#6A0F0F",
    },
    dark: {
      accent: "#D97A7A",
      accentBg: "rgba(217, 122, 122, 0.10)",
      accentBorder: "rgba(217, 122, 122, 0.25)",
      link: "#D97A7A",
      linkHover: "#E39B9B",
      selection: "rgba(217, 122, 122, 0.18)",
    },
  },
  {
    id: "yale",
    label: "Yale",
    swatch: "#6BA3D6",
    light: {
      accent: "#00356B",
      accentBg: "rgba(0, 53, 107, 0.06)",
      accentBorder: "rgba(0, 53, 107, 0.22)",
      link: "#00356B",
      linkHover: "#00264D",
      selection: "rgba(0, 53, 107, 0.16)",
      print: "#00264D",
    },
    dark: {
      accent: "#6BA3D6",
      accentBg: "rgba(107, 163, 214, 0.10)",
      accentBorder: "rgba(107, 163, 214, 0.25)",
      link: "#6BA3D6",
      linkHover: "#8BB8E0",
      selection: "rgba(107, 163, 214, 0.18)",
    },
  },
  {
    id: "princeton",
    label: "Princeton",
    swatch: "#F5A623",
    light: {
      accent: "#A05000",
      accentBg: "rgba(160, 80, 0, 0.06)",
      accentBorder: "rgba(160, 80, 0, 0.22)",
      link: "#A05000",
      linkHover: "#7A3D00",
      selection: "rgba(160, 80, 0, 0.16)",
      print: "#7A3D00",
    },
    dark: {
      accent: "#F5A623",
      accentBg: "rgba(245, 166, 35, 0.10)",
      accentBorder: "rgba(245, 166, 35, 0.25)",
      link: "#F5A623",
      linkHover: "#F7B84D",
      selection: "rgba(245, 166, 35, 0.18)",
    },
  },
  {
    id: "caltech",
    label: "Caltech",
    swatch: "#F5943A",
    light: {
      accent: "#B34E08",
      accentBg: "rgba(179, 78, 8, 0.06)",
      accentBorder: "rgba(179, 78, 8, 0.22)",
      link: "#B34E08",
      linkHover: "#8A3C06",
      selection: "rgba(179, 78, 8, 0.16)",
      print: "#8A3C06",
    },
    dark: {
      accent: "#F5943A",
      accentBg: "rgba(245, 148, 58, 0.10)",
      accentBorder: "rgba(245, 148, 58, 0.25)",
      link: "#F5943A",
      linkHover: "#F7AD66",
      selection: "rgba(245, 148, 58, 0.18)",
    },
  },
  {
    id: "dartmouth",
    label: "Dartmouth",
    swatch: "#5DBF8E",
    light: {
      accent: "#00693E",
      accentBg: "rgba(0, 105, 62, 0.06)",
      accentBorder: "rgba(0, 105, 62, 0.22)",
      link: "#00693E",
      linkHover: "#004D2D",
      selection: "rgba(0, 105, 62, 0.16)",
      print: "#004D2D",
    },
    dark: {
      accent: "#5DBF8E",
      accentBg: "rgba(93, 191, 142, 0.10)",
      accentBorder: "rgba(93, 191, 142, 0.25)",
      link: "#5DBF8E",
      linkHover: "#7FD0A7",
      selection: "rgba(93, 191, 142, 0.18)",
    },
  },
];

export const defaultAccentId = "violet";

export function getAccentPreset(id: string): AccentPreset {
  return (
    accentPresets.find((p) => p.id === id) ??
    accentPresets.find((p) => p.id === defaultAccentId) ??
    accentPresets[0]
  );
}

export function getAccentCSSProperties(
  preset: AccentPreset,
  mode: "light" | "dark",
): Record<string, string> {
  const colors = mode === "dark" ? preset.dark : preset.light;
  return {
    "--color-accent": colors.accent,
    "--color-accent-bg": colors.accentBg,
    "--color-accent-border": colors.accentBorder,
    "--color-link": colors.link,
    "--color-link-hover": colors.linkHover,
  };
}
