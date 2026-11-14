"use client";

import { createContext, useContext, useEffect, useLayoutEffect } from "react";
import type { Lang } from "@/lib/i18n";

// The page's language, for client components (header, forms, photo viewer) that have
// their own visible or screen-reader text. Server components take a `lang` prop instead.
const LangContext = createContext<Lang>("en");
export const useLang = () => useContext(LangContext);

// Live language swap (owner request 2026-11-13): the header's switch changes pages
// without a reload, and the visitor should stay exactly where they were instead of the
// page jumping to the top and scrolling back down. Both languages render the same layout,
// so the Nth heading/paragraph/row/... in one is the same element in the other. Before
// switching, remember which of those is at the top of the screen and how far down it
// sits; once the other language renders, scroll so that element sits at the same spot.
// Elements that only exist in one language carry `data-lang-only` and are skipped.
// (No iframes: the map only appears once scrolled near, so it would throw the count off.)
const ANCHORS = "main :is(h1,h2,h3,h4,p,li,tr,figure,form):not([data-lang-only])";
let pending: { index: number; top: number } | null = null;

const anchorElements = () =>
  Array.from(document.querySelectorAll<HTMLElement>(ANCHORS)).filter(
    (el) => !el.closest("[data-lang-only]") && el.getClientRects().length > 0
  );

export function rememberScrollPosition() {
  pending = null;
  if (window.scrollY < 10) {
    pending = { index: -1, top: 0 }; // at the very top: stay at the top
    return;
  }
  const els = anchorElements();
  const index = els.findIndex((el) => el.getBoundingClientRect().top >= 0);
  if (index >= 0) pending = { index, top: els[index].getBoundingClientRect().top };
}

function restoreScrollPosition() {
  if (!pending) return;
  const { index, top } = pending;
  pending = null;
  const instant = "instant" as ScrollBehavior;
  if (index < 0) {
    window.scrollTo({ top: 0, behavior: instant });
    return;
  }
  const el = anchorElements()[index];
  if (el) window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - top, behavior: instant });
}

// Wraps every page. The root layout's <html lang="en"> can't know which page it's on
// without making every page dynamic, so the wrapper carries lang="es" on Spanish pages
// (screen readers and browsers use the nearest lang attribute) and also updates <html>
// once the page loads, which covers the photo viewer (it opens outside this wrapper).
export default function LangRoot({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Before the new language is painted, so the swap shows no jump.
  useLayoutEffect(() => {
    restoreScrollPosition();
  }, [lang]);

  return (
    <LangContext.Provider value={lang}>
      <div lang={lang} className="contents">
        {children}
      </div>
    </LangContext.Provider>
  );
}
