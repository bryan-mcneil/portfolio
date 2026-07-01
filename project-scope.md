# Software Engineer Portfolio

## Problem
I need to create a website to showcase my personal and professional work history as a software engineer.

## Solution
Build a portfolio site using modern frameworks, libraries, and styles to market my skills.

## Tech Stack
- Next.js
- Tailwind CSS
- Shadcn/ui (to build foundational things)
- Magic UI (to add some flair)
- Aceternity UI (to add some flair)

## Codeing Pattern
Since this is a static site, no database should be necessary. I will provide a folder of images and videos with each project I want to showcase. Code should lean towards performance (need the site to load fast to keep attention). Code should use reusable components often, keep it clean and simple, and remember the DRY principle: Don’t Repeat Yourself.

## Features
This will be a multi-page website. The home page nav bar can have projects, resume, and about. The home page should use Aceternity and Magic UI components to make a strong hero section with a brief "About" blurb, my top skills, and a highlighted project or two. (I’m thinking of components like background-beams from Aceternity or Magic UI's Blur Fade). Below this should be a clear card grid of all my projects that act as full-card links to the project details under /projects/[slug]. Below this grid can be an about section and a contact form that links to my personal email (bmcneil.t@gmail.com).

/projects/[slug]: Project pages will have images and videos. We need to find good components for these videos and images. There will also be a description of the project and the tech stack used, which I’ll provide in a file named project-details.md. The /projects directory can also be a card grid with all projects and a description at the top that summarizes the tech stacks used and the important leadership skills showcased.

/resume: A dedicated, printer-friendly HTML version of my traditional resume. You can add a simple "Download PDF" button at the top. Hiring managers love being able to send a direct link to exactly what they are looking for.

/about: This page will have photos of me and my family and a description of my work history along with my hobbies.

## Additional
Look for projects.md and about.md for written details. Please when making text for the site, use these as baselines, but feel free to clean them up for grammar and professionalism. Though follow these guidelines:
**Banned patterns, zero exceptions across writing:**
- Em dashes (—) in any form. Use a comma, a period + new sentence, or restructure instead.
- "dive into", "deep dive", "let's dive"
- "game-changer" / "game changer"
- "it's worth noting", "worth noting"
- "seamlessly", "seamless integration"
- "unleash", "unlock your", "elevate your"
- "robust" as a feature adjective
- "at the end of the day", "in today's world", "in today's fast-paced"
- "look no further"
- Opening a sentence with "Additionally," or "Furthermore,"
- Passive "is designed to" constructions

**Naturalness rules:**
- Vary sentence length deliberately: mix short punchy sentences with longer explanatory ones.
- Use contractions throughout: "you'll", "it's", "doesn't", "that's".
- Active voice, no filler words ("very", "really", "truly")
- Never start a sentence with "Overall" or "In conclusion"

## Final Thoughts
This is for recruiters to view, so we need to grab attention and showcase important skills in the first six seconds of page viewing. Use any human psychology tricks you have for the UI design. Also, is this a personal computer and project, security isn't a big concern.