import Link from "next/link";

import type { Project } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShowcaseMedia } from "@/components/showcase-media";

export function InDevelopmentBadge() {
  return (
    <Badge
      variant="outline"
      className="border-amber-700/40 text-amber-700 dark:border-amber-400/40 dark:text-amber-400"
    >
      In Development
    </Badge>
  );
}

export function TechBadges({ stack }: { stack: readonly string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((tech) => (
        <Badge key={tech} variant="secondary" className="font-normal">
          {tech}
        </Badge>
      ))}
    </div>
  );
}

/** Compact card for the personal/professional grids. The whole card links to the project page. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Card className="h-full transition duration-200 group-hover:-translate-y-0.5 group-hover:ring-primary/50">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-lg">
            {project.title}
            {project.inDevelopment && <InDevelopmentBadge />}
          </CardTitle>
          <CardDescription>{project.tagline}</CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <TechBadges stack={project.techStack} />
        </CardContent>
      </Card>
    </Link>
  );
}

/** Larger spotlight treatment with showcase media, for the featured section. */
export function FeaturedProjectCard({ project }: { project: Project }) {
  const backdrop =
    project.showcase?.poster ??
    (project.showcase?.type === "image" ? project.showcase.src : undefined);
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <Card className="h-full pt-0 ring-primary/20 transition duration-200 group-hover:-translate-y-0.5 group-hover:ring-primary/50">
        {/* relative + absolute child so a tall clip can't stretch the ratio box */}
        {project.showcase && (
          <div className="relative aspect-video w-full overflow-hidden border-b border-border/40 bg-muted/40">
            {/* Blurred cover of the same frame fills the letterbox gutters
                that object-contain leaves around portrait clips. */}
            {backdrop && (
              // eslint-disable-next-line @next/next/no-img-element -- static export serves pre-optimized files
              <img
                src={backdrop}
                alt=""
                aria-hidden
                loading="lazy"
                className="absolute inset-0 size-full scale-125 object-cover opacity-50 blur-2xl"
              />
            )}
            <ShowcaseMedia
              media={project.showcase}
              alt={project.showcase.alt ?? `${project.title} demo`}
              className="absolute inset-0 size-full object-contain"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2 text-xl">
            {project.title}
            {project.inDevelopment && <InDevelopmentBadge />}
          </CardTitle>
          <CardDescription className="text-base">
            {project.tagline}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto">
          <TechBadges stack={project.techStack} />
        </CardContent>
      </Card>
    </Link>
  );
}
