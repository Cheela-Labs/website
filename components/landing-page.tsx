"use client";

import { SiGithub, SiNpm } from "@icons-pack/react-simple-icons";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  CheckCircle2,
  Code2,
  Globe,
  LineChart,
  Lock,
  Menu,
  MessageSquareMore,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { WaitlistModal } from "@/components/waitlist-modal/index";
import { WaitlistCount } from "@/components/waitlist-count";

const navLinks = [
  { label: "Docs", href: "#developer-experience" },
//   { label: "Blog", href: "#roadmap" },
  { label: "Developer Platform", href: "#developer-platform" },
  { label: "About", href: "#problem" },
//   { label: "GitHub", href: "https://github.com/Cheela-Labs/platform" },
  { label: "Get Started", href: "#cta" },
];

const architectureSteps = [
  "Application",
  "Agent",
  "Provider",
  "LLM",
  "Runtime",
  "Capability",
  "Action",
];

const featureCards: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
}> = [
  {
    icon: ShieldCheck,
    title: "Controlled execution",
    description:
      "Keep execution predictable with built-in routing, retries, and policy.",
  },
  {
    icon: Blocks,
    title: "Composable capabilities",
    description:
      "Build agents from small, well-defined capabilities instead of one-off prompts and brittle orchestration glue.",
  },
  {
    icon: LineChart,
    title: "Runtime observability",
    description:
      "Every execution produces traces, metrics, and state transitions for debugging and review.",
  },
  {
    icon: Lock,
    title: "Runtime policy",
    description:
      "Permissions, approvals, and guardrails travel with every execution.",
  },
  {
    icon: Globe,
    title: "Provider agnostic",
    description:
      "Connect any provider without locking your runtime to a single model vendor.",
  },
  {
    icon: Sparkles,
    title: "Developer experience",
    description:
      "Small APIs, readable examples, and predictable behavior make the runtime easy to adopt.",
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

function IconCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <Card className="h-full">
      <div className="flex h-full flex-col gap-5">
        <div className="flex size-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-white/[0.03] text-[var(--primary)]">
          <Icon className="size-5" />
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-medium tracking-[-0.03em] text-white">
            {title}
          </h3>
          <p className="text-[15px] leading-7 text-[var(--muted)]">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-white/[0.02] p-5">
      <div className="text-3xl font-medium tracking-[-0.04em] text-white">
        {value}
      </div>
      <div className="mt-2 text-sm text-[var(--muted)]">{label}</div>
    </div>
  );
}

function CodeLine({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="w-8 shrink-0 text-right text-white/30">{number}</span>
      <span className="min-w-0 whitespace-pre-wrap">{children}</span>
    </div>
  );
}

function ArchitectureDiagram() {
  const reducedMotion = useReducedMotion();

  return (
    <Card className="relative overflow-hidden p-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,160,23,0.12),_transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-20" />
      <div className="relative grid gap-6 p-6 sm:p-8">
        <div className="rounded-[24px] border border-[var(--border)] bg-black/40 p-5">
          <div className="flex items-center justify-between text-sm text-[var(--muted)]">
            <span>Execution Pipeline</span>
          </div>
          <div className="relative mt-5 grid gap-3">
            <div className="absolute bottom-6 left-4 top-6 w-px bg-[linear-gradient(180deg,rgba(212,160,23,0.75),rgba(212,160,23,0.08))]" />
            {architectureSteps.map((step, index) => (
              <div
                key={step}
                className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-white/[0.02] py-3 pl-14 pr-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-full border border-[var(--border)] bg-black/60 text-xs text-[var(--muted)]">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-white">
                      {step}
                    </span>
                  </div>
                  {/* <span className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
                    {index === 6 ? "Model" : "Node"}
                  </span> */}
                </div>
              </div>
            ))}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-4 top-6 size-3 -translate-x-1/2 rounded-full bg-[var(--primary)] shadow-[0_0_0_6px_rgba(212,160,23,0.16)]"
              animate={
                reducedMotion
                  ? undefined
                  : {
                      y: [0, 61, 122, 183, 244, 305, 366, 0],
                      opacity: [1, 1, 1, 1, 1, 1, 1, 1],
                    }
              }
              transition={
                reducedMotion
                  ? undefined
                  : {
                      duration: 14,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }
              }
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Stat value="Any Model" label="OpenAI • Anthropic • Gemini" />
          <Stat value="One Runtime" label="One API. Every provider." />
        </div>
      </div>
    </Card>
  );
}

