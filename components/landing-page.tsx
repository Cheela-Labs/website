"use client";

import {
  Activity,
  ArrowUpRight,
  Boxes,
  Braces,
  Check,
  CircleDot,
  Code2,
  Cpu,
  Eye,
  Gauge,
  type LucideIcon,
  Menu,
  Network,
  Orbit,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  Zap,
} from "lucide-react";
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
  { label: "Runtime", href: "#architecture" },
  { label: "Platform", href: "#developer-platform" },
  { label: "Developers", href: "#developer-experience" },
  { label: "Roadmap", href: "#roadmap" },
];

const architectureSteps = [
  { name: "Application", short: "APP", description: "Product request enters." },
  { name: "Agent", short: "AGT", description: "Intent and context resolve." },
  { name: "Policy", short: "PLY", description: "Guardrails are evaluated." },
  { name: "Runtime", short: "RUN", description: "Execution is coordinated." },
  { name: "Provider", short: "PRV", description: "The best model is routed." },
  { name: "Capability", short: "CAP", description: "Tools perform the work." },
  { name: "Action", short: "ACT", description: "A traceable result returns." },
];

const principles = [
  {
    title: "Modular",
    value: "14ms",
    label: "route latency",
    description:
      "Swap providers and capabilities without changing the product.",
  },
  {
    title: "Observable",
    value: "100%",
    label: "trace coverage",
    description: "See every decision, policy check, tool call, and retry.",
  },
  {
    title: "Controlled",
    value: "8/8",
    label: "policies active",
    description: "Keep permissions and approvals inside the execution path.",
  },
];

type Feature = {
  code: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "cyan" | "violet" | "lime" | "coral";
};

const featureCards: Feature[] = [
  {
    code: "CTRL",
    title: "Controlled execution",
    description:
      "Make routing, retries, timeouts, and approvals explicit for every run.",
    icon: ShieldCheck,
    tone: "cyan",
  },
  {
    code: "COMP",
    title: "Composable capabilities",
    description:
      "Assemble agents from small, typed capabilities instead of orchestration glue.",
    icon: Boxes,
    tone: "violet",
  },
  {
    code: "OBSV",
    title: "Runtime observability",
    description:
      "Follow state transitions, token usage, latency, and tool outcomes live.",
    icon: Eye,
    tone: "lime",
  },
  {
    code: "POLI",
    title: "Runtime policy",
    description:
      "Ship permissions and human checkpoints with the execution itself.",
    icon: Gauge,
    tone: "coral",
  },
  {
    code: "PROV",
    title: "Provider agnostic",
    description:
      "Route across OpenAI, Anthropic, Gemini, and whatever comes next.",
    icon: Orbit,
    tone: "violet",
  },
  {
    code: "DX",
    title: "Developer experience",
    description:
      "Use compact APIs, typed primitives, and examples that run as written.",
    icon: Code2,
    tone: "cyan",
  },
];

const solutionItems = [
  {
    label: "Provider agnostic",
    metric: "03",
    text: "Route across models without rewriting your application.",
    tone: "cyan",
  },
  {
    label: "Composable",
    metric: "∞",
    text: "Combine only the capabilities your product actually needs.",
    tone: "violet",
  },
  {
    label: "Observable",
    metric: "1:1",
    text: "Map every result back to its complete execution path.",
    tone: "lime",
  },
  {
    label: "Predictable",
    metric: "P99",
    text: "Keep control flow stable while models and providers change.",
    tone: "coral",
  },
];

const openSourceRepos = [
  {
    name: "@cheela/runtime",
    description:
      "Execution engine with policies, routing, retries, and full observability.",
    badge: "Core",
    health: 98,
    icon: Cpu,
  },
  {
    name: "@cheela/provider",
    description:
      "Drop-in provider adapters for OpenAI, Anthropic, Gemini, and more.",
    badge: "Package",
    health: 93,
    icon: Network,
  },
  {
    name: "@cheela/sdk",
    description:
      "TypeScript primitives for capabilities, actions, and agent runtimes.",
    badge: "Package",
    health: 96,
    icon: Braces,
  },
];

