import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

import { getProject, getProjects } from "@/lib/content";
import { site } from "@/lib/site";

// Rendered per project at build time; ships as static PNGs in out/.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const violet = "#8b5cf6";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(({ slug }) => ({ slug }));
}

// The screenshot panel is 472x534 on the 1200x630 card; rendered at 2x.
const PANEL = { width: 944, height: 1068 };

/**
 * The card screenshot: the showcase image, or the poster frame for showcase
 * videos. Cropped to the panel's aspect with sharp's attention strategy so
 * black margins and emulator chrome don't dominate, and re-encoded to PNG
 * because satori doesn't rasterize webp.
 */
async function screenshotDataUri(slug: string, showcaseSrc: string, poster?: string) {
  const file = path.basename(poster ?? showcaseSrc);
  if (/\.(mp4|webm)$/i.test(file)) return undefined;
  const filePath = path.join(process.cwd(), "content", "projects", slug, "assets", file);
  if (!fs.existsSync(filePath)) return undefined;
  const png = await sharp(filePath)
    .trim()
    .resize({ ...PANEL, fit: "cover", position: "attention" })
    .png()
    .toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  const screenshot = project.showcase
    ? await screenshotDataUri(slug, project.showcase.src, project.showcase.poster)
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.2), transparent 50%)",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px",
            width: screenshot ? 680 : 1200,
          }}
        >
          <div
            style={{
              width: 72,
              height: 8,
              backgroundColor: violet,
              borderRadius: 4,
              marginBottom: 32,
            }}
          />
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
            {project.title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a3a3a3",
              marginTop: 20,
              lineHeight: 1.4,
            }}
          >
            {project.tagline}
          </div>
          <div style={{ fontSize: 24, color: violet, marginTop: 40 }}>
            {`${site.name} · ${site.url.replace("https://", "")}`}
          </div>
        </div>
        {screenshot && (
          <div
            style={{
              display: "flex",
              width: 520,
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 48px 48px 0",
            }}
          >
            <img
              src={screenshot}
              width={472}
              height={534}
              style={{
                borderRadius: 16,
                border: "1px solid #333",
              }}
              alt=""
            />
          </div>
        )}
      </div>
    ),
    size,
  );
}
