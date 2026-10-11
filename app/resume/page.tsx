import type { Metadata } from "next";
import { Download } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume for ${site.name}, ${site.title} with ${site.yearsExperience} years of experience in PHP/Laravel, C#/.NET, React/TypeScript, SQL Server, and Azure.`,
};

/**
 * Content mirrors the master resume (public/Bryan-McNeil-Resume.pdf) exactly:
 * titles, dates, and numbers must stay in sync with it. Edit both together.
 *
 * Section order is what a parser or LinkedIn's matcher reads: name, contact,
 * title, summary, skills, experience, projects, education.
 */

// Flip to true once the AWS SAA-C03 exam is passed, then fill in the
// credential ID and dates below.
const SHOW_AWS_SAA = false;

const summary =
  "Full Stack Engineer with 8 years of experience building web applications, REST APIs, and data integrations in PHP/Laravel, C#/.NET, JavaScript/TypeScript (React), and SQL Server. Owned applications from requirements through deployment and ongoing maintenance, including systems that automated manual workflows (a 4-hour import cut to 5 minutes) and supported online sales (a ~2,500-course catalog and a REST API used by 30 resellers). Built cloud data pipelines and monitoring workflows with Azure Data Factory and Logic Apps, and managed an AWS EC2 instance hosting a call-reporting application.";

const skills = [
  { group: "Languages", items: "PHP, C#, TypeScript/JavaScript, SQL (T-SQL), Dart" },
  {
    group: "Frontend",
    items: "React, Next.js, Livewire/Blade, Tailwind CSS, Bootstrap, jQuery, HTML/CSS",
  },
  {
    group: "Backend",
    items:
      "Laravel, .NET, Node.js/Express, RESTful APIs, SignalR/WebSockets, WordPress, Classic ASP",
  },
  {
    group: "Data",
    items: "SQL Server (MSSQL), MySQL, PostgreSQL, Redis, Prisma, stored procedures",
  },
  {
    group: "Cloud & DevOps",
    items: "Azure (Data Factory, Logic Apps), AWS EC2, GitLab CI/CD, GitHub Actions, IIS, Git",
  },
  {
    group: "Testing & QA",
    items: "PHPUnit, Playwright, Cypress, Vitest, Laravel Dusk, code review, manual QA",
  },
  { group: "AI", items: "Claude API, MCP servers, Gemini (Vercel AI SDK), Claude Code" },
  {
    group: "Integrations",
    items: "Salesforce, HubSpot, Microsoft Learn API, Zoom API, Google OCR",
  },
];

const experience = [
  {
    role: "Full Stack Engineer",
    company: "Educate 360",
    location: "Remote",
    period: "Jan 2022 – Jun 2026",
    bullets: [
      "Built and owned the PHP platform behind the public course catalog and class schedule, merging Salesforce, Thought Industries (LMS), and partner data into one SQL Server database covering ~2,500 courses and 4,000–5,000 class dates, roughly doubling the courses offered.",
      "Automated a twice-weekly Excel cleanup and database import, cutting each run from 4 hours to 5 minutes (400+ hours saved a year) and ending the need for an outside consultant (~$6.5K a year).",
      "Built a versioned REST API that 30 resellers used to pull course and schedule data, and trained their teams to integrate it.",
      "Cut API response times from several seconds to under one second by adding Redis caching and tuning the SQL queries behind it.",
      "Integrated Microsoft Learn's API to publish hundreds of class dates automatically and keep enrollment availability in sync with Salesforce, opening a new sales channel worth an estimated $29K a year.",
      "Built Azure Data Factory pipelines, Logic Apps alerts, and scheduled jobs that kept site data in sync and caught bad data early: duplicate class entries, misconfigured courses, and failed API POSTs.",
      "Migrated and visually rebranded the Watermark Learning site and its 75 courses from legacy PHP to Laravel and PHP 8.3 with no downtime and existing business logic intact.",
      "Designed SQL Server (MSSQL) and T-SQL stored procedures for data consolidation, validation, and reporting, plus internal tools that let staff search, filter, and export course schedules.",
      "Reviewed merge requests and manually QA'd releases for a 4-person Agile remote team in GitLab, with GitLab CI/CD pipelines (YAML) deploying to dev and staging under formal change management.",
      "Migrated TCM Security's website to a new WordPress instance: built custom PHP course filters, managed plugins, and moved the legacy blog content.",
      "Maintained all 8 company websites (Educate 360 and 7 training brands) across Laravel, WordPress, DNN, and legacy PHP.",
      "Turned marketing's Figma and Adobe UX/UI designs into responsive pages (HTML/CSS, JavaScript, jQuery, Bootstrap), set up A/B testing pages tracked in HubSpot, and added JSON-LD schema markup for courses for search engine optimization (SEO).",
      "Maintained a legacy phone-reporting app on AWS EC2 and integrated Zoom's API for call tracking.",
    ],
  },
  {
    role: "Full Stack Engineer",
    company: "RS&I",
    location: "Idaho Falls, ID",
    period: "Sep 2018 – Dec 2021",
    bullets: [
      "Replaced a Visual Basic desktop app with a real-time employee availability dashboard in C#/.NET and SignalR over WebSockets, used daily by 25–30 employees to schedule meetings and route phone calls; still in use.",
      "Digitized dealer onboarding with online forms, generated fillable PDFs, e-signatures, and application tracking, cutting turnaround from days of mailed paperwork to under an hour.",
      "Built an expense-report app with the accounting team that reads receipts with Google OCR to prefill forms and compresses photos for slow mobile connections, cutting report time from hours to minutes.",
      "Built a web app to track new account executives' progress, with SQL Server stored procedures, role-based access, and a Bootstrap interface.",
      "Secured the company's IIS servers with an internal certificate authority for SSL and encrypted data at rest.",
      "Built a web scraper to collect and track distributor data for clients.",
    ],
  },
];

