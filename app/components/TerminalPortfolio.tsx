"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { profile } from "@/app/lib/profile";

type TerminalLine = {
  id: string;
  role: "system" | "user" | "assistant" | "error";
  content: string;
};

const terminalStorageKey = "david-youn-terminal-lines-v2";
const agentModeStorageKey = "david-youn-terminal-agent-mode-v2";

const commandHelp = [
  "Available commands:",
  "  help     - show the command list",
  "  about    - show a short bio",
  "  edu      - show education details",
  "  exp      - show a short experience summary",
  "  projects - show featured projects",
  "  skills   - show technical skills",
  "  link     - show contact information",
  "  agent    - enter interactive agent mode",
  "  clear    - clear the terminal output",
].join("\n");

function createId() {
  return crypto.randomUUID();
}

function makeStarterLines(): TerminalLine[] {
  return [
    {
      id: "boot-title",
      role: "system",
      content: "David CLI v1.0.0",
    },
    {
      id: "boot-help",
      role: "assistant",
      content: "Type `help` to explore available commands.",
    },
  ];
}

function readStoredLines() {
  if (typeof window === "undefined") {
    return makeStarterLines();
  }

  try {
    const stored = window.localStorage.getItem(terminalStorageKey);
    if (!stored) {
      return makeStarterLines();
    }

    const parsed = JSON.parse(stored) as TerminalLine[];
    const isValid =
      Array.isArray(parsed) &&
      parsed.every(
        (line) =>
          typeof line.id === "string" &&
          typeof line.content === "string" &&
          ["system", "user", "assistant", "error"].includes(line.role),
      );

    return isValid ? parsed : makeStarterLines();
  } catch {
    return makeStarterLines();
  }
}

function readStoredAgentMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(agentModeStorageKey) === "true";
}

function getEducationOutput() {
  return profile.education
    .map((item) => {
      const details = item.details.length ? `, ${item.details.join(", ")}` : "";
      return `${item.degree} - ${item.school} (${item.graduation}${details})`;
    })
    .join("\n");
}

function getExperienceOutput() {
  return profile.experience
    .map(
      (item, index) =>
        `${index + 1}. ${item.role} - ${item.organization} (${item.period})`,
    )
    .join("\n");
}

function wrapIndented(text: string, indent = "   ", width = 86) {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (`${indent}${next}`.length > width && current) {
      lines.push(`${indent}${current}`);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) {
    lines.push(`${indent}${current}`);
  }

  return lines.join("\n");
}

function getProjectsOutput() {
  return profile.projects
    .map((project, index) =>
      [
        `${index + 1}. ${project.name} (${project.status})`,
        wrapIndented(project.summary),
        wrapIndented(`Stack: ${project.stack.join(", ")}`),
      ].join("\n"),
    )
    .join("\n\n");
}

function getSkillsOutput() {
  return profile.skillGroups
    .map((group) => `${group.label}: ${group.items.join(", ")}`)
    .join("\n");
}

function getLinksOutput() {
  return [
    `Email: ${profile.links.email.replace("mailto:", "")}`,
    `LinkedIn: ${profile.links.linkedin.replace("https://", "")}`,
    `GitHub: ${profile.links.github.replace("https://", "")}`,
  ].join("\n");
}

const commandOutput: Record<string, string> = {
  help: commandHelp,
  about: `${profile.name} - ${profile.title}\n${profile.shortBio}\nLooking for: ${profile.lookingFor}`,
  edu: getEducationOutput(),
  exp: getExperienceOutput(),
  experience: getExperienceOutput(),
  projects: getProjectsOutput(),
  skills: getSkillsOutput(),
  link: getLinksOutput(),
  contact: getLinksOutput(),
};

function TerminalOutputLine({ line }: { line: TerminalLine }) {
  if (line.role === "user") {
    return (
      <div className="terminal-line terminal-input-line">
        <span className="shell-prompt">$</span>
        <pre>{line.content}</pre>
      </div>
    );
  }

  return (
    <div className={`terminal-line ${line.role}`}>
      <pre>{line.content}</pre>
    </div>
  );
}

export function TerminalPortfolio() {
  const [lines, setLines] = useState<TerminalLine[]>(readStoredLines);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isAgentMode, setIsAgentMode] = useState(readStoredAgentMode);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.localStorage.setItem(terminalStorageKey, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    window.localStorage.setItem(agentModeStorageKey, String(isAgentMode));
  }, [isAgentMode]);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ block: "end" });
  }, [lines, isThinking]);

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

  function appendAssistant(content: string) {
    setLines((current) => [
      ...current,
      { id: createId(), role: "assistant", content },
    ]);
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

    const [command] = raw.split(" ");
    const normalized = command.toLowerCase();

    if (normalized === "clear") {
      setIsAgentMode(false);
      setLines(makeStarterLines());
      return;
    }

    if (isAgentMode) {
      if (normalized === "exit") {
        setIsAgentMode(false);
        appendAssistant("Exited agent mode. Type `agent` to re-enter.");
        return;
      }

      await askAgent(raw);
      return;
    }

    if (normalized === "agent") {
      setIsAgentMode(true);
      appendAssistant(
        "Launching agent shell...\n\nYou are now in agent mode. Talk naturally and type `exit` to return to commands.",
      );
      return;
    }

    if (commandOutput[normalized]) {
      appendAssistant(commandOutput[normalized]);
      return;
    }

    appendAssistant(
      `Command not found: ${raw}. Type \`help\` to see the available commands.`,
    );
  }

  return (
    <main className="shell" onClick={() => inputRef.current?.focus()}>
      <section className="terminal" aria-label="Interactive portfolio terminal">
        <header className="terminal-hero">
          <div>
            <p className="terminal-kicker">interactive portfolio</p>
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
          </div>
          <nav className="terminal-actions" aria-label="Portfolio links">
            <Link href={profile.links.resume}>resume</Link>
            <a href={profile.links.github}>github</a>
            <a href={profile.links.linkedin}>linkedin</a>
          </nav>
        </header>

        <div className="terminal-body">
          <div className="output" aria-live="polite">
            {lines.map((line) => (
              <TerminalOutputLine line={line} key={line.id} />
            ))}
            {isThinking ? (
              <div className="terminal-line assistant terminal-thinking">
                <pre>thinking...</pre>
              </div>
            ) : null}
            <div ref={outputEndRef} aria-hidden="true" />
          </div>

          <form className="command-line" onSubmit={handleSubmit}>
            <label htmlFor="terminal-input">$</label>
            <input
              ref={inputRef}
              id="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              spellCheck={false}
              autoComplete="off"
              aria-label={isAgentMode ? "Agent prompt" : "Terminal command"}
            />
          </form>
        </div>
      </section>
    </main>
  );
}
