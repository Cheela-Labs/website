import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  getSiteOrigin,
  getSiteUrl,
  getVerificationMetadata,
  siteDescription,
  siteKeywords,
  siteName,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteOrigin()),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  applicationName: siteName,
  authors: [{ name: siteName }],
  category: "technology",
  creator: siteName,
  alternates: {
    canonical: getSiteUrl("/"),
    languages: {
      "en-US": getSiteUrl("/"),
    },
  },
  description: siteDescription,
  keywords: siteKeywords,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteName,
    description: siteDescription,
    url: getSiteUrl("/"),
    siteName,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: getSiteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteName} - runtime infrastructure for reliable AI agents`,
      },
    ],
  },
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: getVerificationMetadata(),
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: [getSiteUrl("/opengraph-image")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
