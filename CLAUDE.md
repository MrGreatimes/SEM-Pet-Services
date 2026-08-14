# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing landing page for SEM Pet Services (in-home overnight pet sitting and dog walking). Plain HTML/CSS/JS, no framework, no build step, no package manager, no tests.

## Structure

- `index.html` — the entire page (single page, all sections). Sections in order: header/nav (Home, Services, Our Mission, Contact Us), hero, trust badges, services (two cards: overnight sitting, dog walking), Our Mission, rates & policies (overnight subsection: rate tables, add-ons, deposit/payment, meet & greet, booking checklist, cancellation policy — dog walking subsection: walk rates by length/solo-group, add-ons, booking & cancellation policy), contact form, footer.
- `css/style.css` — all styling. Color palette and other design tokens are CSS custom properties at the top of the file (`:root`); change the palette there rather than hardcoding colors elsewhere.
- `js/script.js` — mobile nav toggle and footer year, nothing else.
- `assets/images/` — placeholder for photos (currently empty; hero image is a CSS gradient placeholder in `index.html`/`style.css` until real photos are added).

## Running locally

No install step needed. Serve the directory with any static file server, e.g.:

```
npx serve . -l 5959
```

A `.claude/launch.json` config (`pet-services-site`) already does this on port 5959 for use with the Browser preview tool.

Do not open `index.html` directly via `file://` — the Browser preview tool's navigation is blocked for local `file://` URLs in this environment; always go through a local server.

## Deployment

- Hosted on Netlify, connected to the `main` branch of `github.com/MrGreatimes/SEM-Pet-Services`. Pushing to `main` triggers an auto-deploy — no build command, publish directory is the repo root.
- The contact form posts to Formspree. The form `action` in `index.html` currently has a placeholder (`YOUR_FORM_ID`) that needs to be swapped for a real Formspree form ID before the form is functional in production.

## Content notes

- Rates, policies (deposit terms, cancellation tiers, add-on fees), and the phone number in `index.html` are real business content provided by the site owner, not placeholders — don't alter the numbers/terms without being asked.
- House style: no em dashes in page copy (previously stripped on request); use commas or "and" instead.
