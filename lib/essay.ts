import fs from "node:fs";
import path from "node:path";

import { renderMarkdown } from "@/lib/content";

const ESSAY_PATH = path.join(process.cwd(), "ESSAY.md");

export interface Essay {
  /** Title from the leading `# ` heading. */
  title: string;
  /** Markdown body (heading stripped) rendered to HTML. */
  html: string;
  /** Estimated read time in minutes, floored at 1. */
  readingMinutes: number;
}

/** Splits the leading `# Title` line off the body; the rest is the essay text. */
function splitTitle(markdown: string): { title: string; body: string } {
  const match = markdown.match(/^\s*#\s+(.+?)\s*(?:\r?\n|$)/);
  if (!match) return { title: "", body: markdown };
  return { title: match[1], body: markdown.slice(match[0].length) };
}

function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

let cache: Promise<Essay> | undefined;

/** The home-page essay, loaded from ESSAY.md and rendered once for the build. */
export function getEssay(): Promise<Essay> {
  cache ??= (async () => {
    const source = fs.readFileSync(ESSAY_PATH, "utf8");
    const { title, body } = splitTitle(source);
    return {
      title,
      html: await renderMarkdown(body),
      readingMinutes: readingMinutes(body),
    };
  })();
  return cache;
}
