import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createMetadata } from "@/lib/metadata";
import JsonLd from "@/components/seo/json-ld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = createMetadata(
  "Cheela Labs | Infrastructure for AI Agents",
  "Build production-ready AI agents with provider-agnostic runtimes, SDKs, and developer infrastructure.",
);

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
        <JsonLd/>
      </body>
    </html>
  );
}
