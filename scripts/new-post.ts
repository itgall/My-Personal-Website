/**
 * new-post.ts — Scaffold a new essay with front matter template.
 *
 * Usage: npm run new:post
 * Creates a new .md file in src/content/writing/ with kind: essay.
 */

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import slugify from "slugify";

const title = process.argv[2] || "Untitled Essay";
const slug = slugify(title, { lower: true, strict: true });
const date = new Date().toISOString().split("T")[0];
const filePath = join(process.cwd(), "src", "content", "writing", `${slug}.md`);

const frontMatter = `---
title: "${title}"
kind: essay
date: ${date}
description: ""
tags: []
published: false
---

Write your essay here.
`;

writeFileSync(filePath, frontMatter, "utf-8");
console.log(`Created: src/content/writing/${slug}.md`);
