# Security

This repository is the source for [isaac-gallegos.com](https://isaac-gallegos.com),
a personal static site (Astro, hosted on Netlify) with two small serverless
functions (`/api/chat`, `/api/document-request`).

## Reporting a vulnerability

If you find a security issue — in the site, the serverless functions, or the
CI/deployment configuration — please email
**Isaac.gallegos@colorado.edu** with a description and, if possible, steps to
reproduce. Please don't open a public issue for security reports.

You can expect an acknowledgment within a few days. There is no bug bounty;
this is a personal site.

## Scope notes

- The site is fully static; no user data is stored server-side.
- `/api/chat` and `/api/document-request` are rate-limited, origin-checked,
  and bound their inputs; secrets live only in Netlify environment variables.
- Dependencies are audited in CI and updated weekly via Dependabot.