export function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--background)] text-white">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <Container>
          <nav
            className={
              scrolled
                ? "flex items-center justify-between rounded-full border border-[rgba(255,255,255,0.08)] bg-black/70 px-4 py-3 backdrop-blur-2xl"
                : "flex items-center justify-between rounded-full border border-[rgba(255,255,255,0.06)] bg-black/45 px-5 py-4 backdrop-blur-xl"
            }
          >
            <a href="#top" className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)]">
                <Sparkles className="size-4" />
              </div>
              <div>
                <div className="text-sm font-medium tracking-[0.16em] uppercase text-white">
                  Cheela
                </div>
                <div className="text-xs text-[var(--muted)]">
                  Reliable agent runtime
                </div>
              </div>
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              {navLinks.slice(0, 4).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm text-[var(--muted)] transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <Button variant="ghost" target="_blank" href="https://github.com/Cheela-Labs/platform">
                <SiGithub className="size-4" />
                GitHub
              </Button>
              <Button onClick={() => setWaitlistOpen(true)}>
                Get Started
                <ArrowRight className="size-4" />
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.03] p-3 text-white md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="size-4" />
            </button>
          </nav>
        </Container>
      </header>

      <section
        id="top"
        className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-screen lg:pt-40"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(212,160,23,0.18),transparent_28%),radial-gradient(circle_at_top_right,_rgba(212,160,23,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_24%)]" />
        <Container>
          <div className="relative grid min-h-[calc(100vh-8rem)] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="relative z-10 max-w-3xl space-y-8">
              <Badge className="border-[rgba(212,160,23,0.35)] bg-[rgba(212,160,23,0.06)] text-[var(--primary)]">
                INFRASTRUCTURE FOR RELIABLE AI AGENTS
              </Badge>

              <div className="space-y-6">
                <h1 className="max-w-4xl text-5xl font-medium tracking-[-0.08em] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[0.95] xl:text-[6rem]">
                  The runtime for AI agents.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl sm:leading-9">
                  Cheela is the runtime for production AI agents, sitting
                  between your application and the model to make execution
                  observable, predictable, and controllable.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => setWaitlistOpen(true)}>
                  Get Started
                  <ArrowRight className="size-4" />
                </Button>
                <Button variant="secondary" href="#architecture">
                  <Play className="size-4" />
                  See the runtime
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[24px] border border-[var(--border)] bg-white/[0.02] p-4">
                  <div className="text-2xl font-medium tracking-[-0.04em] text-white">
                    Modular
                  </div>
                  <div className="mt-2 text-sm text-[var(--muted)]">
                    Swap providers, tools, and capabilities without rewriting
                    your application.
                  </div>
                </div>
                <div className="rounded-[24px] border border-[var(--border)] bg-white/[0.02] p-4">
                  <div className="text-2xl font-medium tracking-[-0.04em] text-white">
                    Precise
                  </div>
                  <div className="mt-2 text-sm text-[var(--muted)]">
                    Small APIs, strict boundaries, and clear execution flow.
                  </div>
                </div>
                <div className="rounded-[24px] border border-[var(--border)] bg-white/[0.02] p-4">
                  <div className="text-2xl font-medium tracking-[-0.04em] text-white">
                    Controlled
                  </div>
                  <div className="mt-2 text-sm text-[var(--muted)]">
                    Policy, routing, and execution stay inside the runtime.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-12 top-12 h-[22rem] w-[28rem] rounded-full bg-[rgba(212,160,23,0.26)] blur-[110px]"
                animate={
                  reducedMotion
                    ? undefined
                    : { x: [-20, 20, -20], opacity: [0.6, 0.75, 0.6] }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        duration: 16,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                }
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute right-0 top-0 h-[24rem] w-[24rem] rounded-full bg-[rgba(212,160,23,0.12)] blur-[130px]"
                animate={
                  reducedMotion
                    ? undefined
                    : { x: [20, -20, 20], opacity: [0.35, 0.55, 0.35] }
                }
                transition={
                  reducedMotion
                    ? undefined
                    : {
                        duration: 18,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                }
              />

              <Card className="relative overflow-hidden p-0">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent_30%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(212,160,23,0.16),transparent_32%)]" />
                <div className="relative grid gap-6 p-6 sm:p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">
                        Execution Pipeline
                      </div>
                      <div className="mt-2 text-2xl font-medium tracking-[-0.04em] text-white">
                        From application to action. Every step is visible.
                      </div>
                    </div>
                    <Badge className="border-[rgba(212,160,23,0.32)] text-[var(--primary)]">
                      Live
                    </Badge>
                  </div>
                  <ArchitectureDiagram />
                </div>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <Section
        id="problem"
        eyebrow="Problem"
        title="A prompt is not an operating model."
        description="Teams can prototype a demo quickly, but reliability collapses when policy, model selection, retries, and tool execution live in different places."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-medium tracking-[-0.03em] text-white">
                  The failure mode is structural.
                </h3>
                <p className="text-[15px] leading-7 text-[var(--muted)]">
                  Business logic hides inside prompts, observability arrives too
                  late, and every model change introduces new regressions.
                </p>
              </div>
              <div className="space-y-4 rounded-[24px] border border-[var(--border)] bg-black/30 p-5">
                <div className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <MessageSquareMore className="mt-0.5 size-4 text-[var(--primary)]" />
                  Agent output is not the same as execution intent.
                </div>
                <div className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <Code2 className="mt-0.5 size-4 text-[var(--primary)]" />
                  Model calls need a runtime contract, not ad hoc orchestration.
                </div>
                <div className="flex items-start gap-3 text-sm text-[var(--muted)]">
                  <Lock className="mt-0.5 size-4 text-[var(--primary)]" />
                  Policy belongs in the runtime, not scattered across the
                  application.
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                Outcome
              </div>
              <div className="text-2xl font-medium tracking-[-0.03em] text-white">
                Cheela moves those responsibilities into a single, observable
                layer.
              </div>
              <p className="text-[15px] leading-7 text-[var(--muted)]">
                Reliability becomes measurable, reviewable, and repeatable
                across every deployment.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        id="solution"
        eyebrow="Solution"
        title="Minimal APIs. Maximum control."
        description="Opinionated where reliability matters. Flexible everywhere else."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[24px] border border-[var(--border)] bg-black/30 p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                  Provider Agnostic
                </div>
                <div className="mt-3 text-lg font-medium text-white">
                  Switch providers without rewriting your application.
                </div>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-black/30 p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                  Composable
                </div>
                <div className="mt-3 text-lg font-medium text-white">
                  Compose only the runtime capabilities your product needs.
                </div>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-black/30 p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                  Observable
                </div>
                <div className="mt-3 text-lg font-medium text-white">
                  Every action can be traced back to an execution path.
                </div>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-black/30 p-5">
                <div className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">
                  Predictable
                </div>
                <div className="mt-3 text-lg font-medium text-white">
                  Control flow stays predictable even as models change.
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className="space-y-4">
              <Badge>Developer ergonomics</Badge>
              <div className="text-2xl font-medium tracking-[-0.03em] text-white">
                A platform that stays out of the way until it matters.
              </div>
              <p className="text-[15px] leading-7 text-[var(--muted)]">
                Built to scale from prototypes to production without changing
                how your system works.
              </p>
            </div>
          </Card>
        </div>
      </Section>

      <Section
        id="architecture"
        eyebrow="Architecture"
        title="A runtime that makes execution explicit."
        description="The animation mirrors how every request moves through the runtime, from application to model."
      >
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                Runtime path
              </div>
              <div className="text-2xl font-medium tracking-[-0.03em] text-white">
                Every step is visible, inspectable, and controllable.
              </div>
            </div>
            <div className="space-y-3">
              {architectureSteps.map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-black/20 px-4 py-4"
                >
                  <div className="flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.04] text-sm text-[var(--muted)]">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{step}</div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      {index === 0 && "Entry point for the product workflow."}
                      {index === 1 &&
                        "Decision-making layer with policy and context."}
                      {index === 2 &&
                        "Execution, observability, and retry semantics live here."}
                      {index === 3 &&
                        "Declared skill or operation available to the agent."}
                      {index === 4 &&
                        "Concrete side effect or external interaction."}
                      {index === 5 &&
                        "Selected provider or integration target."}
                      {index === 6 &&
                        "Model inference that produces the next action."}
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-[var(--muted)]" />
                </div>
              ))}
            </div>
          </Card>
          {/* <Card>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  Behavior
                </div>
                <div className="text-2xl font-medium tracking-[-0.03em] text-white">
                  The animation reflects how the runtime actually executes every
                  request.
                </div>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-black/30 p-5">
                <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <CheckCircle2 className="size-4 text-[var(--primary)]" />
                  Motion communicates execution, never decoration.
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <CheckCircle2 className="size-4 text-[var(--primary)]" />
                  Designed to guide attention without distraction.
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-[var(--muted)]">
                  <CheckCircle2 className="size-4 text-[var(--primary)]" />
                  Respects accessibility preferences by default.
                </div>
              </div>
            </div>
          </Card> */}
        </div>
      </Section>

      <Section
        id="features"
        eyebrow="Features"
        title="The platform is shaped around reliability, not hype."
        description="Each feature reinforces engineering clarity, execution control, and confidence in production."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature) => (
            <IconCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Section>

      <Section
        id="developer-experience"
        eyebrow="Developer Experience"
        title="Code that explains the system."
        description="Documentation that reads like production code, not marketing."
      >
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <CodeBlock
            title="createAgentRuntime.ts"
            language="TypeScript"
            copyText={`import { createRuntime } from "@cheela/runtime";

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
}`}
          >
            <div className="space-y-1 font-mono text-[13px] leading-7 text-[#e8e8e8]">
              <CodeLine number="01">
                <span className="text-[#c792ea]">import</span>{" "}
                <span className="text-[#89ddff]">{`{ createRuntime }`}</span>{" "}
                <span className="text-[#c792ea]">from</span>{" "}
                <span className="text-[#c3e88d]">"@cheela/runtime"</span>
                {";"}
              </CodeLine>
              <CodeLine number="02"> </CodeLine>
              <CodeLine number="03">
                <span className="text-[#c792ea]">const</span> runtime{" "}
                <span className="text-[#c792ea]">=</span>{" "}
                <span className="text-[#82aaff]">createRuntime</span>({"{"}
              </CodeLine>
              <CodeLine number="04">
                <span className="text-white/70"> name:</span>{" "}
                <span className="text-[#c3e88d]">"support-agent"</span>,
              </CodeLine>
              <CodeLine number="05">
                <span className="text-white/70"> provider:</span>{" "}
                <span className="text-[#c3e88d]">"anthropic"</span>,
              </CodeLine>
              <CodeLine number="06">
                <span className="text-white/70"> capabilities:</span> [
                <span className="text-[#c3e88d]">"search"</span>,{" "}
                <span className="text-[#c3e88d]">"summarize"</span>,{" "}
                <span className="text-[#c3e88d]">"escalate"</span>],
              </CodeLine>
              <CodeLine number="07">
                <span className="text-white/70"> policy:</span> {`{`}
              </CodeLine>
              <CodeLine number="08">
                <span className="text-white/70"> approvals:</span> [
                <span className="text-[#c3e88d]">"payment"</span>,{" "}
                <span className="text-[#c3e88d]">"deletion"</span>],
              </CodeLine>
              <CodeLine number="09">
                <span className="text-white/70"> maxSteps:</span>{" "}
                <span className="text-[#f78c6c]">8</span>,
              </CodeLine>
              <CodeLine number="10"> {`}`},</CodeLine>
              <CodeLine number="11">{`});`}</CodeLine>
              <CodeLine number="12"> </CodeLine>
              <CodeLine number="13">
                <span className="text-[#c792ea]">export async function</span>{" "}
                <span className="text-[#82aaff]">handleRequest</span>(input:{" "}
                <span className="text-[#89ddff]">string</span>) {`{`}
              </CodeLine>
              <CodeLine number="14">
                <span className="text-white/70">
                  {" "}
                  const run = await runtime.execute(
                </span>
                <span className="text-white/70">{"{"}</span>
                <span className="text-[#89ddff]">input</span>
                <span className="text-white/70">{"}"});</span>
              </CodeLine>
              <CodeLine number="15"> </CodeLine>
              <CodeLine number="16">
                <span className="text-[#c792ea]"> if</span>{" "}
                <span className="text-[#82aaff]">(!run.allowed)</span> {`{`}
              </CodeLine>
              <CodeLine number="17">
                <span className="text-[#c792ea]"> return</span>{" "}
                <span className="text-[#89ddff]">run.reason</span>
                {";"}
              </CodeLine>
              <CodeLine number="18"> {`}`}</CodeLine>
              <CodeLine number="19"> </CodeLine>
              <CodeLine number="20">
                <span className="text-[#c792ea]"> return</span>{" "}
                <span className="text-[#89ddff]">run.result</span>
                {";"}
              </CodeLine>
              <CodeLine number="21">{`}`}</CodeLine>
            </div>
          </CodeBlock>
          <div className="space-y-6">
            <Card>
              <div className="space-y-4">
                <Badge>Copyable examples</Badge>
                <div className="text-2xl font-medium tracking-[-0.03em] text-white">
                  Docs that teach the runtime, not just the API.
                </div>
                <p className="text-[15px] leading-7 text-[var(--muted)]">
                  Copy real examples, understand the runtime, and ship faster.
                </p>
              </div>
            </Card>
            <Card>
              <div className="space-y-4">
                <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                  What ships
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Syntax-highlighted code",
                    "Copy buttons",
                    "Step-by-step guides",
                    "API references",
                    "Runtime patterns",
                  ].map((item) => (
                    <Badge key={item} className="bg-white/[0.03] text-white">
                      {item}
                    </Badge>
                  ))}
                </div>
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
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {openSourceRepos.map((repo) => (
              <Card
                key={repo.name}
                className="flex h-full flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge>{repo.badge}</Badge>
                    <SiNpm className="size-4 text-[var(--muted)]" />
                  </div>
                  <div>
                    <div className="text-xl font-medium text-white">
                      {repo.name}
                    </div>
                    <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">
                      {repo.description}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-5 text-sm text-[var(--muted)]">
                  {/* <span>{repo.stars} stars</span> */}
                  <a
                    className="text-[var(--primary)] underline-offset-4 hover:underline"
                    href="https://github.com"
                  >
                    View Package
                  </a>
                </div>
              </Card>
            ))}
          </div>
          {/* <Card>
            <div className="space-y-6">
              <div className="space-y-3">
                <Badge>Repository health</Badge>
                <div className="text-2xl font-medium tracking-[-0.03em] text-white">
                  Healthy repositories are a signal of healthy infrastructure.
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Stat value="MIT" label="License" />
                <Stat value="15k+" label="Combined stars" />
              </div>
              <NewsletterLikeCTA />
            </div>
          </Card> */}
        </div>
      </Section>

      <Section
        id="roadmap"
        eyebrow="Roadmap"
        title="Growing the runtime, not the complexity."
        description="Every release strengthens reliability, observability, and developer experience."
      >
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">
                Now
              </div>
              <div className="text-2xl font-medium tracking-[-0.03em] text-white">
                A stable runtime for production AI agents.
              </div>
              <p className="text-[15px] leading-7 text-[var(--muted)]">
                Focused on reliability first, with new capabilities added only
                when they strengthen the runtime.
              </p>
            </div>
          </Card>
          <Card>
            <div className="space-y-5">
              {roadmapItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-black/20 p-4"
                >
                  <div className="flex size-9 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.03] text-sm text-[var(--muted)]">
                    0{index + 1}
                  </div>
                  <div className="text-sm leading-7 text-white">{item}</div>
                </div>
              ))}
            </div>
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
              className="group rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-6"
            >
              <summary className="cursor-pointer list-none text-lg font-medium tracking-[-0.02em] text-white">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <ArrowRight className="size-4 shrink-0 text-[var(--muted)] transition group-open:rotate-90" />
                </span>
              </summary>
              <p className="mt-4 text-[15px] leading-7 text-[var(--muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="cta" className="pb-28">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,160,23,0.16),transparent_40%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-5">
              <Badge className="border-[rgba(212,160,23,0.35)] bg-[rgba(212,160,23,0.06)] text-[var(--primary)]">
                Get started
              </Badge>
              <h2 className="max-w-3xl text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Ship an agent platform your team can actually maintain.
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Build AI systems your team can understand, inspect, and evolve
                over time.
              </p>
              <WaitlistCount />
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Button
                onClick={() => setWaitlistOpen(true)}
                className="w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                href="#developer-experience"
                className="w-full sm:w-auto"
              >
                Read the Docs
                <BookOpen className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      </Section>

      <footer className="border-t border-[var(--border)] py-8">
        <Container>
          <div className="flex flex-col gap-4 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
            <div>Cheela</div>
            <div className="flex flex-wrap gap-6">
              <a href="#problem" className="transition hover:text-white">
                Problem
              </a>
              <a href="#architecture" className="transition hover:text-white">
                Architecture
              </a>
              <a
                href="#developer-platform"
                className="transition hover:text-white"
              >
                Developer Platform
              </a>
              <button
                type="button"
                onClick={() => setWaitlistOpen(true)}
                className="transition hover:text-white"
              >
                Get Started
              </button>
            </div>
            <div>Runtime infrastructure for reliable AI agents.</div>
          </div>
        </Container>
      </footer>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </main>
  );
}
