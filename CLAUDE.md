# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Strol (in-home overnight pet sitting and dog walking, Seattle). Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS. Migrated from a plain static HTML/CSS/JS site (previously branded "SEM Pet Services", then "Stroll with Sean") — the migration to Next.js was done specifically to support planned future capabilities (server-side booking logic, dynamic content, an admin area) beyond what static HTML could support.

## Structure

- `app/layout.tsx` — root layout. Loads Fraunces (headings) and Work Sans (body) via `next/font/google`, exposes them as CSS variables consumed by Tailwind's `font-heading`/`font-body`.
- `app/page.tsx` — the homepage. Sections in order: hero (full-bleed background photo with a dark scrim), Why Choose Us (trust badges), Services (`OfferCard` grid: 4 walk cards, then 3 other-service cards), Our Mission (bio + photo, two-column), Service Area, Testimonials (placeholder + review submission form), contact form.
- `app/rates/page.tsx` — dedicated rates & policies page. Overnight subsection: rate tables, add-ons, deposit/payment, meet & greet, booking checklist, cancellation policy. Dog walking subsection: walk rates by length/solo-group, add-ons, booking & cancellation policy. Shared: emergency policy and sitter-side cancellation policy.
- `app/globals.css` — Tailwind directives plus a few base-layer rules that are impractical to express as utility classes on every element (heading font/weight/color, scroll-margin for anchor targets).
- `components/Header.tsx` — client component (nav toggle, scroll-aware floating/blurred header). Takes a `lightPage` prop for pages with no dark hero behind the header (keeps nav text readable), used by the rates page.
- `components/Footer.tsx` — server component, computes the copyright year at render time.
- `components/OfferCard.tsx` — reusable card for the offer grid; takes per-card `imgClassName` for the couple of photos that need custom `object-position`/`scale` cropping.
- `tailwind.config.ts` — design tokens (colors, fonts, radius, shadow, max-width) live here now instead of CSS custom properties. Current palette: `primary`/`primary-dark` (blue), `gold`/`gold-light`/`gold-dark` (yellow), `cream`/`cream-alt`, `charcoal`/`charcoal-soft`.
- `public/images/` — `Owner and dog 1.jpeg` is the owner's photo, used in the Our Mission section (other `Owner and ...` files are alternates). Note these filenames contain spaces: pass them to `next/image` raw (`src="/images/Owner and dog 1.jpeg"`), since pre-encoding them as `%20` gets double-encoded and 404s. `background.jpeg` is the hero section's full-bleed background image. Numbered files (`1.jpeg`–`16.jpeg`) are the offer-card photos, plus the `Strōl`/`Strol` brand asset files (wordmark and icon explorations).

## Running locally

```
npm install
npm run dev
```

Runs on port 5959 (set in `package.json`'s `dev` script) to match the existing `.claude/launch.json` Browser preview config.

## Deployment

- Hosted on Netlify, connected to the `main` branch of `github.com/MrGreatimes/SEM-Pet-Services`. Netlify auto-detects Next.js and runs `next build`; no manual `netlify.toml` build config was needed at time of migration, but confirm the Netlify site's build command/publish directory match a Next.js app if deploys ever fail after this change.
- The contact and testimonial forms still post directly to Formspree (form ID `xjykrlgr`) as plain HTML forms — no client-side JS or API route involved yet. Includes a `_subject` hidden field and a `_gotcha` honeypot field for basic spam filtering. This is a likely candidate to move to a Next.js Route Handler later if custom server-side logic (e.g. booking availability checks) gets added.

## Content notes

- Rates, policies (deposit terms, cancellation tiers, add-on fees), and the phone number are real business content provided by the site owner, not placeholders — don't alter the numbers/terms without being asked.
- House style: no em dashes in page copy (previously stripped on request); use commas or "and" instead.
- Brand name is **Strol** (site copy/URLs use the plain spelling; brand assets in `public/images/` explore a stylized "Strōl" wordmark with a macron-as-bone detail). Do not revisit this naming decision — it was deliberated at length, including a known conflict with an existing Seattle competitor ("Stroll Rover"), and consciously accepted by the site owner.
