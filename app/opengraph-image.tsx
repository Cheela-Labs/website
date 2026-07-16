import { ImageResponse } from "next/og";
import { siteDescription, siteName } from "@/lib/seo";

export const alt = `${siteName} - runtime infrastructure for reliable AI agents`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 64,
          background:
            "radial-gradient(circle at top left, rgba(212, 160, 23, 0.28), transparent 32%), linear-gradient(180deg, #0b0b0b 0%, #050505 100%)",
          color: "#f7f7f2",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 36,
            padding: 56,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                display: "flex",
                width: 112,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                border: "1px solid rgba(212,160,23,0.35)",
                background: "rgba(212,160,23,0.08)",
                color: "#d4a017",
                padding: "12px 18px",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              Cheela
            </div>
            <div
              style={{
                fontSize: 72,
                lineHeight: 1,
                letterSpacing: "-0.05em",
                fontWeight: 600,
                maxWidth: 760,
              }}
            >
              Runtime infrastructure for reliable AI agents.
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 24,
            }}
          >
            <div
              style={{
                maxWidth: 560,
                fontSize: 28,
                lineHeight: 1.4,
                color: "rgba(247,247,242,0.78)",
              }}
            >
              {siteDescription}
            </div>
            <div
              style={{
                fontSize: 22,
                color: "rgba(247,247,242,0.55)",
                textAlign: "right",
              }}
            >
              cheela.ai
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
