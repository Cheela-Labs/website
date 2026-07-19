"use client";

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "link";

const baseClassName =
  "group inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap border px-4 py-2.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.1em] transition-colors duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-45";

const variantClasses: Record<Variant, string> = {
  primary:
    "border-[var(--primary)] bg-[var(--primary)] text-[var(--background)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)]",
  secondary:
    "border-[var(--border-bright)] bg-transparent text-[var(--foreground)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]",
  outline:
    "border-[var(--border-bright)] bg-transparent text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
  ghost:
    "border-transparent bg-transparent text-[var(--muted)] hover:border-[var(--border)] hover:text-[var(--foreground)]",
  link: "min-h-0 border-0 px-0 py-0 text-[var(--primary)] hover:bg-transparent hover:text-[var(--primary-hover)]",
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

  if ("href" in props && props.href) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

    return (
      <a className={classes} {...anchorProps} href={props.href}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
