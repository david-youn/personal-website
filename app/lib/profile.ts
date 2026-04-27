export type ProfileTopic =
  | "overview"
  | "projects"
  | "experience"
  | "skills"
  | "contact";

export const profile = {
  name: "David Youn",
  title: "Builder, student, and aspiring AI/product engineer",
  location: "United States",
  shortBio:
    "I like building practical software with thoughtful interfaces, especially projects that combine product thinking, AI systems, and useful automation.",
  lookingFor:
    "Internships, early-career software engineering roles, AI engineering roles, and product-minded engineering teams.",
  links: {
    github: "https://github.com/your-github",
    linkedin: "https://www.linkedin.com/in/your-linkedin",
    email: "mailto:you@example.com",
    resume: "/resume",
  },
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "OpenAI APIs",
    "Vercel",
    "PostgreSQL",
    "Tailwind/CSS",
  ],
  experience: [
    {
      role: "Your Role",
      organization: "Company, club, lab, or personal venture",
      period: "2025 - Present",
      highlights: [
        "Built and shipped a project that solved a concrete user problem.",
        "Worked with APIs, databases, and frontend workflows.",
        "Collaborated with teammates and iterated based on feedback.",
      ],
    },
  ],
  projects: [
    {
      name: "Portfolio Agent Terminal",
      status: "In progress",
      stack: ["Next.js", "OpenAI Agents SDK", "Vercel"],
      summary:
        "A browser-based terminal that lets recruiters ask questions about my projects, experience, and working style.",
      impact:
        "Shows practical agent deployment experience and makes my resume easier to explore interactively.",
      links: {
        demo: "#",
        repo: "#",
      },
    },
    {
      name: "Replace this with a real project",
      status: "Draft",
      stack: ["Python", "FastAPI", "PostgreSQL"],
      summary:
        "Describe what it does, who it helps, and the hardest technical thing you solved.",
      impact:
        "Use metrics when possible: users, speedups, saved time, accuracy, or money.",
      links: {
        demo: "#",
        repo: "#",
      },
    },
  ],
};

export const topicSummaries: Record<ProfileTopic, string> = {
  overview: `${profile.name} is a ${profile.title}. ${profile.shortBio} Currently looking for: ${profile.lookingFor}`,
  projects: profile.projects
    .map(
      (project) =>
        `${project.name}: ${project.summary} Impact: ${project.impact} Stack: ${project.stack.join(", ")}.`,
    )
    .join("\n"),
  experience: profile.experience
    .map(
      (item) =>
        `${item.role} at ${item.organization}, ${item.period}. ${item.highlights.join(" ")}`,
    )
    .join("\n"),
  skills: profile.skills.join(", "),
  contact: `Email: ${profile.links.email}. GitHub: ${profile.links.github}. LinkedIn: ${profile.links.linkedin}. Resume: ${profile.links.resume}.`,
};

export function getProfileContext(topic?: ProfileTopic) {
  if (topic) {
    return topicSummaries[topic];
  }

  return JSON.stringify(profile, null, 2);
}
