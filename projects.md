# Project History

## Personal Projects

## Helpdesk
This project is a ticketing helpdesk application that features a single Admin role and multiple Agent roles. The home page is a dashboard that has metrics like Total Tickets, Open Tickets, Resolved by AI, AI resolution rate, Average resolution time, and closed by me. It also includes a bar chart showing the number of tickets over the last 30 days. The tickets page displays a list of all tickets with search, sorting, filtering, and pagination. The ticket details page shows the reply history and dropdowns to select status, category, and assigned to. There are also two AI features: "polish" to clean up a reply, and "summarize" to summarize the whole conversation. For the Admin role, there is a user creation and management page with full CRUD capabilities for managing agents. Finally, the email system utilizes AI to auto-resolve tickets using a knowledge base. If the AI is unable to resolve an issue, it escalates the ticket to a human agent.

## Tech Stack
- Frontend: React + TypeScript + Vite + shadcn/ui
- Backend: Express + TypeScript + Bun
- Database: PostgreSQL with Prisma ORM
- AI: Google Gemini Lite via Vercel AI SDK
- Auth: Better Auth (email/password, database sessions)
- Job Queue: pg-boss (PostgreSQL-backed, runs in pgboss schema)
- E2E: Playwright Framework
- Component Test: Vitest + React Testing Library

## GadgetDrop
This project is a basic Amazon affiliate blog site. GadgetDrop was my first usage of Claude Code. I wanted to explore the limits of AI and learn the good and the bad when using AI for development. This project is also exploring SEO and what type of JSON structured data can be utilized for products, merchandise, brands, etc. I am also learning about Google Ad policies and the approval process. This is an ongoing, fun, and slightly silly project for me.

## Tech Stack
This is a hybrid app, and the public site and the admin area use different rendering stacks on purpose.
- Backend: Laravel 13.11.0, PHP 8.4.21
- Public frontend: Blade (SSR) + Livewire 4 + Alpine.js, which provides server-rendered HTML for SEO (crawlers see the H1, meta, and JSON-LD with JS off)
- Admin frontend: React 19 + Inertia.js v2 (unchanged; /admin only). This hybrid is permanent.
- Styling: Tailwind CSS v3 (v3.2.1, via PostCSS + tailwind.config.js).
- Markdown: league/commonmark (server-side, renders post.body)
- Build: Vite 8 (dual entries, see below)
- Database: MySQL 8.4
- Auth: Laravel Breeze

## Forgotten Kanji – Japanese Kanji Learning Mobile App Game
Currently in development, this is my largest scope project, but I am excited to learn. I had an idea to design a JRPG-styled game that utilizes learning Japanese for its puzzles and battle system. It features quests, boss fights, and NPC conversations all centered around the idea of learning the basics of Japanese. The learning engine utilizes spaced repetition, a proven way to help retain knowledge. Coding is only one piece of the process. The pixel art, map design, and NPC conversations are just as big, if not a bigger part of this project.

## Tech Stack
- Framework	Flutter (Dart)
- Game engine	Flame (flame package)
- Tilemaps	flame_tiled + Tiled editor
- Handwriting	google_mlkit_digital_ink_recognition
- Stroke-order display	stroke_order_animator
- Spaced repetition	fsrs (pub.dev)
- Local DB	Drift (SQLite)
- Audio	flame_audio + flutter_tts (ja)

## Professional Projects

## Educate 360
At Educate 360, I helped develop full-stack web applications across multiple brands and tech stacks. I worked in WordPress designing pages and custom components, and I worked with Laravel and legacy PHP systems. I also managed servers and databases in Azure. One highlighted project was a complete redesign of one of our brand sites from the ground up. We took an old-looking site with legacy code and upgraded it to Laravel and PHP 8+. This took the whole dev team working in unison to deliver the project on time. A personal contribution I brought was utilizing Laravel components for reusability across all of our course sites.

My responsibilities also included project management and cross-functional teamwork. This was a remote job, so communication was extremely important across departments. It was always encouraged to reach out across departments, and everyone was friendly and helpful in answering questions or helping with requests.

## Tech Stack
- Laravel
- Bootstrap
- PHP
- WordPress
- DNN
- Azure
- Ubuntu

## UTDB
Originally, I was hired at United Training, which later became New Horizons as it was brought under the Educate 360 umbrella. At United Training, I was responsible for the development, deployment, and management of the public class schedule management system (UTDB). I developed this system to import data from an array of sources like Thought Industries, Salesforce, and Excel. It provided employees with role-based access to manage, export, and search the schedule data. To ensure our data was accessible and reliable, I created and managed APIs for third-party providers and built an automated and scheduled workflow in Azure Data Factory to transform and sync data from the UTDB to the live production site. I also implemented daily cron jobs to notify users of changes to classes and provide developers with system diagnostics.

## Tech Stack
- Custom MVC Framework
- Custom Auth Systen
- PHP 8+
- Bootstrap
- jQuery
- CSS