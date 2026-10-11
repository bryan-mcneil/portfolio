---
title: UTDB
slug: utdb
tagline: The course catalog and class schedule platform behind ~2,500 courses, built, deployed, and run end to end.
category: professional
status: shipped
dates: Jan 2022 – Jun 2026
techStack:
  - PHP 8
  - Custom MVC
  - SQL Server
  - T-SQL
  - Redis
  - Azure Data Factory
  - Logic Apps
  - Bootstrap
  - jQuery
featured: false
order: 6
showcase: utdb-schedule.webp
alt:
  cnh-api.webp: API documentation page listing course endpoints with a live JSON response from the getallcourses endpoint
  utdb-schedule.webp: Public course page for a Microsoft Azure course with an upcoming class dates and times sidebar listing sessions, times, and enrollment prices
  cnh-report-history.webp: Class changes report with rows color coded as new, updated, or deleted
  cnh-report-info.webp: Class detail form showing course title, session number, dates, modality, and scheduling notes
---

United Training hired me to develop, deploy, and manage UTDB, the company's public course catalog and class schedule management system. The company later became New Horizons as it joined the Educate 360 umbrella, and the system grew with it.

UTDB merges Salesforce, Thought Industries (the LMS), partner data, and Excel imports into one SQL Server database covering ~2,500 courses and 4,000 to 5,000 class dates. That consolidation roughly doubled the courses the company could offer. Employees get role-based access to manage, search, filter, and export the schedule data.

## The API

I built a versioned REST API that 30 resellers used to pull course and schedule data, and trained their teams to integrate it. Responses started out taking several seconds. Adding Redis caching and tuning the SQL queries behind the endpoints brought them under one second.

## Microsoft Learn integration

I integrated Microsoft Learn's API to publish hundreds of class dates automatically and keep enrollment availability in sync with Salesforce. That opened a new sales channel worth an estimated $29K a year.

## Automation

The twice-weekly Excel cleanup and database import used to take 4 hours a run. I automated it down to 5 minutes, which saves 400+ hours a year and ended the need for an outside consultant (about $6.5K a year).

Azure Data Factory pipelines, Logic Apps alerts, and scheduled jobs keep site data in sync and catch bad data early: duplicate class entries, misconfigured courses, and failed API POSTs. Daily jobs notify users when classes change and deliver system diagnostics to developers automatically.

## Tech stack

- Custom MVC framework with a custom auth system
- PHP 8
- SQL Server (MSSQL) with T-SQL stored procedures for consolidation, validation, and reporting
- Redis caching
- Azure Data Factory pipelines and Logic Apps alerts
- Bootstrap, jQuery, CSS
