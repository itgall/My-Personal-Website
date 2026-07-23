/**
 * chat — Netlify Function for AI chat widget.
 *
 * Proxies chat requests to the Anthropic Messages API with a system prompt
 * providing context about the site owner's research and background.
 *
 * Environment variables (set in Netlify dashboard → Site settings → Environment variables):
 *   ANTHROPIC_API_KEY — Anthropic API key (required to enable chat)
 *
 * Without the API key configured, the function returns a 503 indicating
 * the chat feature is not set up. The chat widget feature flag in
 * settings.json must also be enabled for the frontend to render.
 */

import type { Context } from "@netlify/functions";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

/* ── Abuse guards ─────────────────────────────────────────────────────────
 * This endpoint fronts a paid API key, so it refuses anything that isn't a
 * bounded request from this site's own pages:
 *   1. Origin allowlist — POSTs must carry an Origin matching the production
 *      domain, this site's Netlify domains (previews/branches), or localhost
 *      (netlify dev). Browser fetch() always sends Origin on POST; requests
 *      without one (curl, scripts) are refused.
 *   2. Rate limit — Netlify's platform rateLimit config below, plus this
 *      in-memory fixed-window fallback. The fallback is per-container (it
 *      resets on cold start and doesn't share state across instances), which
 *      is fine: its job is stopping sustained abuse, not exact accounting.
 *   3. Payload bounds — body and per-message size caps, and runtime shape
 *      validation (the TS types above are compile-time only).
 */

const ALLOWED_HOSTS = ["isaac-gallegos.com", "www.isaac-gallegos.com"];
const NETLIFY_SITE_SUFFIX = "mypersonalwebsiteofficial.netlify.app";

function originAllowed(origin: string | null): boolean {
  if (!origin) return false;
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  const host = url.hostname;
  if (host === "localhost" || host === "127.0.0.1") return true;
  if (url.protocol !== "https:") return false;
  return (
    ALLOWED_HOSTS.includes(host) ||
    host === NETLIFY_SITE_SUFFIX ||
    host.endsWith(`--${NETLIFY_SITE_SUFFIX}`)
  );
}

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 20;
const rateBuckets = new Map<string, { count: number; windowStart: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (rateBuckets.size > 10_000) rateBuckets.clear();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.windowStart >= RATE_WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

const MAX_BODY_BYTES = 16_384;
const MAX_MESSAGE_CHARS = 2_000;

function json(status: number, payload: Record<string, unknown>): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const SYSTEM_PROMPT = `You are a helpful AI assistant for an academic researcher's personal website. Your role is to answer questions about the site owner's research, publications, projects, technical background, and professional experience.

Be concise, accurate, and friendly. If you don't know something specific about the site owner, say so honestly rather than making up information. You can discuss general topics in the site owner's research areas, but always clarify when you're speaking generally vs. about their specific work.

Keep responses brief — 2-3 sentences for simple questions, up to a paragraph for complex ones. Use plain language accessible to both experts and general audiences.

The site owner's information:
- Name: Isaac Gallegos
- Role: Physics PhD student at the University of Colorado Boulder, working on quantum photonics, neuromorphic computing, and photonic integrated circuits. Previously (2025–2026) a research engineer at the Wellman Center for Photomedicine, Massachusetts General Hospital / Harvard Medical School.
- Research areas (current): quantum photonics, neuromorphic computing, photonic integrated circuits. Prior work: spectroscopic OCT, intravascular imaging, NIR-II photoacoustic imaging, inverse algorithms, laser physics, entangled-photon experiments.
- Education: B.S. Engineering Physics, summa cum laude, Colorado School of Mines (3.99 GPA)
- Publications: two first-author manuscripts in preparation; several conference posters. See the Publications page.

If asked about topics outside the site owner's expertise, you can provide general knowledge but note that it's not the site owner's area of focus.`;

export default async (request: Request, context: Context) => {
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed." });
  }

  if (!originAllowed(request.headers.get("origin"))) {
    return json(403, { error: "Forbidden." });
  }

  const ip =
    context.ip || request.headers.get("x-forwarded-for") || "unknown";
  if (rateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests. Please slow down." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "60" },
      },
    );
  }

  const apiKey = Netlify.env.get("ANTHROPIC_API_KEY");

  if (!apiKey) {
    return json(503, {
      error:
        "AI chat is not configured. The site owner needs to set the ANTHROPIC_API_KEY environment variable.",
    });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return json(413, { error: "Request too large." });
  }

  let body: RequestBody;
  try {
    body = JSON.parse(rawBody) as RequestBody;
  } catch {
    return json(400, { error: "Invalid request body." });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return json(400, { error: "Messages array is required." });
  }

  const MAX_MESSAGES = 20;
  const trimmedMessages = body.messages.slice(-MAX_MESSAGES);

  for (const message of trimmedMessages) {
    if (
      typeof message !== "object" ||
      message === null ||
      (message.role !== "user" && message.role !== "assistant") ||
      typeof message.content !== "string" ||
      message.content.length === 0 ||
      message.content.length > MAX_MESSAGE_CHARS
    ) {
      return json(400, { error: "Invalid message format." });
    }
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 512,
        system: SYSTEM_PROMPT,
        // Rebuild from validated fields only, dropping any extra properties.
        messages: trimmedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Anthropic API error: ${response.status} ${errorText}`);
      return json(502, {
        error: "AI service temporarily unavailable. Please try again later.",
      });
    }

    const data = (await response.json()) as {
      content: Array<{ type: string; text?: string }>;
    };

    const reply = data.content
      .filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("");

    return json(200, { reply });
  } catch (error) {
    console.error("Chat proxy error:", error);
    return json(500, { error: "Failed to reach AI service. Please try again." });
  }
};

export const config = {
  path: "/api/chat",
  // Platform-level rate limit (applies where the plan supports it; the
  // in-memory limiter above is the always-on fallback).
  rateLimit: {
    windowLimit: 20,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
    action: "rate_limit",
  },
};
