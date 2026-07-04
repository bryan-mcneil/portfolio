export const site = {
  name: "Bryan McNeil",
  title: "Full-Stack Software Engineer",
  yearsExperience: "8+",
  email: "bmcneil.t@gmail.com",
  // Live domain. Canonical, og:url, and og:image absolute URLs derive from this
  // at build time; change here (and rebuild) to migrate domains later.
  url: "https://bryanmcneil.pro",
  description:
    "Portfolio of Bryan McNeil, a full-stack software engineer with 8+ years of experience across TypeScript, React, PHP, and Azure.",
  skills: [
    "TypeScript",
    "React",
    "Python",
    "PHP / Laravel",
    "PostgreSQL / MySQL",
    "Azure",
    "AI Integration",
  ],
  links: {
    github: "https://github.com/bryan-mcneil",
    linkedin: "https://www.linkedin.com/in/bryan-mcneil-tenorio/",
  },
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "About", href: "/about" },
  ],
} as const;
