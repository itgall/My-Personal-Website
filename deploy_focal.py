#!/usr/bin/env python3
"""
Focal-point system -- one-shot, idempotent installer.
Safe to run more than once: every change checks before acting and prints
OK (changed) / SKIP (already present) / FAIL (anchor missing -> repo diverged,
nothing clobbered). Run from the repo root.
"""
import json, os, sys

BT = chr(96)  # backtick -- built this way so heredocs never mangle template literals
results = []

def record(status, desc):
    results.append((status, desc))
    print(f"  [{status:4}] {desc}")

def edit(path, old, new, marker, desc):
    """Idempotent single find/replace. marker proves the change is already in."""
    if not os.path.exists(path):
        record("FAIL", f"{desc} -- file not found: {path}"); return
    text = open(path, encoding="utf-8").read()
    if marker in text:
        record("SKIP", desc); return
    n = text.count(old)
    if n == 0:
        record("FAIL", f"{desc} -- anchor not found (repo diverged?)"); return
    if n > 1:
        record("FAIL", f"{desc} -- anchor not unique ({n}x); not editing"); return
    open(path, "w", encoding="utf-8").write(text.replace(old, new, 1))
    record("OK", desc)

def write_code_file(path, marker, base_anchor, new_content, desc):
    """Guarded whole-file write for small pure-code files. Writes only if the
    focal marker is absent AND the expected base anchor is present (proves the
    file is the version we expect). Refuses to clobber a diverged file."""
    if not os.path.exists(path):
        record("FAIL", f"{desc} -- file not found: {path}"); return
    text = open(path, encoding="utf-8").read()
    if marker in text:
        record("SKIP", desc); return
    if base_anchor not in text:
        record("FAIL", f"{desc} -- base anchor missing (repo diverged); not clobbering"); return
    open(path, "w", encoding="utf-8").write(new_content)
    record("OK", desc)

print("=" * 64)
print("FOCAL-POINT SYSTEM INSTALLER")
print("=" * 64)

