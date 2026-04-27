export type ProfileTopic =
  | "overview"
  | "projects"
  | "experience"
  | "skills"
  | "contact";

const skillGroups = [
  {
    label: "Programming Languages",
    items: ["Java", "Python", "SQL", "JavaScript", "TypeScript", "HTML"],
  },
  {
    label: "Frameworks & Tools",
    items: [
      "Spring Boot",
      "Git",
      "AWS CloudWatch",
      "AWS Lambda",
      "Amazon S3",
      "Ruby on Rails",
      "Linux",
    ],
  },
  {
    label: "Database Systems",
    items: ["MongoDB", "MySQL", "DynamoDB"],
  },
  {
    label: "Other",
    items: [
      "Object-Oriented Design",
      "Distributed Systems",
      "API Design",
      "CI/CD",
      "SDLC",
      "E2E Testing",
    ],
  },
];

export const profile = {
  name: "David Youn",
  title: "Backend Software Engineer",
  location: "Seattle, WA",
  shortBio:
    "Backend software engineer with 3 years of experience building and operating distributed, high-throughput systems at Amazon Web Services and healthcare technology companies.",
  lookingFor:
    "Software engineering roles focused on backend systems, distributed services, API design, data processing, and production reliability.",
  links: {
    github: "https://github.com/david-youn",
    linkedin: "https://www.linkedin.com/in/david-youn",
    email: "mailto:davidyoun2000@gmail.com",
    resume: "/resume",
    resumePdf: "/David-Youn-Software-Engineer-Resume.pdf",
  },
  skillGroups,
  skills: skillGroups.flatMap((group) => group.items),
  experience: [
    {
      role: "Software Engineer",
      organization: "ActX",
      period: "Feb 2025 - Nov 2025",
      location: "Seattle, WA",
      highlights: [
        "Delivered 20+ production backend and full-stack features across a Java Spring backend, Ruby on Rails frontend, and MongoDB architecture supporting customer-facing healthcare applications.",
        "Designed and implemented RESTful APIs integrating with third-party Electronic Health Record systems, enabling real-time clinical data exchange across multiple healthcare partners.",
        "Led modernization of legacy Rails applications by upgrading Ruby 1.9 to 2.7, removing deprecated dependencies and reducing build warnings by 70%+.",
        "Partnered with geneticists and domain experts to design backend workflow tools that automated manual bioinformatics processes.",
        "Built Python-based data processing jobs to backfill and validate 50M+ patient records, improving data completeness and enabling downstream analytics.",
      ],
    },
    {
      role: "Software Development Engineer",
      organization: "Amazon Web Services",
      period: "Aug 2022 - Feb 2024",
      location: "Seattle, WA",
      highlights: [
        "Designed and shipped distributed REST APIs supporting cross-region replication for large-scale AWS services, improving resilience across multiple high-traffic regions.",
        "Built and maintained real-time monitoring dashboards for APIs handling 100K+ requests per minute, enabling rapid anomaly detection and supporting a 99.9% availability SLA.",
        "Improved system performance and reliability by optimizing Elasticsearch client usage, implementing retry logic, and addressing bottlenecks that reduced error rates under peak load.",
        "Participated in a 24/7 on-call rotation for Tier 1 and Tier 2 services, performing root cause analysis, writing incident reports, and deploying production fixes.",
      ],
    },
    {
      role: "Software Development Engineer Intern",
      organization: "Amazon Web Services",
      period: "Jun 2021 - Sep 2021",
      location: "Remote",
      highlights: [
        "Developed a backend API to collect, store, and query historical user data in Amazon S3, improving data accessibility and reducing retrieval latency.",
        "Authored internal technical documentation supporting onboarding and long-term maintainability.",
      ],
    },
  ],
  education: [
    {
      school: "University of California, San Diego",
      degree: "B.S. Computer Science",
      graduation: "June 2022",
      details: ["GPA: 3.76/4.0"],
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
        repo: "https://github.com/david-youn/personal-website",
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
  skills: profile.skillGroups
    .map((group) => `${group.label}: ${group.items.join(", ")}`)
    .join("\n"),
  contact: `Email: ${profile.links.email}. GitHub: ${profile.links.github}. LinkedIn: ${profile.links.linkedin}. Resume: ${profile.links.resume}. PDF resume: ${profile.links.resumePdf}.`,
};

export function getProfileContext(topic?: ProfileTopic) {
  if (topic) {
    return topicSummaries[topic];
  }

  return JSON.stringify(profile, null, 2);
}
