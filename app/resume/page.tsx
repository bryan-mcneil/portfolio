import type { Metadata } from "next";
import { Download } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume for ${site.name}, ${site.title} with ${site.yearsExperience} years of experience in Laravel, PHP, React, and Azure.`,
};

const summary = [
  "8+ years of experience as a Full Stack Developer specializing in Laravel, PHP, and MSSQL",
  "Additional experience with other tech stacks like React, Python, and C#",
  "Expertise in building secure middleware, automating data pipelines, and optimizing databases",
  "Managed the end-to-end application lifecycle, from gathering stakeholder requirements and system design through to post-launch maintenance and continuous feature updates",
  "Maintained strong communication across cross-functional remote teams to align on evolving project needs and eliminate technical roadblocks",
];

const experience = [
  {
    role: "Full Stack Developer",
    company: "Educate 360",
    location: "Remote",
    period: "2021–2026",
    bullets: [
      "Architected a secure, MVC-based PHP middleware system with role-based access control to synchronize data across Salesforce, Thought Industries, a third-party partner's API, and the live production site",
      "Engineered automated data pipelines in Azure Data Factory, leveraging Logic Apps and SPROCs for bulk data processing, alerts, and daily maintenance",
      "Collaborated within Agile teams utilizing Git, merge requests, and a Change Management System to maintain diverse codebases (Laravel, WordPress, DNN, Legacy PHP)",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "RS&I",
    location: "Idaho Falls, ID",
    period: "2018–2021",
    bullets: [
      "Developed an automated PDF e-signature workflow for client onboarding, implementing unique document identifiers to securely track submission status and user data",
      "Optimized enterprise infrastructure by deploying an internal Certificate Authority for automated SSL distribution",
      "Developed a real-time employee time-tracking web application utilizing SignalR and Knockout.js",
      "Participated in executing full database restorations during emergency recovery scenarios",
    ],
  },
];

const education = {
  degree: "Bachelor of Science in Computer Information Technology",
  school: "Brigham Young University–Idaho",
  bullets: [
    "Projects: created multiple C# console and WPF applications, and developed an Android application with a team of other students",
    "Software Developer Internship at RR Donnelley",
  ],
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

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 print:max-w-none print:px-0 print:py-0">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{site.name}</h1>
          <p className="mt-1 text-muted-foreground print:text-foreground/80">
            {site.title}
          </p>
          <p className="mt-2 text-sm text-muted-foreground print:text-foreground/80">
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              {site.email}
            </a>
            <span aria-hidden className="mx-2">
              ·
            </span>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              LinkedIn
            </a>
            <span aria-hidden className="mx-2">
              ·
            </span>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground"
            >
              GitHub
            </a>
          </p>
        </div>
        <Button asChild className="print:hidden">
          <a href="/resume.pdf" download="Bryan-McNeil-Resume.pdf">
            <Download data-icon="inline-start" />
            Download PDF
          </a>
        </Button>
      </header>

      <section className="mt-10 print:mt-8">
        <SectionHeading>Summary of Qualifications</SectionHeading>
        <BulletList items={summary} />
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

      <section className="mt-10 print:mt-8 print:break-inside-avoid">
        <SectionHeading>Education</SectionHeading>
        <div className="mt-4">
          <h3 className="font-semibold">{education.degree}</h3>
          <p className="text-sm text-muted-foreground print:text-foreground/80">
            {education.school}
          </p>
          <BulletList items={education.bullets} />
        </div>
      </section>
    </div>
  );
}
