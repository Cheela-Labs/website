import type { Metadata } from "next";

const fallbackOrigin = "http://localhost:3000";

export const siteName = "Cheela";
export const siteDescription =
  "Cheela is an open platform for building reliable AI agents.";
export const siteKeywords = [
  "Cheela",
  "AI agents",
  "agent runtime",
  "developer infrastructure",
  "observability",
  "runtime policy",
  "TypeScript",
];

function normalizeOrigin(value: string) {
  try {
    return new URL(value).origin;
  } catch {
    try {
      return new URL(`https://${value}`).origin;
    } catch {
      return fallbackOrigin;
    }
  }
}

export function getSiteOrigin() {
  const siteUrl = process.env.SITE_URL?.trim();

  if (siteUrl) {
    return normalizeOrigin(siteUrl);
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();

  if (vercelUrl) {
    return normalizeOrigin(
      vercelUrl.startsWith("http") ? vercelUrl : `https://${vercelUrl}`,
    );
  }

  return fallbackOrigin;
}

export function getSiteUrl(pathname = "/") {
  return new URL(pathname, getSiteOrigin()).toString();
}

export function getVerificationMetadata(): Metadata["verification"] {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim();
  const yandex = process.env.YANDEX_VERIFICATION?.trim();

  const verification: Metadata["verification"] = {};

  if (google) {
    verification.google = google;
  }

  if (yandex) {
    verification.yandex = yandex;
  }

  if (bing) {
    verification.other = {
      ...(verification.other ?? {}),
      "msvalidate.01": bing,
    };
  }

  return Object.keys(verification).length > 0 ? verification : undefined;
}



export const seo = {
  site: {
    name: "Cheela Labs",
    shortName: "Cheela",
    title: "Cheela Labs | Infrastructure for AI Agents",
    description:
      "Build production-ready AI agents with provider-agnostic runtimes, SDKs, and developer infrastructure.",
    url: "https://www.cheelalabs.com/",
    domain: "cheelalabs.com",
    locale: "en_US",
    language: "en",
    themeColor: "#0A0A0A",
  },

  social: {
    github: "https://github.com/Cheela-Labs",
    linkedin: "https://www.linkedin.com/company/cheela-labs",
    x: "https://x.com/CheelaLabs",
  },

  images: {
    og: "/og.png",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  company: {
    legalName: "Cheela Labs",
    foundingDate: "2026",
    email: "Contact@cheelalabs.com",
  },

  keywords: [
    "AI",
    "Artificial Intelligence",
    "AI Infrastructure",
    "AI Agents",
    "Agent Runtime",
    "Agent Framework",
    "Developer Tools",
    "TypeScript",
    "SDK",
    "Provider Agnostic",
    "OpenAI",
    "Anthropic",
    "Gemini",
    "MCP",
    "Model Context Protocol",
    "LangChain",
    "CrewAI",
    "Mastra",
    "LlamaIndex",
    "AI Runtime",
    "Agent SDK",
    "AI Platform",
    "AI Engineering",
    "Cheela",
    "Cheela Labs",
  ],

  links: {
    docs: "https://docs.cheelalabs.com",
    github: "https://github.com/cheela-labs",
    npm: "https://www.npmjs.com/org/cheela-labs",
  },

  authors: [
    {
      name: "Cheela Labs",
      url: "https://cheelalabs.com",
    },
  ],
} as const;