import { LandingPage } from "@/components/landing-page";
import {
  getSiteUrl,
  siteDescription,
  siteName,
} from "@/lib/seo";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": getSiteUrl("/#organization"),
    name: siteName,
    url: getSiteUrl("/"),
    description: siteDescription,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": getSiteUrl("/#website"),
    name: siteName,
    url: getSiteUrl("/"),
    description: siteDescription,
    publisher: {
      "@id": getSiteUrl("/#organization"),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": getSiteUrl("/#software-application"),
    name: siteName,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: getSiteUrl("/"),
    description: siteDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@id": getSiteUrl("/#organization"),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": getSiteUrl("/#breadcrumb"),
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: getSiteUrl("/"),
      },
    ],
  },
] as const;

export default function Page() {
  return (
    <>
      {structuredData.map((entry) => (
        <script
          key={entry["@id"]}
          type="application/ld+json"
        >
          {JSON.stringify(entry)}
        </script>
      ))}
      <LandingPage />
    </>
  );
}
