export const site = {
  name: "Bryan McNeil",
  title: "Full Stack Engineer",
  yearsExperience: "8",
  location: "Idaho Falls, ID",
  email: "bmcneil.t@gmail.com",
  // Live domain. Canonical, og:url, and og:image absolute URLs derive from this
  // at build time; change here (and rebuild) to migrate domains later.
  url: "https://bryanmcneil.pro",
  description:
    "Portfolio of Bryan McNeil, a Full Stack Engineer with 8 years of experience across PHP/Laravel, C#/.NET, React/TypeScript, SQL Server, and Azure.",
  // Static file in public/. The Download PDF button on /resume links here.
  resumeFile: "/Bryan-McNeil-Resume.pdf",
  skills: [
    "React / TypeScript",
    "PHP / Laravel",
    "C# / .NET",
    "Python",
    "SQL Server / MySQL / PostgreSQL",
    "Azure / AWS",
    "AI Integration (Claude API, MCP)",
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
