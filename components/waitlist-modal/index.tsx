"use client";

import { CheckCircle2, Loader2, Sparkles, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type WaitlistModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormState = {
  name: string;
  email: string;
  company: string;
  building: string;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  company: "",
  building: "",
};

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const emailRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const reducedMotion = useReducedMotion();
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialFormState);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    if (open) {
      window.requestAnimationFrame(() => {
        emailRef.current?.focus();
      });
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setError(null);
      setSuccessMessage(null);
      setForm(initialFormState);
    }
  }, [open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            error?: string;
            message?: string;
          }
        | null;

      if (!response.ok) {
        throw new Error(payload?.error ?? "Unable to join the waitlist.");
      }

      setStatus("success");
      setSuccessMessage(payload?.message ?? "You're on the list.");
    } catch (submissionError) {
      setStatus("error");
      setSuccessMessage(null);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to join the waitlist.",
      );
    }
  }

  function closeModal() {
    onOpenChange(false);
  }

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
      <button
        type="button"
        aria-label="Close waitlist modal"
        className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-xl"
        onClick={closeModal}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 w-[min(92vw,760px)] overflow-hidden rounded-[32px] border border-[var(--border)] bg-[#0b0b0b] text-white shadow-[0_40px_140px_rgba(0,0,0,0.55)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,160,23,0.18),transparent_42%)]" />
        <div className="relative p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(212,160,23,0.28)] bg-[rgba(212,160,23,0.08)] px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[var(--primary)]">
                <Sparkles className="size-3.5" />
                Join waitlist
              </div>
              <h2
                id={titleId}
                className="text-3xl font-medium tracking-[-0.05em] sm:text-4xl"
              >
                Get early access to Cheela.
              </h2>
              <p
                id={descriptionId}
                className="max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base"
              >
                Tell us what you are building and we will send a confirmation
                email as soon as you join.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="inline-flex size-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/[0.03] text-white transition hover:border-[rgba(228,179,40,0.28)] hover:bg-white/[0.06]"
              aria-label="Close modal"
            >
              <X className="size-4" />
            </button>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center gap-6 py-16 text-center">
              <motion.div
                initial={reducedMotion ? { opacity: 1 } : { scale: 0.78, opacity: 0 }}
                animate={reducedMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="relative flex size-24 items-center justify-center rounded-full border border-[rgba(212,160,23,0.3)] bg-[rgba(212,160,23,0.08)]"
              >
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-[rgba(212,160,23,0.22)]"
                  animate={
                    reducedMotion
                      ? undefined
                      : { scale: [1, 1.12, 1], opacity: [0.5, 0.15, 0.5] }
                  }
                  transition={
                    reducedMotion
                      ? undefined
                      : {
                          duration: 2.8,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }
                  }
                />
                <CheckCircle2 className="size-12 text-[var(--primary)]" />
              </motion.div>
              <div className="space-y-3">
                <h3 className="text-2xl font-medium tracking-[-0.04em]">
                  You&apos;re on the list.
                </h3>
                <p className="text-[15px] leading-7 text-[var(--muted)]">
                  Check your inbox for a confirmation email. We&apos;ll keep you
                  updated as Cheela opens up.
                </p>
                {successMessage ? (
                  <p className="text-sm text-[var(--muted)]">{successMessage}</p>
                ) : null}
              </div>
              <Button variant="primary" onClick={closeModal} className="min-w-40">
                Done
              </Button>
            </div>
          ) : (
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-1">
                  <span className="text-sm font-medium text-white">Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    className="w-full rounded-[16px] border border-[var(--border)] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[var(--muted)] focus:border-[rgba(228,179,40,0.35)] focus:ring-2 focus:ring-[rgba(228,179,40,0.12)]"
                  />
                </label>
                <label className="space-y-2 sm:col-span-1">
                  <span className="text-sm font-medium text-white">Email *</span>
                  <input
                    ref={emailRef}
                    type="email"
                    required
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="you@company.com"
                    className="w-full rounded-[16px] border border-[var(--border)] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[var(--muted)] focus:border-[rgba(228,179,40,0.35)] focus:ring-2 focus:ring-[rgba(228,179,40,0.12)]"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 sm:col-span-1">
                  <span className="text-sm font-medium text-white">
                    Company / Project
                  </span>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        company: event.target.value,
                      }))
                    }
                    placeholder="Acme / Side project"
                    className="w-full rounded-[16px] border border-[var(--border)] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[var(--muted)] focus:border-[rgba(228,179,40,0.35)] focus:ring-2 focus:ring-[rgba(228,179,40,0.12)]"
                  />
                </label>
                <label className="space-y-2 sm:col-span-1">
                  <span className="text-sm font-medium text-white">
                    What are you building?
                  </span>
                  <textarea
                    rows={4}
                    value={form.building}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        building: event.target.value,
                      }))
                    }
                    placeholder="Autonomous workflows, support agents, internal tooling..."
                    className="w-full resize-none rounded-[16px] border border-[var(--border)] bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[var(--muted)] focus:border-[rgba(228,160,23,0.35)] focus:ring-2 focus:ring-[rgba(228,160,23,0.12)]"
                  />
                </label>
              </div>

              {status === "error" && error ? (
                <p className="rounded-[16px] border border-[rgba(239,68,68,0.22)] bg-[rgba(239,68,68,0.08)] px-4 py-3 text-sm text-[#fca5a5]">
                  {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--muted)]">
                  We&apos;ll send a confirmation email right after you join.
                </p>
                <Button type="submit" className="min-w-44" disabled={status === "loading"}>
                  {status === "loading" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Join Waitlist
                      <CheckCircle2 className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
