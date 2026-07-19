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
  { label: "Runtime", href: "#runtime" },
  { label: "Architecture", href: "#architecture" },
  { label: "Developers", href: "#developers" },
  { label: "Open source", href: "#open-source" },
];

const principles = [
  {
    number: "01",
    title: "Provider agnostic",
    description:
      "Change the model without changing how the rest of your product executes.",
    note: "Routing is a runtime concern",
  },
  {
    number: "02",
    title: "Composable",
    description:
      "Build agents from small capabilities with clear inputs, outputs, and ownership.",
    note: "Typed boundaries over glue",
  },
  {
    number: "03",
    title: "Observable",
    description:
      "Trace the decision, policy check, model call, tool result, and final action.",
    note: "Nothing disappears in a prompt",
  },
  {
    number: "04",
    title: "Controlled",
    description:
      "Put approvals, permissions, retries, and limits in one execution contract.",
    note: "Policy travels with the run",
  },
];

const architectureSteps = [
  {
    label: "Application",
    code: "APP",
    description: "Product intent enters the system.",
  },
  {
    label: "Agent",
    code: "AGT",
    description: "Context and next action resolve.",
  },
  {
    label: "Cheela runtime",
    code: "RUN",
    description: "Policy, routing, and execution converge.",
  },
  {
    label: "Provider + tools",
    code: "EXT",
    description: "The selected capability does the work.",
  },
  {
    label: "Action",
    code: "OUT",
    description: "A traceable result returns.",
  },
];

const features = [
  {
    id: "policy",
    index: "01",
    title: "Policy before execution",
    description:
      "Evaluate permissions and human checkpoints before a capability can run.",
  },
  {
    id: "routing",
    index: "02",
    title: "Routing without lock-in",
    description:
      "Choose providers by workload, policy, latency, or cost—not framework constraints.",
  },
  {
    id: "trace",
    index: "03",
    title: "A complete execution trace",
    description:
      "See every transition from request to action in one ordered timeline.",
  },
  {
    id: "capability",
    index: "04",
    title: "Capabilities with contracts",
    description:
      "Keep tools small, typed, testable, and reusable across every agent.",
  },
];

const repos = [
  {
    name: "@cheela/runtime",
    type: "CORE",
    description: "Execution engine, policy, routing, retries, and traces.",
  },
  {
    name: "@cheela/provider",
    type: "ADAPTERS",
    description: "Provider interfaces for OpenAI, Anthropic, Gemini, and more.",
  },
  {
    name: "@cheela/sdk",
    type: "TYPESCRIPT",
    description: "Primitives for capabilities, actions, and agent runtimes.",
  },
];

const roadmap = [
  ["SHIPPING", "Fine-grained capability policies"],
  ["SHIPPING", "Multi-provider routing with execution traces"],
  ["NEXT", "Human approval checkpoints"],
  ["NEXT", "Reusable runtime templates for teams"],
  ["LATER", "Audit export and retention controls"],
];

const faqItems = [
  {
    question: "Why focus on runtime instead of prompting?",
    answer:
      "Prompts shape model behavior. A runtime makes the whole system reliable by owning policy, routing, tools, retries, and observability around each call.",
  },
  {
    question: "Can we use our own model providers?",
    answer:
      "Yes. Cheela is provider-agnostic. The model layer can change without forcing the rest of the agent architecture to change with it.",
  },
  {
    question: "Is Cheela opinionated about deployment?",
    answer:
      "Cheela is opinionated about control and reliability, not where you run it. It is designed to fit modern TypeScript and cloud workflows.",
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
  },
});

