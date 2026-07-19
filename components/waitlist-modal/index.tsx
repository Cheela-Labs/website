"use client";

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialFormState);

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]",
        ) ?? [],
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => emailRef.current?.focus());

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open, onOpenChange]);

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

    if (status === "loading") return;

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

      const payload = (await response.json().catch(() => null)) as {
        error?: string;
        message?: string;
      } | null;

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-3 py-5 sm:px-6 sm:py-8">
      <button
        type="button"
        aria-label="Close waitlist modal"
        className="absolute inset-0 cursor-default bg-black/90"
        onClick={() => onOpenChange(false)}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative z-10 max-h-[calc(100vh-2.5rem)] w-[min(94vw,760px)] overflow-y-auto border-4 border-double border-[var(--primary)] bg-[var(--background)] text-[var(--foreground)]"
      >
        <div className="border-b border-[var(--border)] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[var(--primary)] sm:px-6">
          <span aria-hidden="true">┌─[ </span>
          JOIN WAITLIST
          <span aria-hidden="true"> ]</span>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
                STATUS://EARLY_ACCESS
              </p>
              <h2
                id={titleId}
                className="text-2xl font-semibold tracking-[-0.04em] sm:text-4xl"
              >
                <span aria-hidden="true" className="text-[var(--muted)]">
                  =={" "}
                </span>
                Get early access to Cheela.
                <span aria-hidden="true" className="text-[var(--muted)]">
                  {" "}
                  ==
                </span>
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
              onClick={() => onOpenChange(false)}
              className="shrink-0 px-2 py-2 text-sm font-semibold text-[var(--muted)] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
              aria-label="Close modal"
            >
              <span aria-hidden="true">[ X ]</span>
            </button>
          </div>

          {status === "success" ? (
            <output className="flex flex-col items-center gap-6 py-14 text-center">
              <div
                aria-hidden="true"
                className="border border-[var(--primary)] px-5 py-4 text-4xl font-semibold text-[var(--primary)]"
              >
                [ OK ]
              </div>
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--primary)]">
                  STATUS: ACCEPTED
                </p>
                <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                  You&apos;re on the list.
                </h3>
                <p className="text-[15px] leading-7 text-[var(--muted)]">
                  Check your inbox for a confirmation email. We&apos;ll keep you
                  updated as Cheela opens up.
                </p>
                {successMessage ? (
                  <p className="text-sm text-[var(--muted)]">
                    {successMessage}
                  </p>
                ) : null}
              </div>
              <Button onClick={() => onOpenChange(false)}>Done</Button>
            </output>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-5 min-[769px]:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    Name
                  </span>
                  <span className="flex items-center border border-[var(--border)] px-3 text-[var(--muted)] focus-within:border-[var(--primary)] focus-within:text-[var(--primary)]">
                    <span aria-hidden="true">[</span>
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
                      className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                    />
                    <span aria-hidden="true">]</span>
                  </span>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    Email *
                  </span>
                  <span className="flex items-center border border-[var(--border)] px-3 text-[var(--muted)] focus-within:border-[var(--primary)] focus-within:text-[var(--primary)]">
                    <span aria-hidden="true">[</span>
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
                      className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                    />
                    <span aria-hidden="true">]</span>
                  </span>
                </label>
              </div>

              <div className="grid gap-5 min-[769px]:grid-cols-2">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    Company / Project
                  </span>
                  <span className="flex items-center border border-[var(--border)] px-3 text-[var(--muted)] focus-within:border-[var(--primary)] focus-within:text-[var(--primary)]">
                    <span aria-hidden="true">[</span>
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
                      className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                    />
                    <span aria-hidden="true">]</span>
                  </span>
                </label>

                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-[var(--foreground)]">
                    What are you building?
                  </span>
                  <span className="flex border border-[var(--border)] px-3 text-[var(--muted)] focus-within:border-[var(--primary)] focus-within:text-[var(--primary)]">
                    <span aria-hidden="true" className="pt-3">
                      [
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
                      className="min-w-0 flex-1 resize-none bg-transparent px-2 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]"
                    />
                    <span aria-hidden="true" className="pt-3">
                      ]
                    </span>
                  </span>
                </label>
              </div>

              {status === "error" && error ? (
                <p
                  className="border border-[var(--primary)] px-4 py-3 text-sm text-[var(--primary)]"
                  role="alert"
                >
                  ERROR: {error}
                </p>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-dashed border-[var(--border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--muted)]">
                  We&apos;ll send a confirmation email right after you join.
                </p>
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "Loading..." : "Join Waitlist"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
