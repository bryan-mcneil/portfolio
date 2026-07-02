import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { getProject, getProjects } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { InDevelopmentBadge, TechBadges } from "@/components/project-card";
import { ShowcaseMedia } from "@/components/showcase-media";
import { ProjectGallery } from "@/components/project-gallery";
import { GitHubIcon } from "@/components/icons";

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
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      type: "website",
      title: project.title,
      description: project.tagline,
      url: `/projects/${slug}/`,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  // Wrap around so recruiters can keep paging through all five projects.
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const gallery = project.media.filter(
    (media) => media.src !== project.showcase?.src,
  );

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      {/* CSS entrance, and none at all on the showcase and prose below: the
          motion BlurFade holds content invisible until hydration, which turns
          whichever element is largest into a slow LCP. */}
      <div className="animate-blur-fade motion-reduce:animate-none">
        <Button asChild variant="ghost" size="sm" className="-ml-2 mb-6">
          <Link href="/projects">
            <ArrowLeft data-icon="inline-start" />
            All projects
          </Link>
        </Button>

        <header>
          <h1 className="flex flex-wrap items-center gap-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
            {project.inDevelopment && <InDevelopmentBadge />}
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            {project.tagline}
          </p>
          <div className="mt-4">
            <TechBadges stack={project.techStack} />
          </div>
          {(project.links?.live || project.links?.github) && (
            <div className="mt-5 flex flex-wrap gap-3">
              {project.links.live && (
                <Button asChild size="sm">
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink data-icon="inline-start" />
                    View Live
                  </a>
                </Button>
              )}
              {project.links.github && (
                <Button asChild size="sm" variant="outline">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubIcon data-icon="inline-start" />
                    Source Code
                  </a>
                </Button>
              )}
            </div>
          )}
        </header>
      </div>

      {project.showcase && (
        // relative + absolute child so a tall clip can't stretch the ratio box
        <div className="relative mt-10 aspect-video w-full overflow-hidden rounded-xl border border-border/60 bg-muted/40">
          <ShowcaseMedia
            media={project.showcase}
            alt={project.showcase.alt ?? `${project.title} demo`}
            className="absolute inset-0 size-full object-contain"
          />
        </div>
      )}

      <div
        className="prose prose-neutral dark:prose-invert mt-10 max-w-3xl prose-headings:tracking-tight"
        dangerouslySetInnerHTML={{ __html: project.html }}
      />

      {gallery.length > 0 && (
        <BlurFade inView>
          <section className="mt-12" aria-label="Media gallery">
            <h2 className="text-2xl font-semibold tracking-tight">Gallery</h2>
            <div className="mt-6">
              <ProjectGallery items={gallery} projectTitle={project.title} />
            </div>
          </section>
        </BlurFade>
      )}

      <nav
        className="mt-16 grid gap-4 border-t border-border/40 pt-8 sm:grid-cols-2"
        aria-label="Project navigation"
      >
        <Link
          href={`/projects/${previous.slug}`}
          className="group rounded-xl border border-border/60 p-4 transition duration-200 hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ArrowLeft className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Previous project
          </span>
          <span className="mt-1 block font-medium">{previous.title}</span>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="group rounded-xl border border-border/60 p-4 text-right transition duration-200 hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span className="flex items-center justify-end gap-1.5 text-sm text-muted-foreground">
            Next project
            <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
          <span className="mt-1 block font-medium">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
