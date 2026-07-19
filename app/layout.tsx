import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import JsonLd from "@/components/seo/json-ld";
import { createMetadata } from "@/lib/metadata";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = (
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    ""
  )
    .split(",")[0]
    .trim();
  const protocol = (requestHeaders.get("x-forwarded-proto") ?? "https")
    .split(",")[0]
    .trim();
  const requestOrigin = host ? `${protocol}://${host}` : undefined;

  return createMetadata(
    "Infrastructure for AI Agents",
    "Build production-ready AI agents with provider-agnostic runtimes, SDKs, and developer infrastructure.",
    requestOrigin,
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} bg-[var(--background)] text-[var(--foreground)] antialiased`}
      >
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
