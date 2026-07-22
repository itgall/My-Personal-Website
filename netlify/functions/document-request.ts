/**
 * document-request — Netlify Function for CV/resume access requests.
 *
 * Receives form submissions from the DocumentRequest modal and:
 *   1. Validates and bounds the request (name, email required)
 *   2. Optionally sends an email notification to the site owner
 *   3. Logs the full request ONLY when it would otherwise be lost (email
 *      not configured, or the send failed); routine logs carry no PII and
 *      the client IP is never logged
 *
 * Environment variables (set in Netlify dashboard → Site settings → Environment variables):
 *   NOTIFICATION_EMAIL — (optional) site owner's email for request notifications
 *   SENDGRID_API_KEY  — (optional) SendGrid API key for sending notification emails
 */

import type { Context } from "@netlify/functions";

interface RequestBody {
  name: string;
  email: string;
  affiliation?: string;
  reason?: string;
  document: string;
}

/* ── Abuse guards (same pattern as chat.ts, kept inline because each
 * function bundles independently) ─────────────────────────────────────── */

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
const RATE_LIMIT = 5;
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

const MAX_BODY_BYTES = 8_192;
const FIELD_LIMITS = { name: 200, email: 254, affiliation: 200, reason: 1000 };
const VALID_DOCUMENTS = new Set(["resume", "cv", "both"]);

function json(status: number, payload: Record<string, unknown>): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

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
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "60" },
      },
    );
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

  if (typeof body.name !== "string" || !body.name.trim()) {
    return json(400, { error: "Name is required." });
  }
  if (
    typeof body.email !== "string" ||
    !body.email.trim() ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
  ) {
    return json(400, { error: "A valid email address is required." });
  }
  if (
    body.name.length > FIELD_LIMITS.name ||
    body.email.length > FIELD_LIMITS.email ||
    (typeof body.affiliation === "string" &&
      body.affiliation.length > FIELD_LIMITS.affiliation) ||
    (typeof body.reason === "string" && body.reason.length > FIELD_LIMITS.reason)
  ) {
    return json(400, { error: "One or more fields exceed the allowed length." });
  }

  const docRequest = {
    name: body.name.trim(),
    email: body.email.trim(),
    affiliation:
      typeof body.affiliation === "string" ? body.affiliation.trim() : "",
    reason: typeof body.reason === "string" ? body.reason.trim() : "",
    document: VALID_DOCUMENTS.has(body.document) ? body.document : "resume",
    timestamp: new Date().toISOString(),
  };

  const notifyEmail = Netlify.env.get("NOTIFICATION_EMAIL");
  const sendgridKey = Netlify.env.get("SENDGRID_API_KEY");

  let delivered = false;
  if (notifyEmail && sendgridKey) {
    try {
      const emailBody = {
        personalizations: [{ to: [{ email: notifyEmail }] }],
        from: { email: "noreply@isaac-gallegos.com" },
        subject: `[Document Request] ${docRequest.document} — ${docRequest.name}`,
        content: [
          {
            type: "text/plain",
            value: [
              `New document access request:`,
              ``,
              `Name: ${docRequest.name}`,
              `Email: ${docRequest.email}`,
              `Affiliation: ${docRequest.affiliation || "(not provided)"}`,
              `Reason: ${docRequest.reason || "(not provided)"}`,
              `Document: ${docRequest.document}`,
              `Timestamp: ${docRequest.timestamp}`,
            ].join("\n"),
          },
        ],
      };

      const sendResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sendgridKey}`,
        },
        body: JSON.stringify(emailBody),
      });
      if (sendResponse.ok) {
        delivered = true;
      } else {
        console.error(
          `[document-request] SendGrid rejected the notification: ${sendResponse.status}`,
        );
      }
    } catch (error) {
      console.error("[document-request] Email notification failed:", error);
    }
  }

  if (delivered) {
    // Details reached the owner's inbox — keep the log PII-free.
    console.log(
      `[document-request] delivered document=${docRequest.document} at ${docRequest.timestamp}`,
    );
  } else {
    // No email path — the log is the only record, so keep the details
    // (but never the client IP).
    console.log("[document-request]", JSON.stringify(docRequest));
  }

  return json(200, { success: true });
};

export const config = {
  path: "/api/document-request",
  // Platform-level rate limit (applies where the plan supports it; the
  // in-memory limiter above is the always-on fallback).
  rateLimit: {
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip", "domain"],
    action: "rate_limit",
  },
};
