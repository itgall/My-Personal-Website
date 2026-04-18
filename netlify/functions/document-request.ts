/**
 * document-request — Netlify Function for CV/resume access requests.
 *
 * Receives form submissions from the DocumentRequest modal and:
 *   1. Validates the request (name, email required)
 *   2. Logs the request to function logs (viewable in Netlify dashboard)
 *   3. Optionally sends an email notification to the site owner
 *
 * Environment variables (set in Netlify dashboard → Site settings → Environment variables):
 *   NOTIFICATION_EMAIL — (optional) site owner's email for request notifications
 *   SENDGRID_API_KEY  — (optional) SendGrid API key for sending notification emails
 *
 * Without email configured, requests are logged to the Netlify Functions
 * console (viewable in the Netlify dashboard under Functions → Logs).
 */

import type { Context } from "@netlify/functions";

interface RequestBody {
  name: string;
  email: string;
  affiliation?: string;
  reason?: string;
  document: string;
}

export default async (request: Request, context: Context) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!body.name?.trim()) {
    return new Response(JSON.stringify({ error: "Name is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return new Response(
      JSON.stringify({ error: "A valid email address is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const docRequest = {
    name: body.name.trim(),
    email: body.email.trim(),
    affiliation: body.affiliation?.trim() ?? "",
    reason: body.reason?.trim() ?? "",
    document: body.document ?? "resume",
    timestamp: new Date().toISOString(),
    ip: request.headers.get("x-forwarded-for") ?? "unknown",
  };

  console.log("[document-request]", JSON.stringify(docRequest));

  const notifyEmail = Netlify.env.get("NOTIFICATION_EMAIL");
  const sendgridKey = Netlify.env.get("SENDGRID_API_KEY");

  if (notifyEmail && sendgridKey) {
    try {
      const emailBody = {
        personalizations: [{ to: [{ email: notifyEmail }] }],
        from: { email: `noreply@${new URL(request.url).hostname}` },
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
              `IP: ${docRequest.ip}`,
            ].join("\n"),
          },
        ],
      };

      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sendgridKey}`,
        },
        body: JSON.stringify(emailBody),
      });
    } catch (error) {
      console.error("[document-request] Email notification failed:", error);
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = {
  path: "/api/document-request",
};
