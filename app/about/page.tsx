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

const photos = [
  {
    file: "bryan-kaitlin.webp",
    width: 1200,
    height: 1600,
    alt: "Bryan and Kaitlin taking a selfie in front of Osaka Castle",
    caption: "Kaitlin and me at Osaka Castle",
  },
  {
    file: "bryan-bg-forest.webp",
    width: 1200,
    height: 900,
    alt: "Bryan in a knit hat smiling in front of bright red and orange autumn trees",
    caption: "Chasing autumn color",
  },
  {
    file: "moose-marty.webp",
    width: 1200,
    height: 1600,
    alt: "Two corgis on a lawn: Moose sitting behind a puppy lying in the grass",
    caption: "Moose and Marty",
  },
  {
    file: "bryan.webp",
    width: 1200,
    height: 1600,
    alt: "Bryan on a patio raising a glass with a rainbow arcing overhead",
    caption: "Right place, right rainbow",
  },
  {
    file: "mochi.webp",
    width: 1200,
    height: 1600,
    alt: "Mochi the black cat sitting on a banister in a bow tie collar",
    caption: "Mochi, between cuddle demands",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-2 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,300px)]">
          <BlurFade>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              About Me
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              I&apos;m {site.name}, a full-stack software engineer with{" "}
              {site.yearsExperience} years of building for the web. The
              projects cover the work. This page covers the rest: how I
              approach the job, what I chase off the clock, and the crew
              waiting at home.
            </p>
          </BlurFade>
          <BlurFade delay={0.15}>
            <div className="relative mx-auto w-60 max-w-full sm:w-72">
              <div
                aria-hidden
                className="absolute inset-0 -rotate-3 rounded-2xl bg-primary/70"
              />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-primary/15 via-card to-card">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export serves pre-optimized files; next/image adds nothing here */}
                <img
                  src={`${MEDIA_BASE}/profile-portfolio.webp`}
                  alt={site.name}
                  width={1080}
                  height={1630}
                  className="w-full"
                />
              </div>
            </div>
          </BlurFade>
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
        <BlurFade inView>
          <div className="max-w-2xl space-y-4 text-muted-foreground">
            <p>
              Outside of programming, I&apos;m an avid learner. Right now that
              means a post-baccalaureate degree in philosophy. I&apos;ve
              always loved the big questions: who we are as people,
              what&apos;s real, how to face the existential weight we all
              carry, and what it means to live a good life. I&apos;ll follow
              any idea, openly and freely, if it gets me closer to capital
              &quot;T&quot; Truth.
            </p>
            <p>
              Beyond the books, I travel. Germany and Brazil were great trips;
              Japan turned into a habit. My wife and I have been three times
              now, and we still find something new on every visit. We&apos;re
              probably addicted. We&apos;ve decided not to fight it.
            </p>
          </div>
        </BlurFade>
      </Section>

      <Section id="family" title="The Crew at Home">
        <BlurFade inView>
          <p className="max-w-2xl text-muted-foreground">
            I&apos;m married to my lovely wife, Kaitlin, and we share the
            house with Moose and Mochi. Moose is our corgi, a small bundle of
            energy who keeps us active. He always wants to play, and he
            expects nightly cuddles or he gets huffy. Mochi is our black cat
            and the most loving one I&apos;ve ever met. He demands cuddles so
            often it borders on annoying, and boy, does he meow loudly for
            attention.
          </p>
        </BlurFade>
      </Section>

      <Section
        id="snapshots"
        title="Snapshots"
        description="A few favorites from the camera roll."
      >
        <div className="columns-2 gap-4 lg:columns-3">
          {photos.map((photo, index) => (
            <BlurFade
              key={photo.file}
              inView
              delay={0.1 + index * 0.05}
              className="mb-4 break-inside-avoid"
            >
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element -- static export serves pre-optimized files; next/image adds nothing here */}
                <img
                  src={`${MEDIA_BASE}/${photo.file}`}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  className="w-full rounded-xl border border-border/60"
                />
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  {photo.caption}
                </figcaption>
              </figure>
            </BlurFade>
          ))}
        </div>
      </Section>
    </>
  );
}
