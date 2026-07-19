"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "link";

const baseClassName =
  "group inline-flex min-h-11 items-center justify-center gap-1 whitespace-nowrap border border-transparent px-3 py-2 font-mono text-sm font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45";

const variantClasses: Record<Variant, string> = {
  primary:
    "text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--background)]",
  secondary:
    "text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]",
  outline:
    "text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-[var(--background)]",
  ghost:
    "text-[var(--muted)] hover:bg-[var(--foreground)] hover:text-[var(--background)]",
  link: "min-h-0 px-0 py-0 text-[var(--primary)] underline underline-offset-4 hover:bg-transparent hover:text-[var(--primary-hover)]",
};

type ButtonCommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

type ButtonAsButtonProps = ButtonCommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchorProps = ButtonCommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export function Button(props: ButtonAsButtonProps | ButtonAsAnchorProps) {
  const { children, variant = "primary", className, ...rest } = props;
  const classes = cn(baseClassName, variantClasses[variant], className);
  const content =
    variant === "link" ? (
      <>
        <span aria-hidden="true">&gt;</span>
        <span>{children}</span>
      </>
    ) : (
      <>
        <span aria-hidden="true">[</span>
        {variant === "primary" ? <span aria-hidden="true">►</span> : null}
        <span>{children}</span>
        <span aria-hidden="true">]</span>
      </>
    );

  if ("href" in props && props.href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a className={classes} {...anchorProps} href={props.href}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