const roadmapItems = [
  ["LIVE", "Fine-grained capability policies"],
  ["LIVE", "Multi-provider routing with observability"],
  ["NEXT", "Human approval checkpoints"],
  ["NEXT", "Reusable runtime templates for teams"],
  ["LAB", "Enterprise audit export and retention"],
];

const faqItems = [
  {
    question: "Why does Cheela focus on runtime instead of prompting?",
    answer:
      "Prompts shape model behavior. A runtime makes the full system reliable by owning policy, routing, tools, retries, and observability around every model call.",
  },
  {
    question: "Can teams use their own model providers?",
    answer:
      "Yes. Cheela is provider-agnostic, so the model layer can change without forcing the rest of your agent architecture to change with it.",
  },
  {
    question: "Is Cheela opinionated about deployment?",
    answer:
      "It is opinionated about control and reliability, not where you run it. Cheela is designed to fit modern TypeScript and cloud workflows.",
  },
];

const runtimeCode = `import { createRuntime } from "@cheela/runtime";

const runtime = createRuntime({
  name: "support-agent",
  providers: ["anthropic", "openai"],
  capabilities: ["search", "summarize", "escalate"],
  policy: {
    approvals: ["payment", "deletion"],
    maxSteps: 8,
    trace: true,
  },
});

export async function handleRequest(input: string) {
  const run = await runtime.execute({ input });

  if (!run.allowed) return run.reason;
  return run.result;
}`;

function RuntimeOrbital() {
  return (
    <div
      className="hero-visual"
      role="img"
      aria-label="Live Cheela runtime visualization"
    >
      <div className="visual-chrome">
        <div className="chrome-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>CHEELA://RUNTIME_MAP</span>
        <span className="live-label">
          <i aria-hidden="true" />
          LIVE
        </span>
      </div>

      <div className="orbit-stage" aria-hidden="true">
        <div className="radar-sweep" />
        <div className="orbit-grid" />
        <div className="orbit-ring orbit-ring-one">
          <span className="satellite satellite-one">POLICY</span>
        </div>
        <div className="orbit-ring orbit-ring-two">
          <span className="satellite satellite-two">TOOLS</span>
          <span className="satellite satellite-three">MODEL</span>
        </div>
        <div className="orbit-ring orbit-ring-three" />
        <div className="runtime-core">
          <div className="core-pulse" />
          <Cpu size={24} />
          <span>CHEELA</span>
          <small>RUNTIME</small>
        </div>
        <span className="data-packet packet-one" />
        <span className="data-packet packet-two" />
        <span className="data-packet packet-three" />
      </div>

      <div className="visual-metrics">
        <div>
          <span>ROUTE</span>
          <strong>14.2ms</strong>
          <small className="tone-lime">↓ 18%</small>
        </div>
        <div>
          <span>TRACE</span>
          <strong>100%</strong>
          <small className="tone-cyan">complete</small>
        </div>
        <div>
          <span>POLICY</span>
          <strong>08</strong>
          <small className="tone-violet">active</small>
        </div>
      </div>
    </div>
  );
}

