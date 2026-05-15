import { getProfileContext, profile, type ProfileTopic } from "@/app/lib/profile";

export type AgentKnowledgeTopic =
  | ProfileTopic
  | "career_story"
  | "work_style"
  | "strengths"
  | "project_deep_dives"
  | "work_experience_deep_dives"
  | "personal_interests"
  | "hobbies_outside_work"
  | "values_and_motivations"
  | "website_context"
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
  work_experience_deep_dives: [
    "Add deeper work stories here. Good entries include: the business or user problem, David's role, system architecture, scale, constraints, hard technical choices, collaboration, impact, and what he learned.",
    "Keep this public-safe. Do not include private company internals, confidential architecture, internal service names, customer data, credentials, or anything under NDA.",
  ].join("\n"),
  personal_interests: [
    "No detailed personal-interest context has been added yet.",
    "When David provides context, summarize interests that are appropriate for a public professional website: creative interests, communities, learning goals, side projects, sports, music, volunteering, reading, travel, or other non-work topics he wants visitors to know.",
    "Do not invent hobbies or personal details. If asked before context is added, say that David has not added detailed personal-interest notes yet.",
  ].join("\n"),
  hobbies_outside_work: [
    "No detailed hobby context has been added yet.",
    "When David provides context, include hobbies outside work with enough specificity to sound human but not overshare. Mention why they matter to him when known.",
    "Do not invent hobbies. If asked before context is added, say that David has not added detailed hobby notes yet.",
  ].join("\n"),
  values_and_motivations: [
    "No detailed values-and-motivations context has been added yet.",
    "When David provides context, include what motivates him as an engineer, what kinds of teams he likes, what he values in coworkers, what problems energize him, and what he is trying to grow into next.",
    "Do not invent personal values. If asked before context is added, say that David has not added detailed values notes yet.",
  ].join("\n"),
  website_context: [
    "This website is intended to be both a personal website and a portfolio for software engineering job applications.",
    "The terminal interface is meant to be memorable while still helping recruiters quickly learn about David's experience, projects, technical strengths, and personality.",
    "The site should represent David as a backend software engineer with production systems experience who is also learning modern AI-agent deployment by building this portfolio.",
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
      agentKnowledge.work_experience_deep_dives,
      agentKnowledge.personal_interests,
      agentKnowledge.hobbies_outside_work,
      agentKnowledge.values_and_motivations,
      agentKnowledge.website_context,
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
