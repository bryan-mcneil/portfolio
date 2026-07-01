import { Badge } from "@/components/ui/badge";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {site.name}
      </h1>
      <p className="text-xl text-muted-foreground">
        {site.title} · {site.yearsExperience} years of experience
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {site.skills.map((skill) => (
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        Hero, featured projects, and project grids land in Phase 3.
      </p>
    </div>
  );
}
