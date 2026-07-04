import type { Metadata } from "next";

import { site } from "@/lib/site";
import { BlurFade } from "@/components/ui/blur-fade";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}: how I work, the philosophy degree, travel, and the crew at home.`,
};

// Served from content/about/assets/ via scripts/sync-assets.mjs.
const MEDIA_BASE = "/media/about";

/* eslint-disable @next/next/no-img-element -- static export serves pre-optimized files; next/image adds nothing here */

function Photo({
  file,
  width,
  height,
  alt,
  caption,
  className,
}: {
  file: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  className?: string;
}) {
  return (
    <figure>
      <img
        src={`${MEDIA_BASE}/${file}`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className={`w-full rounded-2xl border border-border/60 object-cover ${className ?? ""}`}
      />
      <figcaption className="mt-2 text-sm text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

const snapshots = [
  {
    file: "bryan-bg-forest.webp",
    width: 640,
    height: 480,
    alt: "Bryan in a knit hat smiling in front of bright red and orange autumn trees",
    caption: "Chasing autumn color",
  },
  {
    file: "bryan.webp",
    width: 640,
    height: 853,
    alt: "Bryan on a patio raising a glass with a rainbow arcing overhead",
    caption: "Right place, right rainbow",
  },
  {
    file: "mochi.webp",
    width: 640,
    height: 853,
    alt: "Mochi the black cat sitting on a banister in a bow tie collar",
    caption: "Mochi, between cuddle demands",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-2 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,300px)]">
          {/* No mount-time BlurFade on the intro: it's the LCP element, and
              holding it invisible until hydration costs Lighthouse points. */}
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About Me
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              I&apos;m {site.name}, a full-stack software engineer with{" "}
              {site.yearsExperience} years of experience building web applications.
              It has been a unique journey over the years, with ups and downs,
              but I&apos;ve learned a lot and grown as a developer.
              Here you can learn more about me outside of work, my philosophy degree, travel experiences, and the crew at home.
            </p>
          </div>
          {/* The portrait is the LCP element on mobile, so it doesn't animate.
              The cutout photo sits on a fixed dark violet panel, deliberately
              theme-invariant: fading it into the card surface washes out in
              light mode. */}
          <div>
            <div className="relative mx-auto w-60 max-w-full sm:w-72">
              <div
                aria-hidden
                className="absolute inset-0 -rotate-3 rounded-2xl bg-primary/70"
              />
              <div className="relative overflow-hidden rounded-2xl bg-[radial-gradient(130%_95%_at_50%_0%,#6d28d9_0%,#3b1d6e_48%,#181123_100%)] shadow-lg ring-1 ring-white/15">
                <img
                  src={`${MEDIA_BASE}/profile-portfolio.webp`}
                  alt={site.name}
                  width={640}
                  height={966}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="how-i-work" title="How I Work">
        <BlurFade inView>
          <p className="max-w-2xl text-muted-foreground">
            The work still holds my attention after all these years. Every
            company runs on systems with their own
            architecture, history, and quirks, and getting them all to talk to
            each other never runs out of interesting problems. The people have
            taught me the most, though. The best teams I&apos;ve worked on
            moved fast and treated each other with genuine kindness and
            respect. I try to bring both to every project.
          </p>
        </BlurFade>
      </Section>

      <Section id="off-the-clock" title="Off the Clock">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
          <BlurFade inView>
            <div className="max-w-2xl space-y-4 text-muted-foreground">
              <p>
                Outside of programming, I&apos;m an avid learner. Right now
                that means a post-baccalaureate degree in philosophy.
                I&apos;ve always loved the big questions: who we are as
                people, what&apos;s real, how to face the existential weight
                we all carry, and what it means to live a good life. I&apos;ll
                follow any idea, openly and freely, if it gets me closer to
                capital &quot;T&quot; Truth.
              </p>
              <p>
                Beyond the books, I travel. Germany and Brazil were great
                trips; Japan turned into a habit. My wife and I have been
                three times now, and we still find something new on every
                visit. We&apos;re probably addicted. We&apos;ve decided not to
                fight it.
              </p>
            </div>
          </BlurFade>
          <BlurFade inView delay={0.15}>
            <Photo
              file="bryan-kaitlin.webp"
              width={640}
              height={853}
              alt="Bryan and Kaitlin taking a selfie in front of Osaka Castle"
              caption="Kaitlin and me at Osaka Castle"
            />
          </BlurFade>
        </div>
      </Section>

      <Section id="family" title="The Crew at Home">
        <div className="grid gap-8 md:grid-cols-[280px_minmax(0,1fr)] md:items-start">
          <BlurFade inView delay={0.15} className="md:order-1">
            <Photo
              file="moose-marty.webp"
              width={640}
              height={853}
              alt="Moose the corgi sitting on the lawn behind Marty, a corgi puppy lying in the grass"
              caption="Moose and Marty"
            />
          </BlurFade>
          <BlurFade inView className="-order-1 md:order-2">
            <p className="max-w-2xl text-muted-foreground">
              I&apos;m married to my lovely wife, Kaitlin, and we share the
              house with Moose, Marty, and Mochi. Moose is our corgi, a small
              bundle of energy who keeps us active. He always wants to play,
              and he expects nightly cuddles or he gets huffy. Marty is our
              other corgi: smart, brave, gentle, and the fastest corgi
              you&apos;ll ever meet. Mochi is our black cat and the most
              loving cat I know. He demands cuddles so often it borders on
              annoying, and boy, does he meow loudly for attention.
            </p>
          </BlurFade>
        </div>
      </Section>

      <Section
        id="snapshots"
        title="Snapshots"
        description="A few favorites from the camera roll."
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {snapshots.map((photo, index) => (
            <BlurFade key={photo.file} inView delay={0.1 + index * 0.05}>
              <Photo {...photo} className="aspect-[4/5]" />
            </BlurFade>
          ))}
        </div>
      </Section>
    </>
  );
}
