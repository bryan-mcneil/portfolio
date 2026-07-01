import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="mt-4 text-muted-foreground">
        Photos, hobbies, and the full story arrive in Phase 6.
      </p>
    </div>
  );
}