# -- 1. src/data/homepage.json  (load-modify-save: preserves your image) --
p = "src/data/homepage.json"
try:
    d = json.load(open(p, encoding="utf-8"))
    if "profileFocal" in d:
        record("SKIP", "homepage.json: profileFocal")
    else:
        d["profileFocal"] = "top"
        json.dump(d, open(p, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
        open(p, "a", encoding="utf-8").write("\n")
        record("OK", "homepage.json: added profileFocal=top (image preserved)")
except Exception as e:
    record("FAIL", f"homepage.json -- {e}")

# -- 2. src/data/homepage-gallery.json  (load-modify-save per tile) --
p = "src/data/homepage-gallery.json"
try:
    d = json.load(open(p, encoding="utf-8"))
    added = []
    for tile in ("travel", "caving", "languages", "reading"):
        if isinstance(d.get(tile), dict) and "focal" not in d[tile]:
            d[tile]["focal"] = "center"
            added.append(tile)
    if added:
        json.dump(d, open(p, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
        open(p, "a", encoding="utf-8").write("\n")
        record("OK", f"homepage-gallery.json: added focal to {', '.join(added)} (images preserved)")
    else:
        record("SKIP", "homepage-gallery.json: all tiles already have focal")
except Exception as e:
    record("FAIL", f"homepage-gallery.json -- {e}")

# -- 3. src/data/homepage.ts  (guarded whole-file: pure code, not CMS-edited) --
HOMEPAGE_TS = '''import rawHomepage from "./homepage.json";

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
'''
write_code_file("src/data/homepage.ts",
                marker="export function normalizeFocal",
                base_anchor="raw.profileImage?.trim() || DEFAULT_PROFILE_IMAGE",
                new_content=HOMEPAGE_TS,
                desc="homepage.ts: FOCAL_POSITIONS + normalizeFocal + profileFocal")

# -- 4. src/data/homepage-gallery.ts  (guarded whole-file) --
GALLERY_TS = '''import rawGallery from "./homepage-gallery.json";
import { normalizeFocal, type FocalPosition } from "./homepage";

export type GallerySectionId = "travel" | "caving" | "languages" | "reading";

interface RawTile { label?: string; caption?: string; image?: string; focal?: string; }

export interface GalleryTile {
  id: GallerySectionId;
  label: string;
  caption: string;
  image: string;
  focal: FocalPosition;
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
    focal: normalizeFocal(override.focal),
    href: `/misc/#${id}`,
    gradient: preset.gradient,
  };
});
'''
write_code_file("src/data/homepage-gallery.ts",
                marker="normalizeFocal(override.focal)",
                base_anchor="export const galleryTiles",
                new_content=GALLERY_TS,
                desc="homepage-gallery.ts: import normalizeFocal + focal field")

# -- 5. src/pages/index.astro  (2 targeted edits) --
edit("src/pages/index.astro",
     old='import { profileImage } from "@data/homepage";',
     new='import { profileImage, profileFocal } from "@data/homepage";',
     marker="profileImage, profileFocal",
     desc="index.astro: import profileFocal")

edit("src/pages/index.astro",
     old='          class="hero-photo shrink-0"\n        />',
     new='          class="hero-photo shrink-0"\n          style={' + BT + 'object-position: ${profileFocal}' + BT + '}\n        />',
     marker="object-position: ${profileFocal}",
     desc="index.astro: hero img object-position")

# -- 6. src/components/MiscGallery.astro  (1 edit) --
mg_old = 'style={item.image ? ' + BT + "background-image: url('${item.image}')" + BT + ' : item.gradient}'
mg_new = 'style={item.image ? ' + BT + "background-image: url('${item.image}'); background-position: ${item.focal}" + BT + ' : item.gradient}'
edit("src/components/MiscGallery.astro",
     old=mg_old, new=mg_new,
     marker="background-position: ${item.focal}",
     desc="MiscGallery.astro: tile background-position")

# -- 7. src/content.config.ts  (add heroFocal to misc schema) --
cc_old = '''    heroCaption: z.string().optional(),
    tags: tagsField,
    order: z.number().default(0),
    published: z.boolean().default(true),
  }),
});

export const collections = {'''
cc_new = '''    heroCaption: z.string().optional(),
    heroFocal: z
      .enum([
        "top left",
        "top",
        "top right",
        "left",
        "center",
        "right",
        "bottom left",
        "bottom",
        "bottom right",
      ])
      .default("center"),
    tags: tagsField,
    order: z.number().default(0),
    published: z.boolean().default(true),
  }),
});

export const collections = {'''
edit("src/content.config.ts", old=cc_old, new=cc_new,
     marker="heroFocal: z", desc="content.config.ts: misc heroFocal enum")

# -- 8. src/components/MiscEntryCard.astro  (2 edits) --
edit("src/components/MiscEntryCard.astro",
     old="const { title, location, summary, heroImage, heroCaption } = entry.data;",
     new="const { title, location, summary, heroImage, heroCaption, heroFocal } = entry.data;",
     marker="heroCaption, heroFocal } = entry.data;",
     desc="MiscEntryCard.astro: destructure heroFocal")

mec_old = '<img src={heroImage} alt={heroCaption || title} loading="lazy" decoding="async" />'
mec_new = '<img src={heroImage} alt={heroCaption || title} loading="lazy" decoding="async" style={' + BT + 'object-position: ${heroFocal}' + BT + '} />'
edit("src/components/MiscEntryCard.astro",
     old=mec_old, new=mec_new,
     marker='loading="lazy" decoding="async" style=',
     desc="MiscEntryCard.astro: thumbnail object-position")

# -- 9. src/pages/misc/[entry].astro  (2 edits; literal brackets handled by Python) --
ENTRY = "src/pages/misc/[entry].astro"
edit(ENTRY,
     old="const { title, section, location, heroImage, heroCaption } = entry.data;",
     new="const { title, section, location, heroImage, heroCaption, heroFocal } = entry.data;",
     marker="heroCaption, heroFocal } = entry.data;",
     desc="[entry].astro: destructure heroFocal")

ent_old = '<img src={heroImage} alt={heroCaption || title} loading="eager" decoding="async" />'
ent_new = '<img src={heroImage} alt={heroCaption || title} loading="eager" decoding="async" style={' + BT + 'object-position: ${heroFocal}' + BT + '} />'
edit(ENTRY, old=ent_old, new=ent_new,
     marker='loading="eager" decoding="async" style=',
     desc="[entry].astro: hero object-position")

# -- 10. public/admin/config.yml  (line inserter: 6 focal selects) --
CFG = "public/admin/config.yml"
OPTIONS = [
    ("Top Left", "top left"), ("Top", "top"), ("Top Right", "top right"),
    ("Left", "left"), ("Center", "center"), ("Right", "right"),
    ("Bottom Left", "bottom left"), ("Bottom", "bottom"), ("Bottom Right", "bottom right"),
]
CFG_TARGETS = [
    ('name: profileImage, widget: image', "profileFocal", "Profile Photo Framing", "top"),
    ('name: image, widget: image, required: false, hint: "Leave blank to use the default gradient."',
     "focal", "Tile Image Framing", "center"),
    ('name: heroImage, widget: image, required: false }', "heroFocal", "Hero Image Framing", "center"),
]
def _bindent(line): s = line.rstrip("\n"); return len(s) - len(s.lstrip(" "))
def _block(n, name, label, default):
    b, k, o = " " * n, " " * (n + 2), " " * (n + 4)
    out = [f'{b}- label: "{label}"\n', f'{k}name: {name}\n', f'{k}widget: select\n',
           f'{k}default: "{default}"\n', f'{k}options:\n']
    for lab, val in OPTIONS:
        out.append(f'{o}- {{ label: "{lab}", value: "{val}" }}\n')
    out.append(f'{k}hint: "Which part of the image stays in frame when it is cropped to fit."\n')
    return out
def _present(lines, i, n, label):
    j = i + 1
    while j < len(lines) and lines[j].strip() == "":
        j += 1
    return j < len(lines) and lines[j].rstrip("\n") == f'{" " * n}- label: "{label}"'

if not os.path.exists(CFG):
    record("FAIL", "config.yml -- file not found")
else:
    lines = open(CFG, encoding="utf-8").readlines()
    out, added, skipped = [], {}, {}
    for _, name, _, _ in CFG_TARGETS:
        added[name] = 0; skipped[name] = 0
    i = 0
    while i < len(lines):
        line = lines[i]; out.append(line)
        for sub, fname, label, default in CFG_TARGETS:
            if sub in line:
                n = _bindent(line)
                if _present(lines, i, n, label):
                    skipped[fname] += 1
                else:
                    out.extend(_block(n, fname, label, default)); added[fname] += 1
                break
        i += 1
    open(CFG, "w", encoding="utf-8").writelines(out)
    EXPECT = {"profileFocal": 1, "focal": 4, "heroFocal": 1}
    for name, exp in EXPECT.items():
        tot = added[name] + skipped[name]
        st = "OK" if tot == exp and added[name] else ("SKIP" if tot == exp else "FAIL")
        record(st, f"config.yml: {name} ({added[name]} added, {skipped[name]} present, expect {exp})")

print("=" * 64)
fails = [d for s, d in results if s == "FAIL"]
print(f"SUMMARY: {sum(1 for s,_ in results if s=='OK')} changed, "
      f"{sum(1 for s,_ in results if s=='SKIP')} already present, {len(fails)} failed")
print("OVERALL:", "PASS" if not fails else "FAIL -- review the FAIL lines above")
print("=" * 64)
sys.exit(1 if fails else 0)
