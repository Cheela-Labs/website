// src/lib/metadata.ts

import type { Metadata } from "next";
import { seo } from "./seo";

export function createMetadata(
  title?: string,
  description?: string,
): Metadata {
  const pageTitle = title
    ? `${title} | ${seo.site.name}`
    : seo.site.title;

  return {
    metadataBase: new URL(seo.site.url),

    title: pageTitle,

    description: description ?? seo.site.description,

    keywords: [...seo.keywords],

    authors: [...seo.authors],

    creator: seo.company.legalName,

    publisher: seo.company.legalName,

    applicationName: seo.site.name,

    alternates: {
      canonical: seo.site.url,
    },

    openGraph: {
      type: "website",
      locale: seo.site.locale,
      url: seo.site.url,
      siteName: seo.site.name,
      title: pageTitle,
      description: description ?? seo.site.description,
      images: [
        {
          url: seo.images.og,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description ?? seo.site.description,
      images: [seo.images.og],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const metadata = createMetadata();