const projects = [
  {
    name: "GadgetDrop",
    href: "/projects/gadgetdrop",
    period: "May 2026 – Present",
    kind: "Personal project, live",
    url: "https://gadgetdrop.tech",
    urlLabel: "gadgetdrop.tech",
    stack: "Laravel, Livewire, React/Inertia, MySQL, Tailwind CSS, Claude API",
    bullets: [
      "Built and run a live product-review and price-tracking site on Laravel, Livewire, and MySQL with price history, deal verdicts, price-drop email alerts, and 11 scheduled jobs.",
      "Moved the public site from React/Inertia to server-rendered Blade and Livewire for SEO, so search engines see complete pages, while keeping React for the admin area.",
      "Built an AI integration with the Claude API that streams an explanation of each buy-or-wait verdict under a daily budget, rate limit, and cache, plus an MCP server for AI agents.",
      "Backed by 650+ PHPUnit tests, Laravel Dusk and Cypress end-to-end tests, GitHub Actions CI, and a one-command deploy script; developed with Claude Code.",
    ],
  },
  {
    name: "Helpdesk",
    href: "/projects/helpdesk",
    period: "2026",
    kind: "Personal project",
    stack: "React, TypeScript, Express, Bun, PostgreSQL, Prisma, Gemini (Vercel AI SDK), Playwright",
    bullets: [
      "Built an AI help desk (React, TypeScript, PostgreSQL) that answers email from a knowledge base.",
      "Runs Gemini in two pg-boss workers, one to classify and one to auto-resolve or escalate to a human, each owning separate fields so they never race.",
      "Added Better Auth roles, AI reply polishing and summaries, and 80+ Playwright and Vitest tests.",
    ],
  },
  {
    name: "Forgotten Kanji",
    href: "/projects/forgotten-kanji",
    period: "Jul 2026 – Present",
    kind: "Mobile game, in development",
    stack: "Flutter, Dart, Flame, Google ML Kit, FSRS, SQLite (Drift)",
    bullets: [
      "Building a Japanese-learning RPG in Flutter and Flame where players cast spells by drawing kanji.",
      "Wrote a pure-Dart stroke grader that scores shape, order, and direction against 23,356 KanjiVG paths for 2,230 kanji, so drawing works offline on Android, web, and PC without ML Kit.",
      "Covered by 1,400+ unit and widget tests in GitHub Actions CI; Riverpod for state, Drift for saves.",
    ],
  },
];

const education = {
  degree: "B.S., Computer Information Technology",
  school: "Brigham Young University – Idaho",
  year: "2017",
};

