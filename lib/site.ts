export const site = {
  name: "Bryan McNeil",
  title: "Full-Stack Software Engineer",
  yearsExperience: "8+",
  email: "bmcneil.t@gmail.com",
  // TODO: replace with the real domain once purchased (bryanmcneil.pro)
  url: "https://bryanmcneil.pro",
  description:
    "Portfolio of Bryan McNeil, a full-stack software engineer with 8+ years of experience across TypeScript, React, PHP, and Azure.",
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "PHP / Laravel",
    "PostgreSQL / MySQL",
    "Azure",
    "AI Integration",
  ],
  links: {
    // TODO: confirm GitHub and LinkedIn profile URLs with Bryan
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
  },
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "About", href: "/about" },
  ],
} as const;
