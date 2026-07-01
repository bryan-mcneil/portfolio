import type { Metadata } from "next";

// Temporary hardcoded slugs; Phase 2 replaces this with the content loader
// in lib/content.ts so pages generate from content/projects/ alone.
const slugs = [
  "helpdesk",
  "gadgetdrop",
  "forgotten-kanji",
  "educate360",
  "utdb",
] as const;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{slug}</h1>
      <p className="mt-4 text-muted-foreground">
        Project details render from content/projects/{slug}/ starting in
        Phase 2.
      </p>
    </div>
  );
}
