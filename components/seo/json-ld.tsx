import { structuredData } from "@/lib/structured-data";

export default function JsonLd() {
  return (
    <>
      {structuredData.map((schema) => (
        <script
          key={schema["@id"]}
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
