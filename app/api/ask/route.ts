import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";
import { getProfileContext, profile } from "@/app/lib/profile";

export const runtime = "nodejs";

const model = process.env.OPENAI_MODEL || "gpt-5.5";

const portfolioLookup = tool({
  name: "lookup_portfolio",
  description:
    "Look up authoritative portfolio information by topic. Use this before answering questions about David.",
  parameters: z.object({
    topic: z
      .enum(["overview", "projects", "experience", "skills", "contact"])
      .describe("The portfolio area to retrieve."),
  }),
  async execute({ topic }) {
    return getProfileContext(topic);
  },
});

const portfolioAgent = new Agent({
  name: "Portfolio Agent",
  model,
  instructions: [
    `You answer questions for visitors to ${profile.name}'s personal website.`,
    "Be concise, warm, and specific. Use first person only when you are quoting or summarizing David's profile; otherwise refer to him by name.",
    "Use the lookup_portfolio tool for factual questions about projects, skills, experience, contact, or resume details.",
    "Do not invent facts. If the profile data is incomplete, say what is known and suggest what David should add.",
    "For recruiters, emphasize fit, impact, technical depth, and concrete next steps.",
  ].join(" "),
  tools: [portfolioLookup],
});

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function fallbackAnswer(question: string) {
  const lower = question.toLowerCase();

  if (lower.includes("project")) {
    return getProfileContext("projects");
  }

  if (lower.includes("experience") || lower.includes("work")) {
    return getProfileContext("experience");
  }

  if (lower.includes("skill") || lower.includes("stack")) {
    return getProfileContext("skills");
  }

  if (lower.includes("contact") || lower.includes("email")) {
    return getProfileContext("contact");
  }

  return `${getProfileContext("overview")}\n\nI can answer more once OPENAI_API_KEY is configured. Try asking about projects, experience, skills, or contact.`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      question?: string;
      messages?: ChatMessage[];
    };

    const question = body.question?.trim();
    if (!question) {
      return Response.json(
        { error: "Ask a question first." },
        { status: 400 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return Response.json({
        answer: fallbackAnswer(question),
        mode: "local-fallback",
      });
    }

    const recentMessages = (body.messages || [])
      .slice(-8)
      .map((message) => `${message.role}: ${message.content}`)
      .join("\n");

    const prompt = [
      "Recent terminal transcript:",
      recentMessages || "(none)",
      "",
      `Visitor question: ${question}`,
    ].join("\n");

    const result = await run(portfolioAgent, prompt);

    return Response.json({
      answer: result.finalOutput,
      mode: "openai-agent",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error:
          "The portfolio agent hit an error. Check your server logs and API key.",
      },
      { status: 500 },
    );
  }
}
