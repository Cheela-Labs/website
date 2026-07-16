Perform a comprehensive SEO audit and implementation for this Next.js application. Treat this as a production launch for a developer infrastructure company.

Requirements:

## General

- Follow modern Next.js App Router SEO best practices.
- Do NOT change the visual design or UI.
- Only modify SEO, metadata, structured data, robots, sitemap, canonical URLs, social metadata, and semantic improvements.
- Reuse existing components wherever possible.
- Keep everything strongly typed.

---

## Site URL

The canonical site URL must NEVER be hardcoded.

Read it from the environment variable:

SITE_URL

Example:

https://cheela.ai

Use this value for:

- metadataBase
- canonical URLs
- Open Graph URLs
- Twitter URLs
- sitemap
- robots
- structured data
- alternate links

If SITE_URL is missing, fail gracefully using localhost only in development.

---

## Metadata

Implement complete metadata using the App Router Metadata API.

Include:

- title template
- default title
- description
- keywords
- category
- creator
- publisher
- authors
- metadataBase
- robots
- alternates
- openGraph
- twitter
- icons
- applicationName

Avoid duplicate metadata.

---

## Open Graph

Generate proper Open Graph metadata.

Include:

- title
- description
- url
- siteName
- locale
- type
- images

Use an existing og image if present.

If none exists:

create an SEO-ready og image route using next/og.

---

## Twitter

Implement Twitter Card metadata.

Use:

summary_large_image

---

## Canonical URLs

Every page should have a canonical URL.

Never hardcode domains.

Use SITE_URL.

---

## Robots

Generate robots.txt using Next.js Metadata Route.

Allow crawling.

Reference sitemap.xml.

Disallow only internal/private routes if necessary.

---

## Sitemap

Generate sitemap.xml dynamically.

Include:

- homepage
- documentation pages
- blog pages
- any public routes

Use SITE_URL.

---

## Structured Data

Improve existing JSON-LD.

Use Schema.org.

Include:

Organization

WebSite

SoftwareApplication (if appropriate)

BreadcrumbList (where applicable)

Ensure JSON-LD is valid and generated server-side.

---

## Semantic HTML

Review markup and improve semantics.

Ensure:

one H1 per page

proper heading hierarchy

landmarks

header

main

nav

section

footer

buttons and links have accessible labels

images have alt text

---

## Performance SEO

Ensure:

preconnect where appropriate

proper image priority

metadata does not cause hydration issues

no duplicate titles

no duplicate descriptions

---

## Technical SEO

Check for:

missing canonical tags

duplicate metadata

invalid robots

broken metadataBase

incorrect OG URLs

missing favicon metadata

incorrect language declarations

---

## Verification

Support optional environment variables for:

GOOGLE_SITE_VERIFICATION

BING_SITE_VERIFICATION

YANDEX_VERIFICATION

Include verification metadata only if provided.

---

## Output

Make only production-quality SEO improvements.

Do not introduce unnecessary packages.

Do not modify styling.

Do not change the user experience.

Use Next.js native APIs wherever possible.

After implementation, summarize:

- files changed
- SEO improvements made
- any remaining recommendations