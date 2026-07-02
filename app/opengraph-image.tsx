import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

// Rendered once at build time; ships as a static PNG in out/.
export const dynamic = "force-static";
export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const violet = "#8b5cf6";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(139, 92, 246, 0.25), transparent 55%)",
          color: "#fafafa",
          fontSize: 32,
        }}
      >
        <div
          style={{
            width: 96,
            height: 8,
            backgroundColor: violet,
            borderRadius: 4,
            marginBottom: 40,
          }}
        />
        <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>
          {site.name}
        </div>
        <div style={{ fontSize: 40, color: violet, marginTop: 16 }}>
          {site.title}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 48, flexWrap: "wrap" }}>
          {site.skills.map((skill) => (
            <div
              key={skill}
              style={{
                fontSize: 24,
                color: "#a3a3a3",
                border: "1px solid #333",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
