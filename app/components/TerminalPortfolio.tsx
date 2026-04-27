"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { profile } from "@/app/lib/profile";

type TerminalLine = {
  id: string;
  role: "system" | "user" | "assistant" | "error";
  content: string;
};

const commandHelp = [
  "help       show available commands",
  "about      quick overview",
  "projects   featured work",
  "experience work and leadership notes",
  "skills     technical stack",
  "contact    links and email",
  "clear      reset the terminal",
  "ask ...    ask the AI portfolio agent",
];

const commandOutput: Record<string, string> = {
  about: `${profile.name} - ${profile.title}\n${profile.shortBio}\nLooking for: ${profile.lookingFor}`,
  projects: profile.projects
    .map(
      (project) =>
        `${project.name} [${project.status}]\n  ${project.summary}\n  Impact: ${project.impact}\n  Stack: ${project.stack.join(", ")}`,
    )
    .join("\n\n"),
  experience: profile.experience
    .map(
      (item) =>
        `${item.role} - ${item.organization} (${item.period})\n${item.highlights.map((highlight) => `  - ${highlight}`).join("\n")}`,
    )
    .join("\n\n"),
  skills: profile.skills.join("  /  "),
  contact: `GitHub: ${profile.links.github}\nLinkedIn: ${profile.links.linkedin}\nEmail: ${profile.links.email.replace("mailto:", "")}\nResume: ${profile.links.resume}`,
  help: commandHelp.join("\n"),
};

const starterLines: TerminalLine[] = [
  {
    id: "boot",
    role: "system",
    content:
      "portfolio-agent v0.1 booted. Type 'help' or ask a recruiter-style question.",
  },
  {
    id: "hint",
    role: "assistant",
    content:
      "Try: ask what projects should I look at first?  /  ask why would David be strong in a backend role?",
  },
];

function createId() {
  return crypto.randomUUID();
}

function getPromptLabel(role: TerminalLine["role"]) {
  if (role === "user") {
    return "you";
  }

  if (role === "error") {
    return "err";
  }

  if (role === "system") {
    return "system";
  }

  return "agent";
}

function TerminalOutputLine({ line }: { line: TerminalLine }) {
  return (
    <div className={`line ${line.role}`}>
      <span className="prompt">{getPromptLabel(line.role)}</span>
      <pre>{line.content}</pre>
    </div>
  );
}

export function TerminalPortfolio() {
  const [lines, setLines] = useState<TerminalLine[]>(starterLines);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const transcript = useMemo(
    () =>
      lines
        .filter((line) => line.role === "user" || line.role === "assistant")
        .map((line) => ({
          role: line.role,
          content: line.content,
        })),
    [lines],
  );

  async function askAgent(question: string) {
    setIsThinking(true);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, messages: transcript }),
      });

      const payload = (await response.json()) as {
        answer?: string;
        error?: string;
        mode?: string;
      };

      if (!response.ok || payload.error) {
        throw new Error(payload.error || "Agent request failed.");
      }

      setLines((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content:
            payload.mode === "local-fallback"
              ? `${payload.answer}\n\n[local fallback: add OPENAI_API_KEY to enable the deployed agent]`
              : payload.answer || "",
        },
      ]);
    } catch (error) {
      setLines((current) => [
        ...current,
        {
          id: createId(),
          role: "error",
          content:
            error instanceof Error
              ? error.message
              : "Something went wrong talking to the agent.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const raw = input.trim();

    if (!raw || isThinking) {
      return;
    }

    setInput("");
    setLines((current) => [
      ...current,
      { id: createId(), role: "user", content: raw },
    ]);

    const [command, ...rest] = raw.split(" ");
    const normalized = command.toLowerCase();

    if (normalized === "clear") {
      setLines(starterLines);
      return;
    }

    if (normalized === "ask") {
      await askAgent(rest.join(" ").trim() || "Give me a quick overview.");
      return;
    }

    if (commandOutput[normalized]) {
      setLines((current) => [
        ...current,
        {
          id: createId(),
          role: "assistant",
          content: commandOutput[normalized],
        },
      ]);
      return;
    }

    await askAgent(raw);
  }

  return (
    <main className="shell" onClick={() => inputRef.current?.focus()}>
      <section className="terminal" aria-label="Interactive portfolio terminal">
        <div className="terminal-bar">
          <div className="window-controls" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>{profile.name.toLowerCase().replaceAll(" ", "-")}:~/portfolio</p>
          <a href={profile.links.resume}>resume</a>
        </div>

        <div className="terminal-body">
          <div className="identity">
            <p className="eyebrow">interactive portfolio</p>
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
          </div>

          <div className="output" aria-live="polite">
            {lines.map((line) => (
              <TerminalOutputLine line={line} key={line.id} />
            ))}
            {isThinking ? (
              <div className="line assistant">
                <span className="prompt">agent</span>
                <pre>thinking...</pre>
              </div>
            ) : null}
          </div>

          <form className="command-line" onSubmit={handleSubmit}>
            <label htmlFor="terminal-input">visitor@portfolio</label>
            <input
              ref={inputRef}
              id="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              spellCheck={false}
              autoComplete="off"
              placeholder="ask about projects, experience, skills..."
            />
          </form>
        </div>
      </section>
    </main>
  );
}
