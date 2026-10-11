---
title: GadgetDrop
slug: gadgetdrop
tagline: A live product-review and price-tracking site with AI-written buy-or-wait verdicts.
category: personal
status: live
dates: May 2026 – Present
techStack:
  - Laravel
  - PHP
  - Livewire
  - React / Inertia
  - MySQL
  - Tailwind CSS
  - Claude API
  - MCP
featured: true
order: 1
showcase: gadgetdrop.mp4
links:
  live: https://gadgetdrop.tech
  github: https://github.com/bryan-mcneil/gadget-drop
alt:
  gadgetdrop.mp4: GadgetDrop home page scrolling past a featured review carousel and a browse-by-category row of gadget photos
  gadgetdrop-drop-price.mp4: Drop Price game where visitors guess a featured gadget's price in five tries with hot or cold feedback
  gd-admin-post.webp: Admin post editor with title, slug, excerpt, and markdown body beside author and publish settings
  gd-mega-menu.webp: Trending mega menu listing ranked reviews with product thumbnails and publish dates
---

GadgetDrop is a live product-review and price-tracking site at [gadgetdrop.tech](https://gadgetdrop.tech). Every review carries a 90-day price history, a deal verdict that says whether to buy now or wait, and price-drop email alerts readers can subscribe to. Eleven scheduled jobs keep the prices, verdicts, and alerts current without anyone touching them.

## AI integration

The Claude API streams an explanation of each buy-or-wait verdict onto the page as it's generated. Every call runs under a daily budget, a rate limit, and a cache, so a traffic spike can't run up the bill or hammer the API. An MCP server exposes the same product and price data to AI agents.

## Architecture

The public site started as React with Inertia. I moved it to server-rendered Blade and Livewire so search engines see complete pages, with the H1, meta tags, and structured data all present with JavaScript turned off. The admin area stays a React app. Both sides share one Laravel backend and a single Vite build with dual entries.

## Engineering proof

- 650+ PHPUnit tests
- Laravel Dusk and Cypress end-to-end tests
- GitHub Actions CI on every push
- A one-command deploy script

## Where it started

GadgetDrop was my first project built with Claude Code. I wanted to find the limits of AI-assisted development and learn firsthand where it shines and where it falls apart. The site also doubles as an SEO lab: I'm experimenting with JSON-LD structured data for products, merchandise, and brands, and learning Google's ad policies and approval process along the way. It's an ongoing process, with big shifts as I learn new things.

## Tech stack

- Backend: Laravel 13, PHP 8.4
- Public frontend: Blade (SSR) with Livewire 4 and Alpine.js
- Admin frontend: React 18 with Inertia.js v2
- Styling: Tailwind CSS v3
- AI: Claude API for streamed verdict explanations, plus an MCP server for agents
- Markdown: league/commonmark, rendered server-side
- Build: Vite 8 with dual entries
- Database: MySQL 8.4
- Auth: Laravel Breeze
- Testing: PHPUnit, Laravel Dusk, Cypress
- CI/CD: GitHub Actions and a one-command deploy script
