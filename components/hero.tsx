import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";

/**
 * Above-the-fold entrances use the CSS animate-blur-fade utility instead of
 * the motion-based BlurFade: CSS runs before hydration, so the hero paints
 * early and the H1 stays a fast LCP.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <BackgroundBeams />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 pt-24 pb-16 text-center sm:px-6 sm:pt-28 sm:pb-20">
        {/* No entrance animation on the H1: it's the LCP element, and any
            delay before its first paint costs Lighthouse points. */}
        <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-7xl">
          {site.name}
        </h1>
        <div className="animate-blur-fade [animation-delay:150ms] motion-reduce:animate-none">
          <p className="text-lg text-muted-foreground sm:text-xl">
            <span className="font-medium text-primary">{site.title}</span>
            {" · "}
            {site.yearsExperience} years of experience
          </p>
        </div>
        <div className="animate-blur-fade [animation-delay:400ms] motion-reduce:animate-none">
          <div className="flex max-w-xl flex-wrap justify-center gap-2">
            {site.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="animate-blur-fade [animation-delay:550ms] motion-reduce:animate-none">
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
        </div>
      </div>
    </section>
  );
}
