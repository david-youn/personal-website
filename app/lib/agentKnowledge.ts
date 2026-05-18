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
  | "background_timeline"
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
    "Outside of work, David spends most of his time on volleyball, climbing, and the gym, in that order of priority.",
    "Volleyball is his main hobby and the one he is most serious about improving in. He usually plays 2-4 times per week and typically enters several tournaments each year.",
    "He started playing volleyball around 2021 while in college, not as a college athlete, but recreationally with friends who were very strong players, including several on UCSD's Division I team.",
    "Climbing is a newer hobby that he started around 2024. He currently climbs around the V5 range and usually climbs 1-3 times per week, depending on his volleyball schedule.",
    "He also goes to the gym around 1-2 times per week, mostly as a supporting routine for general fitness and sports performance.",
    "For games, David likes deck-building games such as Slay the Spire and Balatro.",
    "His longest-played game is Puzzle & Dragons, often abbreviated PAD, which he has played for over 10 years.",
    "For music, David really likes EDM and tries to go to 1 or 2 shows each year for artists he especially enjoys.",
  ].join("\n"),
  hobbies_outside_work: [
    "David's main hobby is volleyball. He is serious about getting better and likes the competitive, team-oriented, and technical sides of the sport.",
    "He started playing volleyball around 2021 while in college, not as a college athlete, but recreationally with friends who were very strong players, including several on UCSD's Division I team.",
    "In men's 6s volleyball, David most often plays outside hitter.",
    "In Reverse 4s, a format common in Washington, he has started playing at the A/AA level.",
    "During the summer, David likes playing a lot of Reverse doubles, a co-ed doubles format played on a women's net where men must attack from behind the 10-foot line and women can attack at the net.",
    "He also plays a lot of men's triples during the summer.",
    "A recent volleyball highlight video is available here: https://youtu.be/Q3ajIdZq3l0?si=qkqEkOra4ppBxNet. The footage is from a St. Patrick's Day cash-prize tournament in March where his team won $400.",
    "David's secondary hobby is climbing. He started around 2024 and currently climbs around V5.",
    "His third main hobby is going to the gym, usually 1-2 times per week.",
    "When answering hobby questions, keep the tone conversational and specific. It is okay to mention the volleyball highlight link if someone asks to see footage or asks about volleyball examples.",
  ].join("\n"),
  background_timeline: [
    "David was born in Gainesville, Florida on April 4, 2000.",
    "He moved to Indianapolis, Indiana when he was 4 and lived there from 2004 to 2006.",
    "He moved to Lubbock, Texas when he was 6 and lived there from 2006 to 2014.",
    "He moved to Cupertino, California when he was 14 and lived there from 2014 to 2015.",
    "He moved to San Jose, California when he was 15 and lived there from 2015 to 2018.",
    "He attended UC San Diego from 2018 to 2022, where he studied Computer Science.",
    "He moved to Seattle, Washington for work at age 22 in 2022 and has been based there since.",
    "When asked about his background, it is okay to summarize that David moved around a lot growing up: Florida, Indiana, Texas, California, San Diego for college, and Seattle for work.",
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
      agentKnowledge.background_timeline,
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
  "Your audience is external visitors: recruiters, hiring managers, engineers, and people deciding whether to interview David.",
  "Answer as a professional portfolio concierge. Do not address the visitor as David, do not act like a site editor, and do not suggest that the visitor should provide missing context unless they explicitly ask how to improve the site.",
  "Be concise, direct, and specific. Prefer concrete evidence from David's background over generic praise.",
  "Use terminal-friendly formatting: short intro sentence, then 2-5 compact bullets or short paragraphs. Keep most lines under roughly 90 characters when possible.",
  "Avoid long dense paragraphs, tables, excessive markdown, salesy language, and generic follow-up questions.",
  "Do not invent facts, employers, metrics, projects, links, degrees, or dates. If information is missing, briefly say it is not in the public portfolio context.",
  "Refer to David in third person unless a visitor explicitly asks for first-person wording David could use.",
].join(" ");
