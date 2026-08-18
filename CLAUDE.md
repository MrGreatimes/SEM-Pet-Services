# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static marketing site for SEM Pet Services (in-home overnight pet sitting and dog walking). Two pages, plain HTML/CSS/JS, no framework, no build step, no package manager, no tests.

## Structure

- `index.html` — the homepage. Sections in order: header/nav (Home, Services, Our Mission, Rates & Policies, Contact Us), hero (full-bleed background photo with a dark scrim, condensed intro copy), Why Choose Us (trust badges), Services (condensed teaser cards linking to `rates.html` anchors), Our Mission (bio + photo, two-column), Service Area, Testimonials (placeholder + review submission form), contact form, footer.
- `rates.html` — dedicated rates & policies page (moved off the homepage to keep it lean). Same header/nav as `index.html`, but nav links to homepage sections use `index.html#section` since it's a separate page. Overnight subsection: rate tables, add-ons, deposit/payment, meet & greet, booking checklist, cancellation policy. Dog walking subsection: walk rates by length/solo-group, add-ons, booking & cancellation policy. Shared: emergency policy and sitter-side cancellation policy.
- `css/style.css` — all styling. Color palette and other design tokens are CSS custom properties at the top of the file (`:root`); change the palette there rather than hardcoding colors elsewhere. Watch for CSS specificity when adding rules that need to override a generic selector (e.g. `.review-form input`) — equal-specificity rules are resolved by source order, which has caused real bugs here twice; prefer bumping specificity deliberately (e.g. `.review-form .review-consent input`) over relying on rule placement.
- `js/script.js` — mobile nav toggle (floats/shrinks header on scroll) and footer year, nothing else. Shared by both pages.
- `assets/images/` — `hero.jpg` is the owner's photo, used in the Our Mission section (placeholder, easy to swap via a single `src` change). `background.jpeg` is the hero section's full-bleed background image.

## Running locally

No install step needed. Serve the directory with any static file server, e.g.:

```
npx serve . -l 5959
```

A `.claude/launch.json` config (`pet-services-site`) already does this on port 5959 for use with the Browser preview tool.

Do not open `index.html` directly via `file://` — the Browser preview tool's navigation is blocked for local `file://` URLs in this environment; always go through a local server.

## Deployment

- Hosted on Netlify, connected to the `main` branch of `github.com/MrGreatimes/SEM-Pet-Services`. Pushing to `main` triggers an auto-deploy — no build command, publish directory is the repo root.
- The contact form posts to Formspree (form ID `mljrpyjz`, live). Includes a `_subject` hidden field and a `_gotcha` honeypot field for basic spam filtering.

## Content notes

- Rates, policies (deposit terms, cancellation tiers, add-on fees), and the phone number in `index.html` are real business content provided by the site owner, not placeholders — don't alter the numbers/terms without being asked.
- House style: no em dashes in page copy (previously stripped on request); use commas or "and" instead.
