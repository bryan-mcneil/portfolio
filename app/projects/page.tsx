import type { Metadata } from "next";

import { getProjectsByCategory } from "@/lib/content";
import { BlurFade } from "@/components/ui/blur-fade";
import { Section } from "@/components/section";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Personal and professional projects by Bryan McNeil: full-stack web apps, AI-powered tools, and the systems behind them.",
};

export default async function ProjectsPage() {
  const [personal, professional] = await Promise.all([
    getProjectsByCategory("personal"),
    getProjectsByCategory("professional"),
  ]);

  return (
    <>
      {/* No mount-time BlurFade here: the intro paragraph is the LCP element,
          and holding it invisible until hydration costs Lighthouse points. */}
      <div className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 sm:pt-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          I build full stack: React and TypeScript up front, PHP, Laravel, and
          Node behind them, PostgreSQL or MySQL underneath, and Azure keeping
          it all running. Lately I&apos;ve been wiring AI into real workflows,
          from auto-resolving support tickets to grading handwritten kanji.
          The professional work adds the other half of the job: leading
          projects end to end, coordinating across departments, and shipping
          on schedule.
        </p>
      </div>

      <Section
        id="personal-projects"
        title="Personal Projects"
        description="Built nights and weekends to learn something new."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {personal.map((project, index) => (
            <BlurFade
              key={project.slug}
              inView
              delay={0.1 + index * 0.1}
              className="h-full"
            >
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </Section>

      <Section
        id="professional-projects"
        title="Professional Work"
        description="Systems I built, shipped, and ran on the job."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {professional.map((project, index) => (
            <BlurFade
              key={project.slug}
              inView
              delay={0.1 + index * 0.1}
              className="h-full"
            >
              <ProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </Section>
    </>
  );
}