export async function handleRequest(input: string) {
  const run = await runtime.execute({ input });

  if (!run.allowed) return run.reason;
  return run.result;
}`;

function BrandMark() {
  return (
    <span className="wordmark">
      <span aria-hidden="true">C/</span>
      <span>
        <strong>CHEELA</strong>
        <small>RUNTIME SYSTEMS</small>
      </span>
    </span>
  );
}

function ExecutionBlueprint() {
  return (
    <figure className="execution-blueprint" aria-labelledby="blueprint-title">
      <div className="blueprint-header">
        <span id="blueprint-title">EXECUTION PLAN / 001</span>
        <span>SPEC: CURRENT</span>
      </div>

      <div className="blueprint-stage">
        <div className="bp-coordinates" aria-hidden="true">
          <span>00</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
          <span>80</span>
        </div>

        <fieldset className="bp-flow" aria-label="Application to action flow">
          <div className="bp-node bp-app">
            <span>01</span>
            <strong>APPLICATION</strong>
            <small>request()</small>
          </div>

          <div className="bp-connector" aria-hidden="true">
            <span className="bp-packet" />
          </div>

          <div className="bp-node bp-runtime">
            <div className="bp-runtime-title">
              <span>02</span>
              <strong>CHEELA RUNTIME</strong>
            </div>
            <div className="bp-runtime-layers">
              <span>POLICY</span>
              <span>ROUTING</span>
              <span>TRACE</span>
            </div>
          </div>

          <div className="bp-connector" aria-hidden="true" />

          <div className="bp-output-stack">
            <div className="bp-node">
              <span>03A</span>
              <strong>PROVIDER</strong>
            </div>
            <div className="bp-node">
              <span>03B</span>
              <strong>CAPABILITY</strong>
            </div>
          </div>
        </fieldset>

        <div className="bp-result">
          <span>RETURN</span>
          <strong>ACTION + TRACE</strong>
          <small>deterministic boundary</small>
        </div>
      </div>

      <figcaption>
        <span>ONE REQUEST</span>
        <span>ONE EXECUTION CONTRACT</span>
        <span>ONE COMPLETE TRACE</span>
      </figcaption>
    </figure>
  );
}

function FailureStack() {
  return (
    <fieldset
      className="failure-stack"
      aria-label="Common agent failure pattern"
    >
      <div className="failure-label">CURRENT STATE</div>
      {[
        ["PROMPT", "business logic"],
        ["GLUE", "routing + retries"],
        ["TOOL", "permissions"],
        ["LOGS", "partial context"],
      ].map(([name, issue], index) => (
        <div className="failure-row" key={name}>
          <span>0{index + 1}</span>
          <strong>{name}</strong>
          <small>{issue}</small>
          <i aria-hidden="true">{index % 2 === 0 ? "↘" : "↗"}</i>
        </div>
      ))}
      <div className="failure-output">
        <span>RESULT</span>
        <strong>UNKNOWN STATE</strong>
      </div>
    </fieldset>
  );
}

function ArchitectureMap() {
  return (
    <div className="architecture-map">
      <div className="architecture-ruler" aria-hidden="true">
        <span>IN</span>
        <span>CONTROL PLANE</span>
        <span>OUT</span>
      </div>
      <ol>
        {architectureSteps.map((step, index) => (
          <li
            key={step.label}
            className={step.code === "RUN" ? "architecture-runtime" : ""}
          >
            <span className="architecture-code">{step.code}</span>
            <strong>{step.label}</strong>
            <p>{step.description}</p>
            <small>0{index + 1}</small>
            {index < architectureSteps.length - 1 ? (
              <i className="architecture-link" aria-hidden="true">
                <span className={index === 1 ? "architecture-packet" : ""} />
              </i>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="architecture-legend">
        <span>
          <i /> request path
        </span>
        <span>RUN = runtime control boundary</span>
        <span>TRACE_ID: 7A21-C</span>
      </div>
    </div>
  );
}

function FeatureGraphic({ type }: { type: string }) {
  if (type === "policy") {
    return (
      <div className="micro-graphic micro-policy" aria-hidden="true">
        <span>read:customer</span>
        <i>ALLOW</i>
        <span>delete:account</span>
        <i>REVIEW</i>
        <span>send:payment</span>
        <i>DENY</i>
      </div>
    );
  }

  if (type === "routing") {
    return (
      <div className="micro-graphic micro-routing" aria-hidden="true">
        <span>REQUEST</span>
        <i>→</i>
        <div>
          <b>MODEL A</b>
          <b>MODEL B</b>
          <b>MODEL C</b>
        </div>
      </div>
    );
  }

  if (type === "trace") {
    return (
      <div className="micro-graphic micro-trace" aria-hidden="true">
        {[18, 42, 28, 66, 38, 84, 54, 92].map((height) => (
          <i key={height} style={{ height: `${height}%` }} />
        ))}
        <span />
      </div>
    );
  }

  return (
    <div className="micro-graphic micro-capability" aria-hidden="true">
      <span>{"{"}</span>
      <div>
        <b>input:</b> typed
        <br />
        <b>policy:</b> attached
        <br />
        <b>output:</b> traced
      </div>
      <span>{"}"}</span>
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
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <Container>
          <nav className="site-nav" aria-label="Primary navigation">
            <a href="#top" aria-label="Cheela home">
              <BrandMark />
            </a>

            <div className="nav-links">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </div>

            <div className="nav-actions">
              <a
                href="https://github.com/Cheela-Labs"
                target="_blank"
                rel="noreferrer"
              >
                GitHub ↗
              </a>
              <Button onClick={() => setWaitlistOpen(true)}>Get access</Button>
            </div>

            <button
              type="button"
              className="menu-toggle"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? "CLOSE ×" : "MENU +"}
            </button>
          </nav>

          {menuOpen ? (
            <div id="mobile-menu" className="mobile-menu">
              {navLinks.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>0{index + 1}</span>
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setWaitlistOpen(true);
                }}
              >
                05 / GET ACCESS
              </button>
            </div>
          ) : null}
        </Container>
      </header>

      <main>
        <section className="hero" id="top">
          <Container>
            <div className="hero-grid">
              <div className="hero-copy" data-reveal>
                <Badge tone="coral">Agent infrastructure / v0.1</Badge>
                <h1>
                  The runtime
                  <br />
                  <span>is the product.</span>
                </h1>
                <p>
                  Cheela turns agent execution into a system your team can
                  inspect, control, and maintain—not another layer of prompt
                  glue.
                </p>
                <div className="hero-actions">
                  <Button onClick={() => setWaitlistOpen(true)}>
                    Start building ↗
                  </Button>
                  <Button variant="secondary" href="#architecture">
                    Read the execution plan
                  </Button>
                </div>
                <div className="hero-command">
                  <span>$</span>
                  <code>npx cheela init support-agent</code>
                  <i className="terminal-cursor" aria-hidden="true">
                    █
                  </i>
                </div>
              </div>

              <div data-reveal>
                <ExecutionBlueprint />
              </div>
            </div>
          </Container>

          <section className="system-strip" aria-label="Supported providers">
            <div>
              <span>RUNTIME STATUS: ACTIVE</span>
              <span>OPENAI</span>
              <span>ANTHROPIC</span>
              <span>GEMINI</span>
              <span>ANY PROVIDER</span>
              <span>POLICY: ATTACHED</span>
              <span>TRACE: COMPLETE</span>
              <span aria-hidden="true">RUNTIME STATUS: ACTIVE</span>
              <span aria-hidden="true">OPENAI</span>
              <span aria-hidden="true">ANTHROPIC</span>
              <span aria-hidden="true">GEMINI</span>
              <span aria-hidden="true">ANY PROVIDER</span>
            </div>
          </section>
        </section>

        <Section
          id="problem"
          eyebrow="01 / Problem"
          title="A prompt is not an operating model."
          description="When runtime concerns are scattered across prompts, application code, and provider SDKs, no one owns the complete execution."
        >
          <div className="problem-grid">
            <div className="problem-statement" data-reveal>
              <p className="statement-mark" aria-hidden="true">
                ≠
              </p>
              <blockquote>
                Prototype speed hides production complexity.
              </blockquote>
              <p>
                Model output, execution intent, permissions, retries, and
                business state are different things. Treating them as one is
                where reliability breaks.
              </p>
            </div>
            <FailureStack />
          </div>
        </Section>

        <Section
          id="runtime"
          eyebrow="02 / Runtime principles"
          title="Small surface. Clear responsibility."
          description="Cheela owns the part between product intent and model or tool execution."
          className="paper-section"
        >
          <div className="principle-list">
            {principles.map((principle) => (
              <article key={principle.number} data-reveal>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
                <small>{principle.note}</small>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="architecture"
          eyebrow="03 / Architecture"
          title="One explicit execution path."
          description="The runtime is a boundary, not a black box. Every request passes through the same inspectable sequence."
        >
          <ArchitectureMap />
        </Section>

        <Section
          id="features"
          eyebrow="04 / Capabilities"
          title="Built around operating concerns."
          description="No magic. Just the controls engineering teams need when agents move beyond demos."
        >
          <div className="feature-grid">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className={`feature-panel feature-${feature.id}`}
                data-reveal
              >
                <div className="feature-meta">
                  <span>{feature.index}</span>
                  <small>RUNTIME MODULE</small>
                </div>
                <FeatureGraphic type={feature.id} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            ))}
          </div>
        </Section>

        <Section
          id="developers"
          eyebrow="05 / Developer experience"
          title="Code that explains the system."
          description="A compact API on one side. A complete execution record on the other."
          className="paper-section developer-section"
        >
          <div className="developer-grid">
            <CodeBlock
              title="createAgentRuntime.ts"
              language="TypeScript"
              copyText={runtimeCode}
            >
              {runtimeCode}
            </CodeBlock>

            <div className="trace-sheet" data-reveal>
              <div className="trace-sheet-header">
                <span>EXECUTION TRACE</span>
                <span>ID / 7A21-C</span>
              </div>
              <ol>
                {[
                  ["00:00.000", "runtime.start", "support-agent"],
                  ["00:00.006", "policy.check", "search / allow"],
                  ["00:00.014", "provider.route", "anthropic"],
                  ["00:00.742", "capability.run", "search"],
                  ["00:00.901", "runtime.finish", "action returned"],
                ].map(([time, event, value], index) => (
                  <li key={event}>
                    <span>{time}</span>
                    <i aria-hidden="true">{index === 4 ? "■" : "□"}</i>
                    <strong>{event}</strong>
                    <small>{value}</small>
                  </li>
                ))}
              </ol>
              <div className="trace-summary">
                <span>POLICIES 01/01</span>
                <span>RETRIES 00</span>
                <span>STEPS 05</span>
                <strong>COMPLETE</strong>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="open-source"
          eyebrow="06 / Open source"
          title="Inspect the infrastructure."
          description="The runtime, adapters, and SDK are built in the open."
        >
          <div className="repo-list" data-reveal>
            <div className="repo-list-header">
              <span>PACKAGE</span>
              <span>TYPE</span>
              <span>DESCRIPTION</span>
              <span>LINK</span>
            </div>
            {repos.map((repo, index) => (
              <a
                href="https://github.com/Cheela-Labs"
                key={repo.name}
                target="_blank"
                rel="noreferrer"
              >
                <span>0{index + 1}</span>
                <strong>{repo.name}</strong>
                <small>{repo.type}</small>
                <p>{repo.description}</p>
                <i>↗</i>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="roadmap"
          eyebrow="07 / Roadmap"
          title="Add capability, not complexity."
          description="The roadmap is ordered by operational value."
        >
          <div className="roadmap-grid">
            <div className="roadmap-note" data-reveal>
              <span>WORKING PRINCIPLE</span>
              <p>
                If a feature does not make execution more legible or
                controllable, it does not belong in the runtime.
              </p>
              <small>CHEELA / PRODUCT NOTE 004</small>
            </div>
            <ol className="roadmap-list" data-reveal>
              {roadmap.map(([status, item], index) => (
                <li key={item}>
                  <span>0{index + 1}</span>
                  <strong>{item}</strong>
                  <small className={`roadmap-${status.toLowerCase()}`}>
                    {status}
                  </small>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        <Section
          id="faq"
          eyebrow="08 / FAQ"
          title="The direct answers."
          description="What engineering teams usually ask first."
          className="paper-section"
        >
          <div className="faq-list">
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

        <section id="cta" className="cta">
          <Container>
            <div className="cta-grid">
              <div data-reveal>
                <Badge tone="coral">Early access</Badge>
                <h2>Build the runtime before the workaround.</h2>
                <p>
                  Ship agent systems your team can understand, inspect, and
                  evolve.
                </p>
                <div className="hero-actions">
                  <Button onClick={() => setWaitlistOpen(true)}>
                    Join the waitlist ↗
                  </Button>
                  <Button variant="secondary" href="#developers">
                    Read the code
                  </Button>
                </div>
              </div>
              <div className="cta-side">
                <WaitlistCount />
                <div className="cta-ascii" aria-hidden="true">
                  <pre>{`┌──────────────────┐
│  REQUEST         │
│     ↓            │
│  [ RUNTIME ]     │
│     ↓            │
│  ACTION + TRACE  │
└──────────────────┘`}</pre>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="site-footer">
        <Container>
          <div className="footer-grid">
            <div>
              <BrandMark />
              <p>Runtime infrastructure for reliable AI agents.</p>
            </div>
            <nav aria-label="Footer navigation">
              {navLinks.map((item) => (
                <a key={item.label} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="footer-meta">
              <span>CHEELA LABS / 2026</span>
              <span>BUILD SYSTEMS, NOT DEMOS.</span>
            </div>
          </div>
        </Container>
      </footer>

      <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
