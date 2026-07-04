import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Terminal, type TerminalLine } from "@/components/ui/terminal";

const session: TerminalLine[] = [
  { cmd: true, text: "whoami" },
  { text: "full-stack software engineer · 8+ years", className: "text-zinc-300" },
  { cmd: true, text: "ls skills/" },
  { text: "php/  laravel/  sql/  python/", className: "text-sky-300" },
  { text: "azure/  ai_integration/  React/  web_design/", className: "text-sky-300" },
  { cmd: true, text: "git log --oneline -3" },
  { text: "a41f2c9 ship AI ticket triage for helpdesk", className: "text-zinc-400" },
  { text: "7d0e3b8 grade handwritten kanji with ML Kit", className: "text-zinc-400" },
  { text: "c92a615 automate azure data pipelines", className: "text-zinc-400" },
  { cmd: true, text: "echo $STATUS" },
  { text: "open to full-time roles", className: "text-emerald-300" },
];

/**
 * Above-the-fold entrances use the CSS animate-blur-fade utility instead of
 * the motion-based BlurFade: CSS runs before hydration, so the hero paints
 * early and the H1 stays a fast LCP.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <BackgroundBeams />
      {/* Violet wash so the hero reads as a designed surface in light mode,
          where the beams alone are too faint to carry it. */}
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-96 w-[52rem] max-w-none -translate-x-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10"
      />
      <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-12 px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 lg:grid-cols-[1.1fr_minmax(0,26rem)]">
        <div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          {/* No entrance animation on the H1: it's the LCP element, and any
              delay before its first paint costs Lighthouse points. */}
          <h1 className="text-5xl font-bold tracking-tight text-balance sm:text-6xl xl:text-7xl">
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
            <div className="flex max-w-xl flex-wrap justify-center gap-2 lg:justify-start">
              {site.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="animate-blur-fade [animation-delay:550ms] motion-reduce:animate-none">
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
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
        <div className="animate-blur-fade [animation-delay:700ms] motion-reduce:animate-none">
          <Terminal lines={session} />
        </div>
      </div>
    </section>
  );
}
