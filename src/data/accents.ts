/**
 * accents.ts — Physics-grounded accent color presets.
 *
 * Each preset derives its accent from a real optical or physical phenomenon:
 *   - Terracotta: iron oxide absorption (warm earth tone, current default)
 *   - Interferometer: near-monochromatic steel blue (vanishing fringe)
 *   - Coherence: deep navy (OCT coherence length, LIGO-adjacent)
 *   - Rayleigh: ~470nm scattered sunlight blue
 *   - Sodium Arc: 589nm D-line amber (spectral calibration)
 *   - Cherenkov: superluminal radiation blue (~480nm)
 *   - Blackbody: ~2800K thermal emission copper
 *   - Second Harmonic: Nd:YAG frequency-doubled 532nm green
 *
 * Architecture:
 *   - Presets applied at build time via blocking script in BaseLayout
 *   - Selected via features.defaultAccent in settings.json
 *   - CSS custom properties set on <html> before first paint (no FOUC)
 *   - All values WCAG 2.2 AA compliant (≥4.5:1 text, ≥3:1 UI)
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
    id: "terracotta",
    label: "Terracotta",
    swatch: "#E2725B",
    light: {
      accent: "#E2725B",
      accentBg: "rgba(226, 114, 91, 0.07)",
      accentBorder: "rgba(226, 114, 91, 0.25)",
      link: "#B8533C",
      linkHover: "#953F2C",
      selection: "rgba(226, 114, 91, 0.20)",
      print: "#953F2C",
    },
    dark: {
      accent: "#E8907C",
      accentBg: "rgba(232, 144, 124, 0.10)",
      accentBorder: "rgba(232, 144, 124, 0.25)",
      link: "#E8907C",
      linkHover: "#F0A898",
      selection: "rgba(232, 144, 124, 0.20)",
    },
  },
  {
    id: "interferometer",
    label: "Interferometer",
    swatch: "#8facc8",
    light: {
      accent: "#4b6a88",
      accentBg: "rgba(75, 106, 136, 0.07)",
      accentBorder: "rgba(75, 106, 136, 0.25)",
      link: "#4b6a88",
      linkHover: "#36516b",
      selection: "rgba(75, 106, 136, 0.18)",
      print: "#36516b",
    },
    dark: {
      accent: "#8facc8",
      accentBg: "rgba(143, 172, 200, 0.10)",
      accentBorder: "rgba(143, 172, 200, 0.25)",
      link: "#8facc8",
      linkHover: "#afc5da",
      selection: "rgba(143, 172, 200, 0.18)",
    },
  },
  {
    id: "coherence",
    label: "Coherence",
    swatch: "#5b8db8",
    light: {
      accent: "#1e3a5f",
      accentBg: "rgba(30, 58, 95, 0.06)",
      accentBorder: "rgba(30, 58, 95, 0.22)",
      link: "#1e3a5f",
      linkHover: "#142842",
      selection: "rgba(30, 58, 95, 0.16)",
      print: "#142842",
    },
    dark: {
      accent: "#5b8db8",
      accentBg: "rgba(91, 141, 184, 0.10)",
      accentBorder: "rgba(91, 141, 184, 0.25)",
      link: "#5b8db8",
      linkHover: "#7faece",
      selection: "rgba(91, 141, 184, 0.18)",
    },
  },
  {
    id: "rayleigh",
    label: "Rayleigh",
    swatch: "#5b9bd5",
    light: {
      accent: "#2b6cb0",
      accentBg: "rgba(43, 108, 176, 0.06)",
      accentBorder: "rgba(43, 108, 176, 0.22)",
      link: "#2b6cb0",
      linkHover: "#1d4f85",
      selection: "rgba(43, 108, 176, 0.16)",
      print: "#1d4f85",
    },
    dark: {
      accent: "#5b9bd5",
      accentBg: "rgba(91, 155, 213, 0.10)",
      accentBorder: "rgba(91, 155, 213, 0.25)",
      link: "#5b9bd5",
      linkHover: "#82b4e2",
      selection: "rgba(91, 155, 213, 0.18)",
    },
  },
  {
    id: "sodium-arc",
    label: "Sodium Arc",
    swatch: "#f59e0b",
    light: {
      accent: "#b45309",
      accentBg: "rgba(180, 83, 9, 0.06)",
      accentBorder: "rgba(180, 83, 9, 0.22)",
      link: "#b45309",
      linkHover: "#92400e",
      selection: "rgba(180, 83, 9, 0.15)",
      print: "#92400e",
    },
    dark: {
      accent: "#f59e0b",
      accentBg: "rgba(245, 158, 11, 0.08)",
      accentBorder: "rgba(245, 158, 11, 0.22)",
      link: "#f59e0b",
      linkHover: "#fbbf24",
      selection: "rgba(245, 158, 11, 0.18)",
    },
  },
  {
    id: "cherenkov",
    label: "Cherenkov",
    swatch: "#3d9bff",
    light: {
      accent: "#0c6fd4",
      accentBg: "rgba(12, 111, 212, 0.06)",
      accentBorder: "rgba(12, 111, 212, 0.22)",
      link: "#0c6fd4",
      linkHover: "#0856a5",
      selection: "rgba(12, 111, 212, 0.16)",
      print: "#0856a5",
    },
    dark: {
      accent: "#3d9bff",
      accentBg: "rgba(61, 155, 255, 0.10)",
      accentBorder: "rgba(61, 155, 255, 0.25)",
      link: "#3d9bff",
      linkHover: "#6db5ff",
      selection: "rgba(61, 155, 255, 0.18)",
    },
  },
  {
    id: "blackbody",
    label: "Blackbody",
    swatch: "#e08c4a",
    light: {
      accent: "#b45e2a",
      accentBg: "rgba(180, 94, 42, 0.06)",
      accentBorder: "rgba(180, 94, 42, 0.22)",
      link: "#b45e2a",
      linkHover: "#8d481e",
      selection: "rgba(180, 94, 42, 0.15)",
      print: "#8d481e",
    },
    dark: {
      accent: "#e08c4a",
      accentBg: "rgba(224, 140, 74, 0.10)",
      accentBorder: "rgba(224, 140, 74, 0.25)",
      link: "#e08c4a",
      linkHover: "#eaa56e",
      selection: "rgba(224, 140, 74, 0.18)",
    },
  },
  {
    id: "second-harmonic",
    label: "Second Harmonic",
    swatch: "#4caf6e",
    light: {
      accent: "#2b7a44",
      accentBg: "rgba(43, 122, 68, 0.06)",
      accentBorder: "rgba(43, 122, 68, 0.22)",
      link: "#2b7a44",
      linkHover: "#1e5a32",
      selection: "rgba(43, 122, 68, 0.15)",
      print: "#1e5a32",
    },
    dark: {
      accent: "#4caf6e",
      accentBg: "rgba(76, 175, 110, 0.10)",
      accentBorder: "rgba(76, 175, 110, 0.25)",
      link: "#4caf6e",
      linkHover: "#6ec48a",
      selection: "rgba(76, 175, 110, 0.18)",
    },
  },
];

export const defaultAccentId = "rayleigh";

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
