---
title: Helpdesk
slug: helpdesk
tagline: An AI-powered ticketing system that resolves support email before an agent ever sees it.
category: personal
techStack:
  - React
  - TypeScript
  - Express
  - PostgreSQL
  - Prisma
  - Gemini AI
  - Playwright
featured: true
inDevelopment: false
order: 1
showcase: helpdesk-summary.mp4
alt:
  helpdesk-summary.mp4: Helpdesk ticket view where the AI Summarize action condenses a full email conversation into a short overview
  helpdesk-polish.mp4: Helpdesk reply editor where the AI Polish action rewrites a drafted response into a cleaner reply
  helpdesk-dashboard.webp: Admin dashboard with ticket totals, AI resolution rate, and a bar chart of ticket volume over 30 days
  helpdesk-users.webp: User management table listing admin and agent accounts with role badges and edit controls
---

Helpdesk is a ticketing application with a single Admin role and multiple Agent roles. The dashboard opens with the numbers that matter: total tickets, open tickets, resolved by AI, AI resolution rate, average resolution time, and tickets closed by me. A bar chart tracks ticket volume over the last 30 days.

The tickets page lists every ticket with search, sorting, filtering, and pagination. Ticket details show the full reply history alongside dropdowns for status, category, and assignee.

AI does the heavy lifting in two places. Agents get a "polish" action that cleans up a drafted reply and a "summarize" action that condenses an entire conversation into a quick read. Behind the scenes, the email system pairs AI with a knowledge base to auto-resolve incoming tickets. When it can't solve a problem, it escalates the ticket to a human agent.

Admins also get a user management page with full CRUD for creating and managing agents.

## Tech stack

- Frontend: React, TypeScript, Vite, shadcn/ui
- Backend: Express, TypeScript, Bun
- Database: PostgreSQL with Prisma ORM
- AI: Google Gemini via the Vercel AI SDK
- Auth: Better Auth with email/password and database sessions
- Job queue: pg-boss, PostgreSQL-backed
- Testing: Playwright for end-to-end, Vitest with React Testing Library for components
