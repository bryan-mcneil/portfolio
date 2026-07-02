import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { BlurFade } from "@/components/ui/blur-fade";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <BackgroundBeams />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20">
        <BlurFade delay={0.1}>
          <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl">
            {site.name}
          </h1>
        </BlurFade>
        <BlurFade delay={0.25}>
          <p className="text-lg text-muted-foreground sm:text-xl">
            <span className="font-medium text-primary">{site.title}</span>
            {" · "}
            {site.yearsExperience} years of experience
          </p>
        </BlurFade>
        <BlurFade delay={0.4}>
          <div className="flex max-w-xl flex-wrap justify-center gap-2">
            {site.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </BlurFade>
        <BlurFade delay={0.55}>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/resume">Resume</Link>
            </Button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
