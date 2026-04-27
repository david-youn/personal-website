import { getProfileContext, profile, type ProfileTopic } from "@/app/lib/profile";

export type AgentKnowledgeTopic =
  | ProfileTopic
  | "career_story"
  | "work_style"
  | "strengths"
  | "project_deep_dives"
  | "interview_talking_points";

export const agentKnowledge: Record<
  Exclude<AgentKnowledgeTopic, ProfileTopic>,
  string
> = {
  career_story: [
    "David is a backend software engineer whose strongest experience is in production services, APIs, distributed systems, monitoring, and data processing.",
    "At AWS, he worked on large-scale services where reliability, cross-region behavior, observability, and operational ownership mattered. His experience includes building distributed REST APIs, maintaining dashboards for APIs handling 100K+ requests per minute, participating in on-call, and resolving production incidents.",
    "At ActX, he worked closer to the product and customer domain, shipping healthcare backend and full-stack features, integrating with EHR systems, modernizing legacy Rails apps, and building Python data jobs for 50M+ patient records.",
    "A strong framing for recruiters: David combines big-tech production discipline with smaller-company product ownership and healthcare domain complexity.",
  ].join("\n"),
  work_style: [
    "David is comfortable owning backend work from design through production: API design, implementation, testing, deployment, monitoring, and incident follow-up.",
    "He has experience collaborating with non-engineering stakeholders, including geneticists and domain experts, and translating domain workflows into backend tools.",
    "He should be represented as practical, systems-minded, reliable under production pressure, and able to operate in ambiguous environments.",
  ].join("\n"),
  strengths: [
    "Backend systems: Java, Spring Boot, REST APIs, distributed service design, reliability, and operational monitoring.",
    "Production ownership: on-call experience, root cause analysis, incident reports, dashboards, retry logic, and error-rate reduction.",
    "Data processing: Python jobs, large record backfills, validation workflows, S3-backed data access, MongoDB, MySQL, and DynamoDB exposure.",
    "Modernization: legacy Ruby on Rails upgrades, dependency cleanup, and reducing long-term maintenance risk.",
  ].join("\n"),
  project_deep_dives: [
    "Portfolio Agent Terminal: browser-based terminal portfolio built with Next.js, OpenAI Agents SDK, and Vercel. The purpose is to let recruiters ask interactive questions about David's background while demonstrating practical AI-agent deployment experience.",
    "Add future project case studies here. For each project, include: problem, users, your role, architecture, hard technical decisions, tradeoffs, impact metrics, links, and what you would improve next.",
  ].join("\n"),
  interview_talking_points: [
    "For backend roles, emphasize AWS production experience, distributed REST APIs, monitoring at high request volume, on-call ownership, and performance/reliability work.",
    "For product-minded teams, emphasize ActX healthcare integrations, collaboration with domain experts, and shipping 20+ production features across backend and full-stack surfaces.",
    "For data-heavy roles, emphasize Python jobs that backfilled and validated 50M+ patient records, plus experience with S3, MongoDB, MySQL, and DynamoDB.",
    "If asked about growth areas, a good honest framing is that David is actively deepening modern AI product development and agent deployment through this portfolio project.",
  ].join("\n"),
};

export function getAgentContext(topic?: AgentKnowledgeTopic) {
  if (!topic) {
    return [
      getProfileContext(),
      agentKnowledge.career_story,
      agentKnowledge.work_style,
      agentKnowledge.strengths,
      agentKnowledge.project_deep_dives,
      agentKnowledge.interview_talking_points,
    ].join("\n\n");
  }

  if (topic in agentKnowledge) {
    return agentKnowledge[topic as Exclude<AgentKnowledgeTopic, ProfileTopic>];
  }

  return getProfileContext(topic as ProfileTopic);
}

export const agentIdentity = [
  `You answer questions for visitors to ${profile.name}'s personal website.`,
  "Your audience is often recruiters, hiring managers, engineers, and people deciding whether to interview David.",
  "Be concise, direct, and specific. Prefer concrete evidence from David's background over generic praise.",
  "Do not invent facts, employers, metrics, projects, links, degrees, or dates. If the knowledge base is incomplete, say what is known and what David should add.",
  "Refer to David in third person unless a visitor explicitly asks for first-person wording David could use.",
].join(" ");
