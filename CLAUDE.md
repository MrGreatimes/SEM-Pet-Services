# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing site for Strol (in-home overnight pet sitting and dog walking, Seattle). Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS. Migrated from a plain static HTML/CSS/JS site (previously branded "SEM Pet Services", then "Stroll with Sean") — the migration to Next.js was done specifically to support planned future capabilities (server-side booking logic, dynamic content, an admin area) beyond what static HTML could support.

## Structure

- `app/layout.tsx` — root layout. Loads Fraunces (headings) and Work Sans (body) via `next/font/google`, exposes them as CSS variables consumed by Tailwind's `font-heading`/`font-body`.
- `app/page.tsx` — the homepage. Sections in order: hero (full-bleed background photo with a dark scrim), Why Strol (four trust cards), Services (`OfferCard` grid: 4 walk cards, then 3 other-service cards), My Mission (bio + photo, two-column), Service Area, Testimonials (placeholder + review submission form), contact form.
- `app/rates/page.tsx` — rates & policies page, in order: hero; "What's Always Included" (meet & greet, medication/special needs, daily updates); rates in two columns (Overnight: base rate + add-ons; Dog Walking: walk rates + add-ons + booking notes; stacked at <=860px); "Before Your First Booking" checklist; one Policies block (If You Cancel with overnight vs walk terms, If I Cancel, Deposit & Payment, In an Emergency); CTA. Header gets `subnav` (Overnight | Walking | Policies) rendered as a frosted pill under the header pill, with IntersectionObserver scroll-spy; targets use `scroll-mt-[150px]`. All sections stay visible (anchors, not tabs) for SEO.
- `app/globals.css` — Tailwind directives plus a few base-layer rules that are impractical to express as utility classes on every element (heading font/weight/color, scroll-margin for anchor targets).
- `components/Header.tsx` — client component (nav toggle, scroll-aware floating/blurred header). Takes a `lightPage` prop for pages with no dark hero behind the header (keeps nav text readable), and an optional `subnav` list of on-page anchor links (used by the rates page).
- `components/Footer.tsx` — server component, computes the copyright year at render time.
- `lib/styles.ts` — shared class strings (`btnPrimary`, `inputClass`, `labelClass`; field labels are `pointer-events-none` by the owner's choice so only clicking the box focuses a field). `lib/` is in Tailwind's `content` globs; keep it there or these classes get purged.
- `components/OfferCard.tsx` — reusable card for the offer grid; takes per-card `imgClassName` for the couple of photos that need custom `object-position`/`scale` cropping.
- `tailwind.config.ts` — design tokens (colors, fonts, radius, shadow, max-width) live here now instead of CSS custom properties. Current palette: `primary`/`primary-dark` (blue), `gold`/`gold-light`/`gold-dark` (yellow), `cream`/`cream-alt`, `charcoal`/`charcoal-soft`.
- `public/images/` — `Owner and dog 1 edit.jpeg` is the owner's photo used in the My Mission section (other `Owner and ...` files are alternates). Note these filenames contain spaces: pass them to `next/image` raw (`src="/images/Owner and dog 1.jpeg"`), since pre-encoding them as `%20` gets double-encoded and 404s. `background.jpeg` is the hero section's full-bleed background image. Numbered files (`1.jpeg`–`16.jpeg`) are the offer-card photos, plus the `Strōl`/`Strol` brand asset files (wordmark and icon explorations).

## Running locally

```
npm install
npm run dev
```

Runs on port 5959 (set in `package.json`'s `dev` script) to match the existing `.claude/launch.json` Browser preview config.

## Deployment

- Hosted on Netlify, connected to the `main` branch of `github.com/MrGreatimes/SEM-Pet-Services`. Netlify auto-detects Next.js and runs `next build`; no manual `netlify.toml` build config was needed at time of migration, but confirm the Netlify site's build command/publish directory match a Next.js app if deploys ever fail after this change.
- The contact and testimonial forms still post directly to Formspree (form ID `xjykrlgr`) as plain HTML forms, no API route. They are client components (`components/ContactForm.tsx`, `components/ReviewForm.tsx`) only for inline validation via `lib/useFormValidation.ts` (validate on blur, re-validate on change once errored, submit does NOT move focus (owner's choice), never reset data; permissive email check) and `components/FieldError.tsx` (red text, no icon by the owner's choice; role="alert", linked with aria-describedby; invalid fields get a red border). Required: contact Name + Email; review Name, Pet's Name, Service and Review (the owner made Pet's Name and Service required after first specifying them optional). The review publish-consent checkbox is intentionally optional. Includes a `_subject` hidden field and a `_gotcha` honeypot field for basic spam filtering. This is a likely candidate to move to a Next.js Route Handler later if custom server-side logic (e.g. booking availability checks) gets added.

## Content notes

- Rates, policies (deposit terms, cancellation tiers, add-on fees), and the phone number are real business content provided by the site owner, not placeholders — don't alter the numbers/terms without being asked.
- House style: no em dashes in page copy (previously stripped on request); use commas or "and" instead.
- Brand name is **Strol** (site copy/URLs use the plain spelling; brand assets in `public/images/` explore a stylized "Strōl" wordmark with a macron-as-bone detail). Do not revisit this naming decision — it was deliberated at length, including a known conflict with an existing Seattle competitor ("Stroll Rover"), and consciously accepted by the site owner.
- Voice: the business is a solo operation, so copy uses first person singular (I / me / my, or "Strol's"), never we / us / our.
