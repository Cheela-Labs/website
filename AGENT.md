# AGENT.md

# Cheela Website

## Mission

You are building the official website for **Cheela**, an open platform for building reliable AI agents.

This is **not** a marketing website.

It should feel like the homepage of a world-class developer infrastructure company.

Imagine if Stripe, Vercel, Linear, Raycast and Anthropic collaborated on a developer-first product.

The website should communicate engineering excellence, simplicity, precision and trust.

Avoid generic AI startup aesthetics.

---

# Philosophy

Everything should feel intentional.

Animations are subtle.

Whitespace is generous.

Typography is large.

The design should breathe.

Users should immediately think:

> "These people know what they're doing."

Never over-design.

Never add visual elements that don't contribute to the experience.

---

# Tech Stack

Use:

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Motion (motion.dev)
- shadcn/ui
- Radix UI
- Lucide React
- Simple Icons (brand icons)
- class-variance-authority
- tailwind-merge
- clsx
- Biome

Do not use CSS modules.

Do not use styled-components.

Do not use Chakra.

Do not use MUI.

Everything should be built with Tailwind.

---

# Code Quality

- Strict TypeScript
- Zero ESLint errors
- Zero Biome warnings
- Accessible components
- Semantic HTML
- Mobile-first
- Reusable components
- No duplicated styles
- No magic numbers
- No inline styles unless absolutely required

Every component should be composable.

---

# Theme

Dark mode only.

No light theme.

Background:

#090909

Surface:

#111111

Foreground:

#FAFAFA

Muted:

#A1A1AA

Border:

#232323

Primary:

#D4A017

Primary Hover:

#E4B328

Accent should only be used where attention is required.

Do not overuse yellow.

---

# Typography

Use Geist Sans.

Use Geist Mono for code.

Hero

80-96px

Section headings

48-56px

Body

18px

Small text

14px

Spacing should be generous.

---

# Radius

Buttons

9999px

Cards

24px

Inputs

16px

---

# Shadows

Very subtle.

Never use large blurry shadows.

---

# Layout

Container

max-width: 1400px

Section padding

128px

Card padding

32px

---

# Folder Structure

app/

components/
    ui/
    layout/
    sections/
    motion/
    animations/
    icons/

hooks/

lib/

styles/

public/

Every UI primitive should exist before sections are built.

---

# Design System

Create reusable components:

Button

Badge

Card

Section

Container

Grid

Typography

Divider

Glow

Grid Pattern

Code Block

Feature Card

Timeline

Accordion

Everything should be reusable.

---

# Motion

Motion is a first-class part of the design.

Never add random animations.

Every animation must have purpose.

Motion should feel:

- smooth
- premium
- deliberate
- expensive

Never bouncy.

Never playful.

Never exaggerated.

Use spring animations only where appropriate.

---

# Motion Principles

Entrance

Fade

Slide

Scale

Reveal

Stagger

Hover

Lift

Glow

Border

Cursor

Scroll

Parallax

Timeline growth

Line drawing

Architecture pulse

---

# Hero

Hero occupies 100vh.

Left:

Large headline.

Description.

Buttons.

Right:

Interactive runtime architecture.

Background:

Animated mustard beams.

Animated glow.

Noise.

Grid.

The hero should immediately communicate what Cheela is.

---

# Hero Animation

The yellow beams slowly push inward.

Very slow.

Continuous.

No flashing.

No rapid movement.

The runtime architecture contains a small pulse that travels:

Application

↓

Agent

↓

Runtime

↓

Capability

↓

Action

↓

Provider

↓

LLM

Every few seconds.

This becomes Cheela's signature animation.

---

# Navbar

Transparent.

Blurred.

Floating.

Rounded.

On scroll:

Increase blur.

Increase border opacity.

Reduce height slightly.

Navigation:

Docs

Blog

Open Source

About

GitHub

Get Started

---

# Sections

The homepage contains:

Hero

Problem

Solution

Architecture

Features

Developer Experience

Open Source

Roadmap

FAQ

CTA

Footer

Build each section independently.

---

# Developer Experience

Use syntax highlighted TypeScript.

Never screenshots.

Real code blocks.

Copy buttons.

---

# Open Source

Repository cards.

GitHub links.

MIT badge.

Statistics.

---

# Cards

Hover:

Small lift.

Border glow.

No large transforms.

---

# Buttons

Primary

Mustard

Secondary

Outline

Ghost

Transparent

Link

Underline

Hover animations should be subtle.

---

# Icons

Use Lucide.

Brand icons use Simple Icons.

---

# Images

Do not use stock images.

Do not use AI generated people.

Everything should be:

Diagrams

Architecture

Code

Illustrations

Geometry

---

# Visual Language

The website should feel industrial.

Minimal.

Technical.

Premium.

Precise.

Never playful.

---

# Inspiration

Stripe

Vercel

Linear

Raycast

Anthropic

GitHub

Do not copy layouts.

Take inspiration from:

Typography

Spacing

Motion

Quality

---

# Accessibility

Keyboard navigation.

Focus states.

ARIA where required.

Proper contrast.

Respect prefers-reduced-motion.

---

# Performance

Lighthouse target

100

Accessibility

100

Best Practices

100

SEO

100

Use lazy loading.

Avoid unnecessary JavaScript.

Minimize layout shift.

---

# SEO

Metadata

OpenGraph

Twitter Cards

JSON-LD

Sitemap

robots.txt

RSS

Canonical URLs

Structured data.

---

# Responsiveness

Desktop first.

Tablet.

Mobile.

No horizontal scrolling.

Every component must adapt.

---

# Animation Budget

Do not animate everything.

Motion should guide attention.

If an animation doesn't improve understanding, remove it.

---

# Design Goal

This website should not look like an AI startup.

It should look like the homepage of a company building the future infrastructure for AI agents.

Every interaction should reinforce reliability, craftsmanship and engineering excellence.