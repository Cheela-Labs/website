import { getSiteUrl } from "@/lib/seo";

export async function GET() {
  const siteUrl = getSiteUrl("/");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Cheela</title>
    <link>${siteUrl}</link>
    <description>Open platform for building reliable AI agents.</description>
    <language>en</language>
    <item>
      <title>Cheela launches</title>
      <link>${siteUrl}</link>
      <description>Cheela is an open platform for building reliable AI agents.</description>
    </item>
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