function RuntimeTrace() {
  return (
    <article className="runtime-window" data-reveal>
      <div className="visual-chrome">
        <div className="chrome-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>TRACE://REQ_8F21</span>
        <span className="live-label">
          <i aria-hidden="true" />
          STREAMING
        </span>
      </div>

      <div className="trace-telemetry">
        <div>
          <Badge tone="lime">System nominal</Badge>
          <h3>Every decision leaves a signal.</h3>
          <p>
            Watch a request move through policy, provider routing, tools, and
            the final action in real time.
          </p>
        </div>
        <div className="signal-graph" aria-hidden="true">
          {[44, 68, 52, 88, 74, 96, 63, 82, 70, 91, 58, 78].map(
            (height, index) => (
              <span
                key={height}
                style={
                  {
                    "--signal-height": `${height}%`,
                    "--signal-delay": `${index * 0.08}s`,
                  } as React.CSSProperties
                }
              />
            ),
          )}
          <div className="graph-scan" />
        </div>
      </div>

      <ol className="pipeline-track" aria-label="Execution pipeline">
        {architectureSteps.map((step, index) => (
          <li
            key={step.name}
            className={step.name === "Runtime" ? "is-runtime" : ""}
          >
            <span className="pipeline-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="pipeline-node">
              <i aria-hidden="true" />
            </span>
            <strong>{step.short}</strong>
            <small>{step.name}</small>
          </li>
        ))}
      </ol>

      <div className="trace-events">
        <p>
          <span className="tone-cyan">12:42:08.104</span>
          <span>provider.route</span>
          <strong>anthropic/claude</strong>
          <small className="tone-lime">PASS</small>
        </p>
        <p>
          <span className="tone-cyan">12:42:08.118</span>
          <span>policy.evaluate</span>
          <strong>capability.search</strong>
          <small className="tone-lime">ALLOW</small>
        </p>
        <p>
          <span className="tone-cyan">12:42:08.267</span>
          <span>action.complete</span>
          <strong>149ms total</strong>
          <small className="tone-violet">TRACED</small>
        </p>
      </div>
    </article>
  );
}

