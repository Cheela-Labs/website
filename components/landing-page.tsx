"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaitlistCount } from "@/components/waitlist-count";
import { WaitlistModal } from "@/components/waitlist-modal";

const navLinks = [
  { label: "Docs", href: "#developer-experience" },
  { label: "Developer Platform", href: "#developer-platform" },
  { label: "About", href: "#problem" },
  { label: "Get Started", href: "#cta" },
];

const architectureSteps = [
  {
    name: "Application",
    description: "Entry point for the product workflow.",
  },
  {
    name: "Agent",
    description: "Decision-making layer with policy and context.",
  },
  {
    name: "Provider",
    description: "Execution, observability, and retry semantics live here.",
  },
  {
    name: "LLM",
    description: "Declared skill or operation available to the agent.",
  },
  {
    name: "Runtime",
    description: "Concrete side effect or external interaction.",
  },
  {
    name: "Capability",
    description: "Selected provider or integration target.",
  },
  {
    name: "Action",
    description: "Model inference that produces the next action.",
  },
];

const principles = [
  {
    title: "Modular",
    description:
      "Swap providers, tools, and capabilities without rewriting your application.",
  },
  {
    title: "Precise",
    description: "Small APIs, strict boundaries, and clear execution flow.",
  },
  {
    title: "Controlled",
    description: "Policy, routing, and execution stay inside the runtime.",
  },
];

const featureCards = [
  {
    code: "CTRL",
    title: "Controlled execution",
    description:
      "Keep execution predictable with built-in routing, retries, and policy.",
  },
  {
    code: "COMP",
    title: "Composable capabilities",
    description:
      "Build agents from small, well-defined capabilities instead of one-off prompts and brittle orchestration glue.",
  },
  {
    code: "OBSV",
    title: "Runtime observability",
    description:
      "Every execution produces traces, metrics, and state transitions for debugging and review.",
  },
  {
    code: "POLI",
    title: "Runtime policy",
    description:
      "Permissions, approvals, and guardrails travel with every execution.",
  },
  {
    code: "PROV",
    title: "Provider agnostic",
    description:
      "Connect any provider without locking your runtime to a single model vendor.",
  },
  {
    code: "DX",
    title: "Developer experience",
    description:
      "Small APIs, readable examples, and predictable behavior make the runtime easy to adopt.",
  },
];

const solutionItems = [
  {
    label: "Provider Agnostic",
    text: "Switch providers without rewriting your application.",
  },
  {
    label: "Composable",
    text: "Compose only the runtime capabilities your product needs.",
  },
  {
    label: "Observable",
    text: "Every action can be traced back to an execution path.",
  },
  {
    label: "Predictable",
    text: "Control flow stays predictable even as models change.",
  },
];

const openSourceRepos = [
  {
    name: "@cheela/runtime",
    description:
      "Execution engine for reliable AI agents with policies, routing, and observability.",
    badge: "Core",
  },
  {
    name: "@cheela/provider",
    description: "Provider adapters for OpenAI, Anthropic, Gemini, and more.",
    badge: "Package",
  },
  {
    name: "@cheela/sdk",
    description:
      "TypeScript SDK for building capabilities, actions, and agent runtimes.",
    badge: "Package",
  },
];

const roadmapItems = [
  "Fine-grained capability policies",
  "Multi-provider routing with observability",
  "Human approval checkpoints",
  "Reusable runtime templates for teams",
  "Enterprise audit export and retention",
];

const faqItems = [
  {
    question: "Why does Cheela focus on runtime instead of prompting?",
    answer:
      "Prompts are useful, but they are not enough to make agent systems reliable. Cheela centers the runtime so policy, execution, and observability are explicit.",
  },
  {
    question: "Can teams use their own model providers?",
    answer:
      "Yes. Cheela is provider-agnostic and designed so the model layer can change without rewriting the rest of the agent architecture.",
  },
  {
    question: "Is Cheela opinionated about deployment?",
    answer:
      "It is opinionated about control and reliability, not about where you run it. The platform is built to fit modern TypeScript and cloud workflows.",
  },
];

const runtimeCode = `import { createRuntime } from "@cheela/runtime";

const runtime = createRuntime({
  name: "support-agent",
  provider: "anthropic",
  capabilities: ["search", "summarize", "escalate"],
  policy: {
    approvals: ["payment", "deletion"],
    maxSteps: 8,
  },
});

export async function handleRequest(input: string) {
  const run = await runtime.execute({ input });

  if (!run.allowed) {
    return run.reason;
  }

  return run.result;
}`;

