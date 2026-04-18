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

const SYSTEM_PROMPT = `You are a helpful AI assistant for an academic researcher's personal website. Your role is to answer questions about the site owner's research, publications, projects, technical background, and professional experience.

Be concise, accurate, and friendly. If you don't know something specific about the site owner, say so honestly rather than making up information. You can discuss general topics in the site owner's research areas, but always clarify when you're speaking generally vs. about their specific work.

Keep responses brief — 2-3 sentences for simple questions, up to a paragraph for complex ones. Use plain language accessible to both experts and general audiences.

The site owner's information:
- Name: Isaac Gallegos
- Role: Research Engineer at the Wellman Center for Photomedicine, Massachusetts General Hospital / Harvard Medical School
- Research areas: Spectroscopic OCT, intravascular imaging, NIR-II photoacoustic imaging, inverse algorithms, computational optical modeling, quantum sensing
- Education: B.S. Engineering Physics, Colorado School of Mines (3.99 GPA)
- Key publications: Currently developing spectroscopic techniques in OCT; pre-PhD researcher

If asked about topics outside the site owner's expertise, you can provide general knowledge but note that it's not the site owner's area of focus.`;

export default async (request: Request, context: Context) => {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed." }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = Netlify.env.get("ANTHROPIC_API_KEY");

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          "AI chat is not configured. The site owner needs to set the ANTHROPIC_API_KEY environment variable.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
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

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Messages array is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const MAX_MESSAGES = 20;
  const trimmedMessages = body.messages.slice(-MAX_MESSAGES);

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
        messages: trimmedMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Anthropic API error: ${response.status} ${errorText}`);
      return new Response(
        JSON.stringify({
          error: "AI service temporarily unavailable. Please try again later.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    const data = (await response.json()) as {
      content: Array<{ type: string; text?: string }>;
    };

    const reply = data.content
      .filter((block) => block.type === "text")
      .map((block) => block.text ?? "")
      .join("");

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chat proxy error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to reach AI service. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const config = {
  path: "/api/chat",
};
