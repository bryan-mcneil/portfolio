import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

// scripts/sync-assets.mjs copies content/projects/<slug>/assets/ here so the
// static export serves them; keep the two paths in sync.
const MEDIA_URL_BASE = "/media/projects";

const IMAGE_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm"]);

export type ProjectCategory = "personal" | "professional";

export interface ProjectMedia {
  /** Public URL, e.g. /media/projects/helpdesk/helpdesk-summary.mp4 */
  src: string;
  type: "image" | "video";
  /** Poster image URL for videos, when <name>-poster.jpg exists next to <name>.mp4 */
  poster?: string;
  /** Alt text (aria-label for videos) from the frontmatter `alt` map. */
  alt?: string;
}

export interface Project {
  title: string;
  slug: string;
  tagline: string;
  category: ProjectCategory;
  techStack: string[];
  featured: boolean;
  inDevelopment: boolean;
  order: number;
  /** Primary media for cards and the project page header. */
  showcase?: ProjectMedia;
  links?: { live?: string; github?: string };
  /** Every media file in assets/, showcase included, posters folded into their videos. */
  media: ProjectMedia[];
  /** Markdown body rendered to HTML. */
  html: string;
}

function assetUrl(slug: string, file: string): string {
  return `${MEDIA_URL_BASE}/${slug}/${file}`;
}

function listAssets(slug: string): string[] {
  const dir = path.join(CONTENT_DIR, slug, "assets");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).sort();
}

function posterFor(file: string, assets: Set<string>): string | undefined {
  const poster = file.replace(path.extname(file), "-poster.jpg");
  return assets.has(poster) ? poster : undefined;
}

function toMedia(
  slug: string,
  file: string,
  assets: Set<string>,
  altMap: Record<string, string>,
): ProjectMedia | undefined {
  const ext = path.extname(file).toLowerCase();
  const alt = altMap[file];
  if (VIDEO_EXTENSIONS.has(ext)) {
    const poster = posterFor(file, assets);
    return {
      src: assetUrl(slug, file),
      type: "video",
      ...(poster ? { poster: assetUrl(slug, poster) } : {}),
      ...(alt ? { alt } : {}),
    };
  }
  // Posters belong to their video, not the gallery.
  if (IMAGE_EXTENSIONS.has(ext) && !/-poster\.(jpg|jpeg|webp|png)$/i.test(file)) {
    return { src: assetUrl(slug, file), type: "image", ...(alt ? { alt } : {}) };
  }
  return undefined;
}

function required<T>(value: T | undefined, field: string, slug: string): T {
  if (value === undefined || value === null || value === "") {
    throw new Error(`content/projects/${slug}/project-details.md is missing "${field}"`);
  }
  return value;
}

export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

async function loadProject(slug: string): Promise<Project> {
  const filePath = path.join(CONTENT_DIR, slug, "project-details.md");
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));

  const category = required(data.category, "category", slug) as ProjectCategory;
  if (category !== "personal" && category !== "professional") {
    throw new Error(
      `content/projects/${slug}/project-details.md has invalid category "${category}"`,
    );
  }

  const assetFiles = listAssets(slug);
  const assetSet = new Set(assetFiles);
  const altMap: Record<string, string> = data.alt ?? {};
  for (const file of Object.keys(altMap)) {
    if (!assetSet.has(file)) {
      throw new Error(
        `content/projects/${slug}/project-details.md: alt entry "${file}" not found in assets/`,
      );
    }
  }
  const media = assetFiles
    .map((file) => toMedia(slug, file, assetSet, altMap))
    .filter((m): m is ProjectMedia => m !== undefined);

  let showcase: ProjectMedia | undefined;
  if (data.showcase) {
    if (!assetSet.has(data.showcase)) {
      throw new Error(
        `content/projects/${slug}/project-details.md: showcase "${data.showcase}" not found in assets/`,
      );
    }
    showcase = toMedia(slug, data.showcase, assetSet, altMap);
  }

  return {
    title: required(data.title, "title", slug),
    slug: required(data.slug, "slug", slug),
    tagline: required(data.tagline, "tagline", slug),
    category,
    techStack: required(data.techStack, "techStack", slug),
    featured: Boolean(data.featured),
    inDevelopment: Boolean(data.inDevelopment),
    order: required(data.order, "order", slug),
    ...(showcase ? { showcase } : {}),
    ...(data.links ? { links: data.links } : {}),
    media,
    html: await renderMarkdown(content),
  };
}

let cache: Promise<Project[]> | undefined;

/** All projects, sorted by frontmatter `order`. Cached for the build. */
export function getProjects(): Promise<Project[]> {
  cache ??= (async () => {
    const slugs = fs
      .readdirSync(CONTENT_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    const projects = await Promise.all(slugs.map(loadProject));
    return projects.sort((a, b) => a.order - b.order);
  })();
  return cache;
}

export async function getProject(slug: string): Promise<Project | undefined> {
  return (await getProjects()).find((project) => project.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.featured);
}

export async function getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
  return (await getProjects()).filter((project) => project.category === category);
}
