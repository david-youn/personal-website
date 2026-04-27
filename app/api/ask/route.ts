import { Agent, run, tool } from "@openai/agents";
import { z } from "zod";
import {
  agentIdentity,
  getAgentContext,
  type AgentKnowledgeTopic,
} from "@/app/lib/agentKnowledge";

export const runtime = "nodejs";

const model = process.env.OPENAI_MODEL || "gpt-5.5";

const portfolioLookup = tool({
  name: "lookup_portfolio",
  description:
    "Look up authoritative portfolio information by topic. Use this before answering factual or evaluative questions about David.",
  parameters: z.object({
    topic: z
      .enum([
        "overview",
        "projects",
        "experience",
        "skills",
        "contact",
        "career_story",
        "work_style",
        "strengths",
        "project_deep_dives",
        "interview_talking_points",
      ])
      .describe("The portfolio knowledge area to retrieve."),
  }),
  async execute({ topic }) {
    return getAgentContext(topic as AgentKnowledgeTopic);
  },
});

const portfolioAgent = new Agent({
  name: "Portfolio Agent",
  model,
  instructions: [
    agentIdentity,
    "Use the lookup_portfolio tool for factual questions about projects, skills, experience, contact, or resume details.",
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
    return getAgentContext("project_deep_dives");
  }

  if (lower.includes("experience") || lower.includes("work")) {
    return getAgentContext("experience");
  }

  if (lower.includes("skill") || lower.includes("stack")) {
    return getAgentContext("skills");
  }

  if (lower.includes("contact") || lower.includes("email")) {
    return getAgentContext("contact");
  }

  if (lower.includes("strength") || lower.includes("fit")) {
    return getAgentContext("strengths");
  }

  return `${getAgentContext("overview")}\n\nI can answer more once OPENAI_API_KEY is configured. Try asking about projects, experience, strengths, skills, or contact.`;
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
