import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      <p className="mt-4 text-muted-foreground">
        Project grids arrive with the content pipeline in Phase 2.
      </p>
    </div>
  );
}