function FaultGraphic() {
  return (
    <div className="fault-graphic" aria-hidden="true">
      <div className="fault-grid">
        {[62, 48, 78, 36, 86, 30, 94, 42, 70].map((height, index) => (
          <span
            key={height}
            className={index > 4 ? "is-fault" : ""}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <div className="fault-callout">
        <Zap size={15} />
        POLICY GAP DETECTED
      </div>
      <div className="fault-footer">
        <span>UNTRACED CALLS</span>
        <strong>37.8%</strong>
      </div>
    </div>
  );
}

function NetworkGraphic() {
  return (
    <div className="network-graphic" aria-hidden="true">
      <div className="network-grid" />
      <div className="network-beam beam-one" />
      <div className="network-beam beam-two" />
      <div className="network-beam beam-three" />
      <div className="network-node node-app">APP</div>
      <div className="network-node node-agent">AGENT</div>
      <div className="network-node node-runtime">
        <Cpu size={19} />
        RUNTIME
      </div>
      <div className="network-node node-model">MODEL</div>
      <div className="network-node node-tools">TOOLS</div>
      <span className="network-packet net-packet-one" />
      <span className="network-packet net-packet-two" />
    </div>
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

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("reveal-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <div className="ambient-field" aria-hidden="true">
        <span className="ambient-orb ambient-orb-one" />
        <span className="ambient-orb ambient-orb-two" />
        <span className="ambient-orb ambient-orb-three" />
      </div>

      <header className="site-header">
        <Container>
          <nav aria-label="Primary navigation">
            <div className="nav-row">
              <a href="#top" className="brand-lockup">
                <span className="brand-mark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span>
                  <strong>CHEELA</strong>
                  <small>AGENT RUNTIME</small>
                </span>
              </a>

              <div className="desktop-links">
                {navLinks.map((item) => (
                  <a key={item.label} href={item.href}>
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="desktop-actions">
                <Button
                  variant="ghost"
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/Cheela-Labs/platform"
                >
                  <span aria-hidden="true">↗</span>
                  GitHub
                </Button>
                <Button onClick={() => setWaitlistOpen(true)}>
                  Get early access
                  <ArrowUpRight size={15} />
                </Button>
              </div>

              <button
                type="button"
                className="mobile-menu-button"
                aria-label={
                  menuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setMenuOpen((current) => !current)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

            {menuOpen ? (
              <div id="mobile-navigation" className="mobile-navigation">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>↳</span>
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://github.com/Cheela-Labs/platform"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>↳</span>
                  GitHub
                </a>
                <Button
                  onClick={() => {
                    setMenuOpen(false);
                    setWaitlistOpen(true);
                  }}
                >
                  Get early access
                </Button>
              </div>
            ) : null}
          </nav>
        </Container>
      </header>

      <main>
        <section id="top" className="hero-section">
          <Container>
            <div className="hero-layout">
              <div className="hero-copy" data-reveal>
                <Badge tone="cyan">
                  <Sparkles size={13} />
                  Infrastructure for reliable AI agents
                </Badge>

                <p className="hero-terminal-line" aria-hidden="true">
                  <span>cheela@runtime</span>:~$ initialize --production
                  <i className="terminal-cursor">█</i>
                </p>

                <h1>
                  Agents need
                  <br />
                  <span>a runtime.</span>
                </h1>
                <p className="hero-description">
                  Cheela sits between your application and every model, making
                  agent execution observable, predictable, and controllable.
                </p>

                <div className="hero-actions">
                  <Button onClick={() => setWaitlistOpen(true)}>
                    Start building
                    <ArrowUpRight size={16} />
                  </Button>
                  <Button variant="secondary" href="#architecture">
                    <CircleDot size={15} />
                    Explore the runtime
                  </Button>
                </div>

                <div className="hero-proof">
                  <div className="proof-avatars" aria-hidden="true">
                    <span>TS</span>
                    <span>PY</span>
                    <span>JS</span>
                  </div>
                  <p>
                    <strong>Provider agnostic.</strong>
                    <br />
                    Built for production teams.
                  </p>
                </div>
              </div>

              <div className="hero-graphic-wrap" data-reveal>
                <RuntimeOrbital />
              </div>
            </div>

            <div className="principle-grid" data-reveal>
              {principles.map((principle, index) => (
                <article key={principle.title}>
                  <div className="principle-topline">
                    <span>0{index + 1}</span>
                    <strong>{principle.title}</strong>
                    <i aria-hidden="true" />
                  </div>
                  <div className="principle-metric">
                    <strong>{principle.value}</strong>
                    <span>{principle.label}</span>
                  </div>
                  <p>{principle.description}</p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <Section
          id="problem"
          eyebrow="01 / Problem"
          title="Agent systems fail when execution goes dark."
          description="Teams can prototype quickly. Reliability collapses when policy, routing, retries, and tool execution live in different places."
        >
          <div className="split-layout">
            <Card label="Signal loss" className="overflow-hidden" data-reveal>
              <div className="content-graphic-grid">
                <div>
                  <Badge tone="coral">
                    <Activity size={13} />
                    Structural failure
                  </Badge>
                  <h3 className="card-heading">
                    The model is only one part of the system.
                  </h3>
                  <p className="card-copy">
                    Business logic disappears into prompts, observability
                    arrives too late, and every provider change introduces new
                    regressions.
                  </p>
                  <ul className="signal-list">
                    {[
                      "Output is not the same as execution intent.",
                      "Model calls need a runtime contract.",
                      "Policy cannot be scattered across the app.",
                    ].map((item) => (
                      <li key={item}>
                        <X size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <FaultGraphic />
              </div>
            </Card>

            <Card label="Recovered signal" className="outcome-card" data-reveal>
              <div className="outcome-orbit" aria-hidden="true">
                <span />
                <span />
                <ShieldCheck size={30} />
              </div>
              <h3 className="card-heading">
                One observable layer changes the equation.
              </h3>
              <p className="card-copy">
                Reliability becomes measurable, reviewable, and repeatable
                across every deployment.
              </p>
              <div className="outcome-status">
                <span>
                  <Check size={13} /> policies
                </span>
                <span>
                  <Check size={13} /> routing
                </span>
                <span>
                  <Check size={13} /> traces
                </span>
              </div>
            </Card>
          </div>
        </Section>

        <Section
          id="solution"
          eyebrow="02 / Runtime"
          title="Minimal APIs. Maximum signal."
          description="Opinionated where reliability matters. Flexible everywhere else."
        >
          <div className="solution-grid">
            {solutionItems.map((item) => (
              <article
                key={item.label}
                className={`solution-tile tile-${item.tone}`}
                data-reveal
              >
                <div className="solution-orbit" aria-hidden="true">
                  <span />
                  <span />
                </div>
                <span className="solution-metric">{item.metric}</span>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
                <div className="solution-line" aria-hidden="true" />
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="architecture"
          eyebrow="03 / Architecture"
          title="Execution you can actually see."
          description="Every request moves through one explicit path—from application intent to a traceable action."
        >
          <RuntimeTrace />

          <div className="architecture-grid">
            <Card label="Runtime topology" data-reveal>
              <NetworkGraphic />
            </Card>
            <Card label="Execution contract" data-reveal>
              <ol className="architecture-list">
                {architectureSteps.map((step, index) => (
                  <li key={step.name}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{step.name}</strong>
                      <small>{step.description}</small>
                    </div>
                    <i className={index < 4 ? "is-complete" : ""}>
                      {index < 4 ? <Check size={13} /> : null}
                    </i>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </Section>

        <Section
          id="features"
          eyebrow="04 / Capabilities"
          title="Reliability is the feature."
          description="Each part of the platform reinforces engineering clarity, execution control, and production confidence."
        >
          <div className="feature-grid">
            {featureCards.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  label={`MOD-${String(index + 1).padStart(2, "0")}`}
                  className={`feature-card tile-${feature.tone}`}
                  data-reveal
                >
                  <div className="feature-icon">
                    <Icon size={22} />
                    <span aria-hidden="true" />
                  </div>
                  <div className="feature-code">{feature.code}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <div className="feature-footer">
                    <span>STATUS</span>
                    <strong>
                      <i aria-hidden="true" /> ACTIVE
                    </strong>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>

        <Section
          id="developer-experience"
          eyebrow="05 / Developer experience"
          title="Real TypeScript. Live telemetry."
          description="Documentation that reads like production code, paired with the signals you need to trust it."
        >
          <div className="developer-layout">
            <CodeBlock
              title="createAgentRuntime.ts"
              language="TypeScript"
              copyText={runtimeCode}
              className="developer-code"
            >
              {runtimeCode}
            </CodeBlock>

            <div className="developer-console" data-reveal>
              <div className="visual-chrome">
                <div className="chrome-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <span>RUN://LATEST</span>
                <span className="tone-lime">SUCCESS</span>
              </div>
              <div className="console-score">
                <div className="score-ring">
                  <strong>98</strong>
                  <span>/100</span>
                </div>
                <div>
                  <Badge tone="lime">Healthy run</Badge>
                  <h3>Production ready</h3>
                  <p>All policies passed. No retries required.</p>
                </div>
              </div>
              <div className="console-bars">
                {[
                  ["Policy checks", "8 / 8", 100, "lime"],
                  ["Trace coverage", "100%", 100, "cyan"],
                  ["Provider health", "96%", 96, "violet"],
                  ["Token budget", "42%", 42, "coral"],
                ].map(([label, value, width, tone]) => (
                  <div key={label}>
                    <p>
                      <span>{label}</span>
                      <strong>{value}</strong>
                    </p>
                    <i>
                      <span
                        className={`tone-bg-${tone}`}
                        style={{ width: `${width}%` }}
                      />
                    </i>
                  </div>
                ))}
              </div>
              <div className="console-log">
                <p>
                  <span>✓</span> runtime initialized
                </p>
                <p>
                  <span>✓</span> capabilities registered
                </p>
                <p>
                  <span>✓</span> trace exported
                </p>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="developer-platform"
          eyebrow="06 / Open source"
          title="Engineering should be visible."
          description="Trust comes from transparent engineering, clear documentation, and code you can inspect."
        >
          <div className="repo-grid">
            {openSourceRepos.map((repo, index) => {
              const Icon = repo.icon;
              return (
                <Card
                  key={repo.name}
                  label={`PKG-${String(index + 1).padStart(2, "0")}`}
                  className="repo-card"
                  data-reveal
                >
                  <div className="repo-topline">
                    <span className="repo-icon">
                      <Icon size={19} />
                    </span>
                    <Badge tone={index === 0 ? "violet" : "cyan"}>
                      {repo.badge}
                    </Badge>
                  </div>
                  <h3>{repo.name}</h3>
                  <p>{repo.description}</p>
                  <div className="repo-health">
                    <p>
                      <span>PACKAGE HEALTH</span>
                      <strong>{repo.health}%</strong>
                    </p>
                    <i>
                      <span style={{ width: `${repo.health}%` }} />
                    </i>
                  </div>
                  <a href="https://github.com/Cheela-Labs">
                    View package <ArrowUpRight size={14} />
                  </a>
                </Card>
              );
            })}
          </div>
        </Section>

        <Section
          id="roadmap"
          eyebrow="07 / Roadmap"
          title="Grow the runtime, not the complexity."
          description="Every release strengthens reliability, observability, and developer experience."
        >
          <div className="roadmap-layout">
            <Card label="Signal" className="roadmap-intro" data-reveal>
              <Radar size={28} />
              <h3 className="card-heading">
                A stable runtime for production agents.
              </h3>
              <p className="card-copy">
                New capabilities enter the system only when they strengthen the
                execution contract.
              </p>
              <div className="radar-mini" aria-hidden="true">
                <span />
                <span />
                <span />
                <i />
              </div>
            </Card>

            <Card label="Release queue" data-reveal>
              <ol className="roadmap-list">
                {roadmapItems.map(([status, item], index) => (
                  <li key={item}>
                    <span>0{index + 1}</span>
                    <strong>{item}</strong>
                    <small className={`status-${status.toLowerCase()}`}>
                      {status}
                    </small>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </Section>

        <Section
          id="faq"
          eyebrow="08 / FAQ"
          title="Questions engineering teams ask."
          description="Direct answers about the runtime, architecture, and operating model."
        >
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <details key={item.question} data-reveal>
                <summary>
                  <span>0{index + 1}</span>
                  <strong>{item.question}</strong>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section id="cta" className="cta-section">
          <div className="cta-panel" data-reveal>
            <div className="cta-grid" aria-hidden="true" />
            <div className="cta-orbit cta-orbit-one" aria-hidden="true" />
            <div className="cta-orbit cta-orbit-two" aria-hidden="true" />
            <div className="cta-copy">
              <Badge tone="lime">
                <Workflow size={13} />
                Runtime online
              </Badge>
              <h2>Build agents your team can trust.</h2>
              <p>
                Ship AI systems your team can understand, inspect, and evolve
                over time.
              </p>
              <div className="hero-actions">
                <Button onClick={() => setWaitlistOpen(true)}>
                  Get early access
                  <ArrowUpRight size={16} />
                </Button>
                <Button variant="secondary" href="#developer-experience">
                  Read the code
                </Button>
              </div>
            </div>
            <div className="cta-stats">
              <WaitlistCount />
              <div className="cta-status-row">
                <span>
                  <i className="tone-bg-lime" /> Core runtime
                </span>
                <strong>OPERATIONAL</strong>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="site-footer">
        <Container>
          <div className="footer-grid">
            <div>
              <a href="#top" className="brand-lockup">
                <span className="brand-mark" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </span>
                <span>
                  <strong>CHEELA</strong>
                  <small>AGENT RUNTIME</small>
                </span>
              </a>
              <p>Runtime infrastructure for reliable AI agents.</p>
            </div>
            <nav aria-label="Footer navigation">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="footer-status">
              <span>
                <i /> ALL SYSTEMS OPERATIONAL
              </span>
              <small>© 2026 CHEELA LABS</small>
            </div>
          </div>
        </Container>
      </footer>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
