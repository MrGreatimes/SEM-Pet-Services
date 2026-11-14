// Languages: English at the normal addresses (/, /rates, /privacy, /review) and a
// Spanish copy of every page under /es (/es, /es/rates, ...), added 2026-11-13.
// Spanish copy is written for the owner (a Spanish speaker) to review; it addresses
// visitors as "usted" (owner's choice). Client reviews stay in English on both.

export type Lang = "en" | "es";

export const siteUrl = "https://strolpetservices.com";

// Path for a page in a language: localePath("es", "/rates") -> "/es/rates",
// localePath("es", "/") -> "/es". `path` is always the English path.
export function localePath(lang: Lang, path: string): string {
  if (lang === "en") return path;
  return path === "/" ? "/es" : `/es${path}`;
}

// English path for any address on the site: "/es/rates" -> "/rates", "/es" -> "/".
export function basePath(pathname: string): string {
  if (pathname === "/es" || pathname === "/es/") return "/";
  return pathname.startsWith("/es/") ? pathname.slice(3) : pathname;
}

export const langOf = (pathname: string): Lang =>
  pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";

// Metadata `alternates` for a page that exists in both languages: its own canonical
// address plus hreflang links, so Google shows English searchers the English page and
// Spanish searchers the Spanish one (x-default: English).
export function alternatesFor(lang: Lang, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: {
      en: path,
      es: localePath("es", path),
      "x-default": path,
    },
  };
}

// Remembered language choice (set by the header's language switch). Read by a tiny
// script in the root layout that sends a visitor who chose Spanish to the Spanish copy
// when they open an English page directly. Search engines never set it, so they always
// see each page in its own language.
export const LANG_STORAGE_KEY = "strol-lang";
