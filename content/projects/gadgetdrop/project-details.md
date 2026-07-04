---
title: GadgetDrop
slug: gadgetdrop
tagline: An Amazon affiliate blog built to test how far AI-assisted development can go.
category: personal
techStack:
  - Laravel
  - PHP
  - Livewire
  - Alpine.js
  - React
  - Inertia.js
  - MySQL
featured: false
inDevelopment: true
order: 3
showcase: gadgetdrop.mp4
alt:
  gadgetdrop.mp4: GadgetDrop home page scrolling past a featured review carousel and a browse-by-category row of gadget photos
  gadgetdrop-drop-price.mp4: Drop Price game where visitors guess a featured gadget's price in five tries with hot or cold feedback
  gd-admin-post.webp: Admin post editor with title, slug, excerpt, and markdown body beside author and publish settings
  gd-mega-menu.webp: Trending mega menu listing ranked reviews with product thumbnails and publish dates
---

GadgetDrop is an Amazon affiliate blog and my first project built with Claude Code. I wanted to find the limits of AI-assisted development and learn firsthand where it shines and where it falls apart.

The site doubles as an SEO lab. I'm experimenting with JSON-LD structured data for products, merchandise, and brands, and learning Google's ad policies and approval process along the way. It's an ongoing, slightly silly project, and that's the point.

The public site and the admin area use different rendering stacks on purpose. The public pages are server-rendered so crawlers see the H1, meta tags, and structured data with JavaScript turned off. The admin area stays a React app.

## Tech stack

- Backend: Laravel 13, PHP 8.4
- Public frontend: Blade (SSR) with Livewire 4 and Alpine.js
- Admin frontend: React 19 with Inertia.js v2, /admin only. The hybrid is permanent.
- Styling: Tailwind CSS v3
- Markdown: league/commonmark, rendered server-side
- Build: Vite 8 with dual entries
- Database: MySQL 8.4
- Auth: Laravel Breeze
