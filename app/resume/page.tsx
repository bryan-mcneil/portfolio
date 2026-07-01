import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
      <p className="mt-4 text-muted-foreground">
        The print-friendly resume and PDF download arrive in Phase 5.
      </p>
    </div>
  );
}
