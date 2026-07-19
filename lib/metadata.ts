// src/lib/metadata.ts

import type { Metadata } from "next";
import { seo } from "./seo";

export function createMetadata(
  title?: string,
  description?: string,
  origin: string = seo.site.url,
): Metadata {
  const pageTitle = title ? `${title} | ${seo.site.name}` : seo.site.title;
  const metadataBase = new URL(origin);
  const canonical = new URL("/", metadataBase).toString();
  const socialImage = new URL(seo.images.og, metadataBase).toString();

  return {
    metadataBase,

    title: pageTitle,

    description: description ?? seo.site.description,

    keywords: [...seo.keywords],

    authors: [...seo.authors],

    creator: seo.company.legalName,

    publisher: seo.company.legalName,

    applicationName: seo.site.name,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "website",
      locale: seo.site.locale,
      url: canonical,
      siteName: seo.site.name,
      title: pageTitle,
      description: description ?? seo.site.description,
      images: [
        {
          url: socialImage,
          width: 1731,
          height: 909,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description ?? seo.site.description,
      images: [socialImage],
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
