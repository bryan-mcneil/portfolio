import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

import { getFeaturedProjects, getProjectsByCategory } from "@/lib/content";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { BlurFade } from "@/components/ui/blur-fade";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { FeaturedProjectCard, ProjectCard } from "@/components/project-card";
import { CopyEmailButton } from "@/components/copy-email-button";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default async function HomePage() {
  const [featured, personal, professional] = await Promise.all([
    getFeaturedProjects(),
    getProjectsByCategory("personal"),
    getProjectsByCategory("professional"),
  ]);

  return (
    <>
      <Hero />

      <Section
        id="featured"
        title="Featured Projects"
        description="The two projects that best show how I build."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project, index) => (
            <BlurFade
              key={project.slug}
              inView
              delay={0.1 + index * 0.1}
              className="h-full"
            >
              <FeaturedProjectCard project={project} />
            </BlurFade>
          ))}
        </div>
      </Section>

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

      <Section id="about" title="About Me">
        <BlurFade inView>
          <p className="max-w-2xl text-muted-foreground">
            I&apos;ve built software professionally for more than 8 years, most
            of it full stack: frontends in React, backends in PHP and Node, and
            the Azure plumbing underneath. Outside of work I&apos;m finishing a
            philosophy degree, planning the next trip to Japan, and keeping up
            with our corgis, Moose and Marty, and Mochi the cat.
          </p>
          <Button asChild variant="link" className="mt-4 px-0">
            <Link href="/about">
              More about me
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </BlurFade>
      </Section>

      <section id="contact" className="border-t border-border/40">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
          <BlurFade inView>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Get in Touch
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              I&apos;m open to full-time roles and interesting projects. Email
              me and I&apos;ll get back to you quickly.
            </p>
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <a href={`mailto:${site.email}`}>
                  <Mail data-icon="inline-start" />
                  Email Me
                </a>
              </Button>
              <CopyEmailButton />
              <Button asChild size="icon-lg" variant="outline">
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
              </Button>
              <Button asChild size="icon-lg" variant="outline">
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </Button>
            </div>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
