import { seo } from "./seo";

export const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${seo.site.url}/#organization`,

    name: "Cheela Labs",
    url: seo.site.url,
    logo: `${seo.site.url}${seo.images.logo}`,
    description: seo.site.description,

    sameAs: [seo.social.github, seo.social.linkedin, seo.social.x],
  },

  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${seo.site.url}/#website`,

    url: seo.site.url,
    name: "Cheela Labs",
    description: seo.site.description,

    publisher: {
      "@id": `${seo.site.url}/#organization`,
    },
  },

  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${seo.site.url}/#software`,

    name: "Cheela",
    url: seo.site.url,
    description: seo.site.description,

    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",

    publisher: {
      "@id": `${seo.site.url}/#organization`,
    },
  },
];