const heroAscii = String.raw`  _____ _   _ _____   ____  _   _ _   _ _____ ___ __  __ _____
 |_   _| | | | ____| |  _ \| | | | \ | |_   _|_ _|  \/  | ____|
   | | | |_| |  _|   | |_) | | | |  \| | | |  | || |\/| |  _|
   | | |  _  | |___  |  _ <| |_| | |\  | | |  | || |  | | |___
   |_| |_| |_|_____| |_| \_\\___/|_| \_| |_| |___|_|  |_|_____|

  _____ ___  ____       _    ___      _    ____ _____ _   _ _____ ____
 |  ___/ _ \|  _ \     / \  |_ _|    / \  / ___| ____| \ | |_   _/ ___|
 | |_ | | | | |_) |   / _ \  | |    / _ \| |  _|  _| |  \| | | | \___ \
 |  _|| |_| |  _ <   / ___ \ | |   / ___ \ |_| | |___| |\  | | |  ___) |
 |_|   \___/|_| \_\ /_/   \_\___| /_/   \_\____|_____|_| \_| |_| |____/`;

function RuntimeTrace() {
  return (
    <article className="relative border-4 border-double border-[var(--primary)] bg-[var(--surface)] p-4 sm:p-6">
      <div className="absolute -top-3 left-4 bg-[var(--surface)] px-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">
        <span aria-hidden="true">[ </span>
        Execution Pipeline
        <span aria-hidden="true"> ]</span>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-dashed border-[var(--border)] pb-5 pt-2">
        <p className="max-w-xl text-lg font-semibold leading-7 text-[var(--foreground)]">
          From application to action. Every step is visible.
        </p>
        <Badge>Live</Badge>
      </div>

      <ol className="mt-5" aria-label="Execution pipeline stages">
        {architectureSteps.map((step, index) => (
          <li key={step.name}>
            <div className="grid grid-cols-[3.5rem_1fr_auto] items-center gap-3 border border-[var(--border)] bg-[var(--background)] px-3 py-3">
              <span className="text-xs text-[var(--muted)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.08em]">
                {step.name}
              </span>
              <span
                aria-hidden="true"
                className={
                  step.name === "Runtime"
                    ? "text-[var(--primary)]"
                    : "text-[var(--muted)]"
                }
              >
                {step.name === "Runtime" ? (
                  <span className="terminal-cursor" aria-hidden="true">
                    █
                  </span>
                ) : (
                  "·"
                )}
              </span>
            </div>
            {index < architectureSteps.length - 1 ? (
              <div
                className="h-4 border-l border-dashed border-[var(--primary)]/60 pl-3 text-xs leading-4 text-[var(--muted)]"
                aria-hidden="true"
              >
                │
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-5 grid border border-[var(--border)] min-[769px]:grid-cols-2">
        <div className="border-b border-[var(--border)] p-4 min-[769px]:border-r min-[769px]:border-b-0">
          <p className="text-xl font-semibold text-[var(--foreground)]">
            Any Model
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            OpenAI • Anthropic • Gemini
          </p>
        </div>
        <div className="p-4">
          <p className="text-xl font-semibold text-[var(--foreground)]">
            One Runtime
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            One API. Every provider.
          </p>
        </div>
      </div>
    </article>
  );
}

export function LandingPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]">
        <Container>
          <nav aria-label="Primary navigation">
            <div className="flex min-h-20 items-center justify-between gap-4">
              <a
                href="#top"
                className="group flex min-w-0 items-center gap-3 py-3"
              >
                <span
                  aria-hidden="true"
                  className="text-lg font-semibold text-[var(--primary)]"
                >
                  &gt;_
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold uppercase tracking-[0.18em] group-hover:text-[var(--primary)]">
                    Cheela
                  </span>
                  <span className="block truncate text-xs text-[var(--muted)]">
                    Reliable agent runtime
                  </span>
                </span>
              </a>

              <div className="hidden items-center gap-1 lg:flex">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-3 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)] underline-offset-4 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  >
                    <span aria-hidden="true">&gt; </span>
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="hidden items-center gap-1 min-[769px]:flex">
                <Button
                  variant="ghost"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/Cheela-Labs/platform"
                >
                  GitHub ↗
                </Button>
                <Button onClick={() => setWaitlistOpen(true)}>
                  Get Started
                </Button>
              </div>

              <button
                type="button"
                className="min-h-11 px-2 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)] min-[769px]:hidden"
                aria-label="Open navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((current) => !current)}
              >
                <span aria-hidden="true">[ MENU:{menuOpen ? "−" : "+"} ]</span>
              </button>
            </div>

            {menuOpen ? (
              <div
                id="mobile-navigation"
                className="border-t border-dashed border-[var(--border)] py-4 min-[769px]:hidden"
              >
                <div className="grid">
                  {navLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="border-b border-dashed border-[var(--border)] px-2 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--muted)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                    >
                      <span aria-hidden="true">&gt; </span>
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="https://github.com/Cheela-Labs/platform"
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--muted)] hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                  >
                    <span aria-hidden="true">&gt; </span>
                    GitHub ↗
                  </a>
                  <Button
                    className="mt-3 justify-start"
                    onClick={() => {
                      setMenuOpen(false);
                      setWaitlistOpen(true);
                    }}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            ) : null}
          </nav>
        </Container>
      </header>

      <main>
        <section id="top" className="py-16 sm:py-20 lg:py-24">
          <Container>
            <div className="grid items-center gap-12 xl:grid-cols-[1.08fr_0.92fr] xl:gap-14">
              <div className="min-w-0">
                <Badge>Infrastructure for reliable AI agents</Badge>
                <h1 className="sr-only">The runtime for AI agents.</h1>
                <pre
                  aria-hidden="true"
                  className="terminal-reveal mt-8 max-w-full overflow-hidden whitespace-pre font-mono text-[clamp(0.26rem,0.72vw,0.62rem)] font-semibold leading-[1.12] tracking-[-0.05em] text-[var(--foreground)] sm:text-[clamp(0.35rem,0.72vw,0.62rem)]"
                >
                  {heroAscii}
                </pre>
                <p className="mt-8 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                  Cheela is the runtime for production AI agents, sitting
                  between your application and the model to make execution
                  observable, predictable, and controllable.
                </p>

                <div className="mt-7 flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                  <Button onClick={() => setWaitlistOpen(true)}>
                    Get Started
                  </Button>
                  <Button variant="secondary" href="#architecture">
                    See the runtime
                  </Button>
                </div>

                <div className="mt-10 grid border border-[var(--border)] min-[769px]:grid-cols-3">
                  {principles.map((principle, index) => (
                    <div
                      key={principle.title}
                      className="border-b border-[var(--border)] p-4 last:border-b-0 min-[769px]:border-r min-[769px]:border-b-0 min-[769px]:last:border-r-0"
                    >
                      <p className="text-xs text-[var(--primary)]">
                        {String(index + 1).padStart(2, "0")}://
                      </p>
                      <h2 className="mt-2 text-lg font-semibold">
                        {principle.title}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <RuntimeTrace />
            </div>
          </Container>
        </section>

        <Section
          id="problem"
          eyebrow="Problem"
          title="Agent systems fail when the execution is invisible."
          description="Teams can prototype a demo quickly, but reliability collapses when policy, model selection, retries, and tool execution live in different places."
        >
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <Card label="Structural failure">
              <div className="grid gap-8 min-[769px]:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                    <span aria-hidden="true" className="text-[var(--muted)]">
                      --{" "}
                    </span>
                    The failure mode is structural.
                  </h3>
                  <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
                    Business logic hides inside prompts, observability arrives
                    too late, and every model change introduces new regressions.
                  </p>
                </div>
                <ul className="border border-[var(--border)] bg-[var(--background)] p-4">
                  {[
                    "Agent output is not the same as execution intent.",
                    "Model calls need a runtime contract, not ad hoc orchestration.",
                    "Policy belongs in the runtime, not scattered across the application.",
                  ].map((item, index) => (
                    <li
                      key={item}
                      className="flex gap-3 border-b border-dashed border-[var(--border)] py-3 text-sm leading-6 text-[var(--muted)] last:border-b-0"
                    >
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-[var(--primary)]"
                      >
                        [{index === 0 ? "!" : index === 1 ? ">" : "#"}]
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <Card label="Outcome">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                Cheela moves those responsibilities into a single, observable
                layer.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
                Reliability becomes measurable, reviewable, and repeatable
                across every deployment.
              </p>
            </Card>
          </div>
        </Section>

        <Section
          id="solution"
          eyebrow="Solution"
          title="Minimal APIs. Maximum control."
          description="Opinionated where reliability matters. Flexible everywhere else."
        >
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <Card label="Runtime properties">
              <div className="grid border border-[var(--border)] min-[769px]:grid-cols-2">
                {solutionItems.map((item, index) => (
                  <div
                    key={item.label}
                    className={`p-5 ${
                      index < 3 ? "border-b border-[var(--border)]" : ""
                    } ${index === 2 ? "min-[769px]:border-b-0" : ""} ${
                      index % 2 === 0
                        ? "min-[769px]:border-r min-[769px]:border-[var(--border)]"
                        : ""
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                      {item.label}
                    </p>
                    <p className="mt-3 text-base font-semibold leading-7">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card label="Developer ergonomics">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                A platform that stays out of the way until it matters.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
                Built to scale from prototypes to production without changing
                how your system works.
              </p>
            </Card>
          </div>
        </Section>

        <Section
          id="architecture"
          eyebrow="Architecture"
          title="A runtime that makes execution explicit."
          description="The animation mirrors how every request moves through the runtime, from application to model."
        >
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Card label="Runtime path">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                Every step is visible, inspectable, and controllable.
              </h3>
              <ol className="mt-6 border border-[var(--border)]">
                {architectureSteps.map((step, index) => (
                  <li
                    key={step.name}
                    className="grid gap-3 border-b border-[var(--border)] p-4 last:border-b-0 min-[769px]:grid-cols-[3.5rem_9rem_1fr]"
                  >
                    <span className="text-xs text-[var(--primary)]">
                      [{String(index + 1).padStart(2, "0")}]
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.08em]">
                      {step.name}
                    </span>
                    <span className="text-sm leading-6 text-[var(--muted)]">
                      {step.description}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>

            <Card label="Behavior">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                The animation reflects how the runtime actually executes every
                request.
              </h3>
              <ul className="mt-6 border border-[var(--border)] p-4">
                {[
                  "Motion communicates execution, never decoration.",
                  "Designed to guide attention without distraction.",
                  "Respects accessibility preferences by default.",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-b border-dashed border-[var(--border)] py-3 text-sm leading-6 text-[var(--muted)] last:border-b-0"
                  >
                    <span aria-hidden="true" className="text-[var(--primary)]">
                      [OK]
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>

        <Section
          id="features"
          eyebrow="Features"
          title="The platform is shaped around reliability, not hype."
          description="Each feature reinforces engineering clarity, execution control, and confidence in production."
        >
          <div className="grid gap-5 min-[769px]:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature, index) => (
              <Card
                key={feature.title}
                label={`MOD-${String(index + 1).padStart(2, "0")}`}
                className="h-full"
              >
                <div
                  aria-hidden="true"
                  className="inline-flex border border-[var(--border)] px-3 py-2 text-sm font-semibold text-[var(--primary)]"
                >
                  [{feature.code}]
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="developer-experience"
          eyebrow="Developer Experience"
          title="Real TypeScript, not screenshots."
          description="Documentation that reads like production code, not marketing."
        >
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <CodeBlock
              title="createAgentRuntime.ts"
              language="TypeScript"
              copyText={runtimeCode}
            >
              {runtimeCode}
            </CodeBlock>

            <div className="grid gap-6">
              <Card label="Copyable examples">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                  Docs that teach the runtime, not just the API.
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
                  Copy real examples, understand the runtime, and ship faster.
                </p>
              </Card>

              <Card label="What ships">
                <div className="flex flex-wrap gap-x-4 gap-y-3">
                  {[
                    "Syntax-highlighted code",
                    "Copy buttons",
                    "Step-by-step guides",
                    "API references",
                    "Runtime patterns",
                  ].map((item) => (
                    <Badge key={item} className="text-[var(--foreground)]">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </Section>

        <Section
          id="developer-platform"
          eyebrow="Developer Platform"
          title="Engineering should be visible."
          description="Trust comes from transparent engineering, clear documentation, and real code."
        >
          <div className="grid gap-5 min-[769px]:grid-cols-2 xl:grid-cols-3">
            {openSourceRepos.map((repo, index) => (
              <Card
                key={repo.name}
                label={`PKG-${String(index + 1).padStart(2, "0")}`}
                className="flex h-full flex-col"
              >
                <div className="flex items-center justify-between">
                  <Badge>{repo.badge}</Badge>
                  <span className="text-xs uppercase tracking-[0.12em] text-[var(--muted)]">
                    NPM::PKG
                  </span>
                </div>
                <h3 className="mt-5 break-all text-xl font-semibold">
                  {repo.name}
                </h3>
                <p className="mt-3 flex-1 text-[15px] leading-7 text-[var(--muted)]">
                  {repo.description}
                </p>
                <a
                  className="mt-6 border-t border-dashed border-[var(--border)] pt-5 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--primary)] underline underline-offset-4 hover:text-[var(--primary-hover)]"
                  href="https://github.com"
                >
                  <span aria-hidden="true">&gt; </span>
                  View Package
                </a>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="roadmap"
          eyebrow="Roadmap"
          title="Growing the runtime, not the complexity."
          description="Every release strengthens reliability, observability, and developer experience."
        >
          <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
            <Card label="Now">
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                A stable runtime for production AI agents.
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
                Focused on reliability first, with new capabilities added only
                when they strengthen the runtime.
              </p>
            </Card>

            <Card label="Queue">
              <ol className="border border-[var(--border)]">
                {roadmapItems.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[3.5rem_1fr] border-b border-[var(--border)] last:border-b-0"
                  >
                    <span className="border-r border-[var(--border)] p-4 text-sm text-[var(--primary)]">
                      0{index + 1}
                    </span>
                    <span className="p-4 text-sm leading-7">{item}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </Section>

        <Section
          id="faq"
          eyebrow="FAQ"
          title="Questions every engineering team asks."
          description="Direct answers about how Cheela works and why it exists."
        >
          <div className="grid gap-4 lg:grid-cols-3">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group border border-[var(--border)] bg-[var(--surface)] open:border-[var(--primary)]"
              >
                <summary className="cursor-pointer list-none p-5 text-base font-semibold leading-7">
                  <span className="flex items-start justify-between gap-4">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[var(--primary)] group-open:hidden"
                    >
                      [+]
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden shrink-0 text-[var(--primary)] group-open:inline"
                    >
                      [-]
                    </span>
                  </span>
                </summary>
                <p className="border-t border-dashed border-[var(--border)] p-5 text-[15px] leading-7 text-[var(--muted)]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </Section>

        <Section id="cta" className="pb-24">
          <Card label="Get started">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h2 className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                  <span aria-hidden="true" className="text-[var(--muted)]">
                    =={" "}
                  </span>
                  Ship an agent platform your team can actually maintain.
                  <span aria-hidden="true" className="text-[var(--muted)]">
                    {" "}
                    ==
                  </span>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                  Build AI systems your team can understand, inspect, and evolve
                  over time.
                </p>
                <WaitlistCount />
              </div>
              <div className="flex flex-col items-start gap-2 lg:items-end">
                <Button onClick={() => setWaitlistOpen(true)}>
                  Get Started
                </Button>
                <Button variant="outline" href="#developer-experience">
                  Read the Docs
                </Button>
              </div>
            </div>
          </Card>
        </Section>
      </main>

      <footer className="border-t border-[var(--border)] py-8">
        <Container>
          <div className="grid gap-6 text-sm text-[var(--muted)] min-[769px]:grid-cols-[0.7fr_1.3fr_1fr] min-[769px]:items-center">
            <div className="font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]">
              Cheela
            </div>
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap gap-x-5 gap-y-3"
            >
              <a
                href="#problem"
                className="underline-offset-4 hover:text-[var(--primary)] hover:underline"
              >
                <span aria-hidden="true">&gt; </span>
                Problem
              </a>
              <a
                href="#architecture"
                className="underline-offset-4 hover:text-[var(--primary)] hover:underline"
              >
                <span aria-hidden="true">&gt; </span>
                Architecture
              </a>
              <a
                href="#developer-platform"
                className="underline-offset-4 hover:text-[var(--primary)] hover:underline"
              >
                <span aria-hidden="true">&gt; </span>
                Developer Platform
              </a>
              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="underline-offset-4 hover:text-[var(--primary)] hover:underline"
              >
                <span aria-hidden="true">&gt; </span>
                Get Started
              </button>
            </nav>
            <div className="md:text-right">
              Runtime infrastructure for reliable AI agents.
            </div>
          </div>
        </Container>
      </footer>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