// Fill these in when SHOW_AWS_SAA flips to true.
const awsSaa = {
  title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
  issuer: "Amazon Web Services",
  date: "Mon YYYY", // TODO: issue date, e.g. "Nov 2026"
  credentialId: "", // TODO: credential ID from the AWS certification portal
  validThrough: "Mon YYYY", // TODO: issue date plus three years
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-border pb-2 text-sm font-semibold tracking-widest uppercase text-primary print:text-foreground">
      {children}
    </h2>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground print:text-foreground/80">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-primary print:bg-foreground" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Separator() {
  return (
    <span aria-hidden className="mx-2">
      ·
    </span>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 print:max-w-none print:px-0 print:py-0">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{site.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground print:text-foreground/80">
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
            <Separator />
            <span>{site.location}</span>
            <Separator />
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              linkedin.com/in/bryan-mcneil-tenorio
            </a>
            <Separator />
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              github.com/bryan-mcneil
            </a>
          </p>
          <p className="mt-3 text-lg font-medium text-primary print:text-foreground">
            {site.title}
          </p>
        </div>
        {/* public/Bryan-McNeil-Resume.pdf must be the current master resume
            export; the button downloads it under the same name. */}
        <Button asChild className="print:hidden">
          <a href={site.resumeFile} download="Bryan-McNeil-Resume.pdf">
            <Download data-icon="inline-start" />
            Download PDF
          </a>
        </Button>
      </header>

      <section className="mt-10 print:mt-8">
        <SectionHeading>Summary</SectionHeading>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground print:text-foreground/80">
          {summary}
        </p>
      </section>

      <section className="mt-10 print:mt-8">
        <SectionHeading>Skills</SectionHeading>
        <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground print:text-foreground/80">
          {skills.map((line) => (
            <li key={line.group}>
              <span className="font-medium text-foreground">{line.group}:</span>{" "}
              {line.items}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 print:mt-8">
        <SectionHeading>Professional Experience</SectionHeading>
        {experience.map((job) => (
          <div
            key={`${job.company}-${job.period}`}
            className="mt-6 first-of-type:mt-4 print:break-inside-avoid"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">{job.role}</h3>
              <span className="text-sm text-muted-foreground print:text-foreground/80">
                {job.period}
              </span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 text-sm text-muted-foreground print:text-foreground/80">
              <span>{job.company}</span>
              <span>{job.location}</span>
            </div>
            <BulletList items={job.bullets} />
          </div>
        ))}
      </section>

      <section className="mt-10 print:mt-8">
        <SectionHeading>Projects</SectionHeading>
        {projects.map((project) => (
          <div
            key={project.name}
            className="mt-6 first-of-type:mt-4 print:break-inside-avoid"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">
                <a href={project.href} className="hover:text-primary">
                  {project.name}
                </a>
              </h3>
              <span className="text-sm text-muted-foreground print:text-foreground/80">
                {project.period}
              </span>
            </div>
            <p className="text-sm text-muted-foreground print:text-foreground/80">
              {project.kind}
              {project.url && (
                <>
                  <Separator />
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground"
                  >
                    {project.urlLabel}
                  </a>
                </>
              )}
            </p>
            <p className="mt-1 text-sm text-muted-foreground print:text-foreground/80">
              <span className="font-medium text-foreground">Stack:</span>{" "}
              {project.stack}
            </p>
            <BulletList items={project.bullets} />
          </div>
        ))}
      </section>

      <section className="mt-10 print:mt-8 print:break-inside-avoid">
        <SectionHeading>Education &amp; Certifications</SectionHeading>
        <div className="mt-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-semibold">{education.degree}</h3>
            <span className="text-sm text-muted-foreground print:text-foreground/80">
              {education.year}
            </span>
          </div>
          <p className="text-sm text-muted-foreground print:text-foreground/80">
            {education.school}
          </p>
        </div>
        {SHOW_AWS_SAA && (
          <div className="mt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">{awsSaa.title}</h3>
              <span className="text-sm text-muted-foreground print:text-foreground/80">
                {awsSaa.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground print:text-foreground/80">
              {awsSaa.issuer}
            </p>
            <p className="text-sm text-muted-foreground print:text-foreground/80">
              Credential ID: {awsSaa.credentialId} | Valid through {awsSaa.validThrough}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
