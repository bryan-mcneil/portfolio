import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

// Minimal render for now; Phase 4 builds the full project page layout
// (showcase media, gallery, prev/next navigation).
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{project.tagline}</p>
      <div
        className="prose prose-neutral dark:prose-invert mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: project.html }}
      />
    </div>
  );
}
