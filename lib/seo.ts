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
