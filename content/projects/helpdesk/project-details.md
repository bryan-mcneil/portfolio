---
title: Helpdesk
slug: helpdesk
tagline: An AI-powered ticketing system that resolves support email before an agent ever sees it.
category: personal
status: shipped
dates: "2026"
techStack:
  - React
  - TypeScript
  - Express
  - Bun
  - PostgreSQL
  - Prisma
  - Gemini (Vercel AI SDK)
  - Playwright
featured: true
order: 2
showcase: helpdesk-summary.mp4
links:
  github: https://github.com/bryan-mcneil/helpdesk
alt:
  helpdesk-summary.mp4: Helpdesk ticket view where the AI Summarize action condenses a full email conversation into a short overview
  helpdesk-polish.mp4: Helpdesk reply editor where the AI Polish action rewrites a drafted response into a cleaner reply
  helpdesk-dashboard.webp: Admin dashboard with ticket totals, AI resolution rate, and a bar chart of ticket volume over 30 days
  helpdesk-users.webp: User management table listing admin and agent accounts with role badges and edit controls
---

Helpdesk is an AI help desk that answers support email from a knowledge base. It has a single Admin role and multiple Agent roles, enforced with Better Auth. The dashboard opens with the numbers that matter: total tickets, open tickets, resolved by AI, AI resolution rate, average resolution time, and tickets closed by me. A bar chart tracks ticket volume over the last 30 days.

The tickets page lists every ticket with search, sorting, filtering, and pagination. Ticket details show the full reply history alongside dropdowns for status, category, and assignee.

## How the AI works

Incoming email runs through two pg-boss workers, both backed by Gemini. The first classifies the ticket. The second reads the knowledge base and either auto-resolves the ticket or escalates it to a human agent. Each worker owns its own set of fields on the ticket, so the two never race each other on the same row.

Agents get AI help too: a "polish" action cleans up a drafted reply, and a "summarize" action condenses an entire conversation into a quick read.

Admins also get a user management page with full CRUD for creating and managing agents.

## Testing

80+ Playwright and Vitest tests cover the end-to-end flows and the components.

## Tech stack

- Frontend: React, TypeScript, Vite, shadcn/ui
- Backend: Express, TypeScript, Bun
- Database: PostgreSQL with Prisma ORM
- AI: Google Gemini via the Vercel AI SDK
- Auth: Better Auth with roles, email/password, and database sessions
- Job queue: pg-boss, PostgreSQL-backed, one worker to classify and one to resolve or escalate
- Testing: Playwright for end-to-end, Vitest with React Testing Library for components
