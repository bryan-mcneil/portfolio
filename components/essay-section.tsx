import { BlurFade } from "@/components/ui/blur-fade";
import { site } from "@/lib/site";
import type { Essay } from "@/lib/essay";

/**
 * Home-page essay section: a quiet editorial reading column (eyebrow, title,
 * read time, prose body with an emphasized lead paragraph, sign-off). Distinct
 * from the project grids above so recruiters can read it or scroll past.
 */
export function EssaySection({ essay }: { essay: Essay }) {
  return (
    <section
      id="essay"
      className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16"
    >
      <BlurFade inView>
        <header className="max-w-2xl border-b border-border/40 pb-6">
          <p className="text-sm font-semibold tracking-widest text-primary uppercase">
            Essay
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            {essay.title}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {essay.readingMinutes} min read
          </p>
        </header>
      </BlurFade>

      <div
        className="prose prose-neutral mt-8 max-w-2xl leading-relaxed dark:prose-invert prose-headings:tracking-tight prose-p:leading-relaxed [&>p:first-of-type]:text-lg [&>p:first-of-type]:text-foreground"
        dangerouslySetInnerHTML={{ __html: essay.html }}
      />

      <footer className="mt-10 max-w-2xl border-t border-border/40 pt-6">
        <p className="text-sm font-medium">{site.name}</p>
        <p className="text-sm text-muted-foreground">{site.title}</p>
      </footer>
    </section>
  );
}
