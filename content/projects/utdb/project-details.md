---
title: UTDB
slug: utdb
tagline: A class schedule management system built, deployed, and run end to end.
category: professional
techStack:
  - PHP 8
  - Custom MVC
  - Bootstrap
  - jQuery
  - Azure Data Factory
featured: false
inDevelopment: false
order: 6
showcase: cnh-homepage.webp
alt:
  cnh-api.webp: API documentation page listing course endpoints with a live JSON response from the getallcourses endpoint
  cnh-homepage.webp: New Horizons training database home page with tiles for courses, providers, classes, and search
  cnh-report-history.webp: Class changes report with rows color coded as new, updated, or deleted
  cnh-report-info.webp: Class detail form showing course title, session number, dates, modality, and scheduling notes
---

United Training hired me to develop, deploy, and manage UTDB, the company's public class schedule management system. The company later became New Horizons as it joined the Educate 360 umbrella, and the system grew with it.

UTDB imports data from an array of sources, including Thought Industries, Salesforce, and Excel. Employees get role-based access to manage, search, and export the schedule data. To keep that data accessible and reliable, I created and managed APIs for third-party providers and built an automated, scheduled workflow in Azure Data Factory that transforms and syncs data from UTDB to the live production site.

Daily cron jobs round it out: users get notified when classes change, and developers get system diagnostics delivered automatically.

## Tech stack

- Custom MVC framework
- Custom auth system
- PHP 8+
- Bootstrap
- jQuery
- CSS
