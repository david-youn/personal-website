# Personal Agent Terminal

A browser-based terminal portfolio with a server-side OpenAI portfolio agent.

## Stack

- Next.js App Router
- OpenAI Agents SDK on a Vercel-compatible API route
- Editable profile data in `app/lib/profile.ts`

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

The site works without an API key using local fallback answers. Add `OPENAI_API_KEY` in `.env.local` to enable the deployed portfolio agent.

## Customize

1. Replace placeholder content in `app/lib/profile.ts`.
2. Update the generated `/resume` route, or replace `profile.links.resume` with another PDF path after adding the PDF under `public/`.
3. Update links in `profile.links`.
4. Deploy to Vercel and add `OPENAI_API_KEY` and `OPENAI_MODEL` as environment variables.

## Agent Knowledge

- Put resume-style facts, public links, skills, experience, education, and project summaries in `app/lib/profile.ts`.
- Put richer agent context in `app/lib/agentKnowledge.ts`: career story, work style, strengths, project deep dives, and interview talking points.
- For every major project, add the problem, users, your role, architecture, hard technical decisions, tradeoffs, measurable impact, links, and what you would improve next.
- Keep secrets, private company details, internal URLs, and anything under NDA out of these files. Anything committed here can become public.

## Good Next Features

- Add a real resume parser or structured `resume.json`.
- Add file search for project writeups, PDFs, and case studies.
- Add agent tracing/evals for common recruiter questions.
- Add a non-terminal `/resume` route for people who prefer traditional navigation.
