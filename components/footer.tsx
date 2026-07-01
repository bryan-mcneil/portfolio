import Link from "next/link";
import { Mail } from "lucide-react";

import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex items-center gap-4">
          <Link
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="transition-colors hover:text-foreground"
          >
            <Mail className="size-4.5" />
          </Link>
          <Link
            href={site.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-foreground"
          >
            <GitHubIcon className="size-4.5" />
          </Link>
          <Link
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-foreground"
          >
            <LinkedInIcon className="size-4.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
