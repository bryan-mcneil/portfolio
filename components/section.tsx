import { BlurFade } from "@/components/ui/blur-fade";

/** Home page section shell: consistent width, spacing, and a blur-fade heading. */
export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16">
      <BlurFade inView>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
        )}
      </BlurFade>
      <div className="mt-8">{children}</div>
    </section>
  );
}
