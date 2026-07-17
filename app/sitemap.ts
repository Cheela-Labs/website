import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.cheela.virentanti.in/sitemap.xml",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
