"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { rememberScrollPosition, useLang } from "@/components/LangRoot";
import { LANG_STORAGE_KEY, basePath, localePath, type Lang } from "@/lib/i18n";

// Optional on-page section links (e.g. the Rates page's Overnight | Walking | Policies),
// shown as a small frosted pill attached under the main header pill. They are plain
// anchor links, so every section stays on the page (good for SEO), with scroll-spy
// highlighting whichever section(s) are currently on screen.
export type SubnavItem = { id: string; label: string };

const navText: Record<Lang, { label: string; short: string; dropdown: string }[]> = {
  // label: desktop, short: 441-860px row, dropdown: <=440px box
  en: [
    { label: "Services", short: "Services", dropdown: "Services" },
    { label: "My Mission", short: "Mission", dropdown: "My Mission" },
    { label: "Rates & Policies", short: "Rates", dropdown: "Rates" },
    { label: "Contact Me", short: "Contact", dropdown: "Contact Me" },
  ],
  es: [
    { label: "Servicios", short: "Servicios", dropdown: "Servicios" },
    { label: "Mi misión", short: "Misión", dropdown: "Mi misión" },
    { label: "Tarifas y políticas", short: "Tarifas", dropdown: "Tarifas" },
    { label: "Contacto", short: "Contacto", dropdown: "Contacto" },
  ],
};

const uiText = {
  en: { home: "Strol Pet Services, home", openMenu: "Open menu", closeMenu: "Close menu", onThisPage: "On this page" },
  es: { home: "Strol Pet Services, inicio", openMenu: "Abrir menú", closeMenu: "Cerrar menú", onThisPage: "En esta página" },
};

// Pages that have a copy in the other language; anything else (a 404) switches to the
// other language's homepage.
const translatedPaths = ["/", "/rates", "/privacy", "/review"];

// Language switch (added 2026-11-13): shows the language you can switch TO ("Español" on
// English pages, "English" on Spanish ones; "ES"/"EN" on phones), written in that
// language, and remembers the choice (see the root layout). Always visible, beside the
// menu button on phones, so a Spanish speaker finds it without opening the menu.
// It swaps the language in place (owner request): no reload and no jump. The other
// language's page is prefetched, the spot on screen is remembered, and LangRoot puts the
// visitor back on the same spot before the new text is painted. A ctrl/cmd-click (new
// tab), or a browser without JavaScript, just opens the plain link.
function LanguageSwitch({ lang, colorClass }: { lang: Lang; colorClass: string }) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const to: Lang = lang === "es" ? "en" : "es";
  const current = basePath(pathname);
  const href = localePath(to, translatedPaths.includes(current) ? current : "/");
  useEffect(() => {
    router.prefetch(href);
  }, [router, href]);
  return (
    <a
      href={href}
      hrefLang={to}
      lang={to}
      aria-label={to === "es" ? "Ver esta página en español" : "View this page in English"}
      onClick={(e) => {
        try {
          localStorage.setItem(LANG_STORAGE_KEY, to);
        } catch {
          // storage blocked: the switch still works, it just isn't remembered
        }
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        rememberScrollPosition();
        router.push(href, { scroll: false });
      }}
      className={`flex items-center justify-center gap-1.5 font-semibold text-[1rem] whitespace-nowrap rounded-full border-[1.5px] border-current px-3 py-0.5 transition-colors max-[860px]:w-[40px] max-[860px]:px-0 max-[860px]:py-1.5 max-[860px]:border-0 max-[860px]:text-[0.9rem] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${colorClass}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 max-[860px]:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
      </svg>
      <span className="max-[860px]:hidden">{to === "es" ? "Español" : "English"}</span>
      <span className="hidden max-[860px]:inline">{to === "es" ? "ES" : "EN"}</span>
    </a>
  );
}

export default function Header({ lightPage = false, subnav }: { lightPage?: boolean; subnav?: SubnavItem[] }) {
  const lang = useLang();
  const t = uiText[lang];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIds, setActiveIds] = useState<string[]>([]);

  // Scroll-spy: a section counts as "current" while it crosses a band just below the
  // header. Several can be current at once (e.g. side-by-side rate columns on desktop);
  // between sections the last highlight is kept.
  useEffect(() => {
    if (!subnav?.length) return;
    const targets = subnav.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        if (visible.size) setActiveIds(subnav.map((i) => i.id).filter((id) => visible.has(id)));
      },
      { rootMargin: "-190px 0px -55% 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    // Start with the last section above the band highlighted, so a page that opens
    // mid-way (e.g. after the language switch) shows a highlight before any scrolling.
    const above = targets.filter((t) => t.getBoundingClientRect().top < 190);
    if (above.length) setActiveIds([above[above.length - 1].id]);
    return () => observer.disconnect();
  }, [subnav]);
  // Combined width of the mobile menu words, measured so the header's side padding
  // can be set equal to the gaps between words (see --pad below).
  const navRef = useRef<HTMLElement>(null);
  const [linksWidth, setLinksWidth] = useState(205);

  // The hidden menu still has layout (it's clipped/invisible, not display:none), so
  // it can be measured whether or not it's open.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () =>
      setLinksWidth(
        Array.from(nav.children).reduce((sum, el) => sum + (el as HTMLElement).offsetWidth, 0)
      );
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Close the open menu on a click/tap anywhere outside it (or its toggle button),
  // or on Escape.
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (navRef.current?.contains(target) || buttonRef.current?.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Auto-hide on scroll (<=860px only): the header slides up out of view while
  // scrolling down and comes back on any scroll up. It always shows near the top of
  // the page and while the menu is open.
  //
  // Hide on jump (all widths): clicking an in-page anchor link tucks the header away
  // and keeps it tucked until the smooth scroll has actually finished (no scroll event
  // for 150ms), however long or in whichever direction that scroll runs; after that a
  // normal scroll up brings it back. Pages with an on-page tab bar (Rates) do the
  // opposite and keep the header visible through the jump so the tabs stay available.
  const [hidden, setHidden] = useState(false);
  const [jumpHidden, setJumpHidden] = useState(false);
  const openRef = useRef(open);
  openRef.current = open;

  const hideOnJump = !subnav?.length;
  useEffect(() => {
    let lastY = window.scrollY;
    let jumping = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;
    const endJumpSoon = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        jumping = false;
      }, 150);
    };
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 0);
      const delta = y - lastY;
      lastY = y;
      if (jumping) {
        // Hold the jump state: tucked away normally, kept visible on tab-bar pages.
        if (!hideOnJump) setHidden(false);
        endJumpSoon();
        return;
      }
      if (y < 80 || openRef.current) {
        setHidden(false);
        setJumpHidden(false);
      } else if (delta > 4) setHidden(true);
      else if (delta < -4) {
        setHidden(false);
        setJumpHidden(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a[href*='#']");
      if (!link) return;
      const target = (link.getAttribute("href") ?? "").split("#")[1];
      if (!target || target === "top") return;
      jumping = true;
      setHidden(hideOnJump);
      setJumpHidden(hideOnJump);
      endJumpSoon();
    };
    onScroll();
    // Arriving at a section from another page (e.g. Rates -> /#services) counts as a
    // jump too: the header starts tucked away so it doesn't cover the section heading.
    // The longer first wait covers the gap before the browser starts scrolling.
    const hash = window.location.hash.slice(1);
    const hashTarget = hash && hash !== "top" ? document.getElementById(hash) : null;
    if (hideOnJump && hashTarget) {
      jumping = true;
      setHidden(true);
      setJumpHidden(true);
      settleTimer = setTimeout(() => {
        jumping = false;
      }, 1000);
    }
    // Opening the site straight to a section (e.g. the QR code -> /#contact): the
    // browser jumps before the photos and fonts above have loaded, and as they grow
    // they push the section down so it lands too low. For the first few seconds, snap
    // back to the section whenever the page above it changes size, until the visitor
    // scrolls or touches the page themselves.
    let stopRealign = () => {};
    if (hashTarget) {
      const realign = () => {
        if (Math.abs(hashTarget.getBoundingClientRect().top) < 1) return;
        hashTarget.scrollIntoView({ block: "start", behavior: "instant" as ScrollBehavior });
      };
      const ro = new ResizeObserver(realign);
      ro.observe(document.body);
      const userEvents = ["wheel", "touchstart", "keydown", "mousedown"];
      const stopTimer = setTimeout(() => stopRealign(), 4000);
      stopRealign = () => {
        ro.disconnect();
        clearTimeout(stopTimer);
        window.removeEventListener("load", realign);
        userEvents.forEach((ev) => window.removeEventListener(ev, stopRealign));
      };
      userEvents.forEach((ev) => window.addEventListener(ev, stopRealign, { passive: true }));
      window.addEventListener("load", realign);
      document.fonts?.ready.then(realign);
      requestAnimationFrame(realign);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      stopRealign();
      clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [hideOnJump]);

  // No "Home" link: the logo is the home link. Links stay in the page's language.
  const home = localePath(lang, "/");
  const section = (id: string) => (lightPage ? `${home}#${id}` : `#${id}`);
  const hrefs = [section("services"), section("mission"), localePath(lang, "/rates"), section("contact")];
  const navLinks = navText[lang].map((text, i) => ({ ...text, href: hrefs[i] }));

  // White links over the hero hover to brand gold; dark links in the scrolled pill
  // (or on light pages) hover to blue.
  const navLinkColor =
    scrolled || lightPage
      ? "text-charcoal hover:text-primary-dark"
      : "text-white hover:text-gold";
  // Logo: reverse (white) over the dark hero; on the scrolled pill or light pages,
  // primary by day and reverse at night, when the pill is dark (see the logo markup below).
  const onPill = scrolled || lightPage;
  const logoPrimaryOpacity = onPill ? "opacity-100 dark:opacity-0" : "opacity-0";
  const logoReverseOpacity = onPill ? "opacity-0 dark:opacity-100" : "opacity-100";
  // Hamburger/X bars match the logo's color; the button lifts on hover.
  const barColor = scrolled || lightPage ? "bg-primary group-hover:bg-primary-dark dark:bg-primary-dark dark:group-hover:bg-white" : "bg-white";

  return (
    <header
      id="top"
      // Keyboard focus inside the header always brings it back into view.
      onFocus={() => {
        setHidden(false);
        setJumpHidden(false);
      }}
      // Always 16px from the top so the header doesn't jump when the pill appears.
      className={`fixed left-0 right-0 top-4 z-[100] max-[860px]:left-3 max-[860px]:right-3 transition-transform duration-300 ease-out ${
        jumpHidden && !open ? "-translate-y-[calc(100%+16px)]" : hidden && !open ? "max-[860px]:-translate-y-[calc(100%+16px)]" : ""
      }`}
    >
      {/* Mobile spacing: --pad is the header's side padding, set so the gaps
          pill-edge|logo|word|word|word|word|X|pill-edge are all equal: 7 equal gaps
          share the row width minus the logo, the 24px X and the words. It applies
          whether the menu is open or closed so the logo and X never move. On narrow
          phones where the words can't fit it falls back to 24px. The hamburger's
          -mr-2 cancels its 8px padding so the bars, like the logo, sit exactly --pad
          from the edge. */}
      <div
        className="relative z-10 isolate mx-auto max-w-site px-6 flex items-center justify-between py-3.5 max-[860px]:[--logo-w:117px] max-[560px]:[--logo-w:98px] max-[860px]:[--pad:max(16px,calc((100%_-_var(--logo-w)_-_84px_-_var(--links-w))/7))] max-[440px]:[--pad:24px] max-[860px]:px-[var(--pad)]"
        style={{ "--links-w": `${linksWidth}px` } as CSSProperties}
      >
        {/* The pill's frosted background lives on its own layer rather than on this
            container: a backdrop-filter on an ancestor would re-anchor the mobile menu
            and cancel the menu's own blur, making it look different once scrolled. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 rounded-full transition-[background-color,box-shadow] duration-300 ${
            scrolled
              ? "bg-[var(--pill-bg)] backdrop-blur-md shadow-[0_12px_32px_rgba(58,46,40,0.16)]"
              : "bg-transparent"
          }`}
        />
        <Link
          href={lightPage ? home : "#top"}
          className="flex items-center"
          aria-label={t.home}
        >
          {/* Two stacked copies of the logo that crossfade (owner's choice, 2026-11-05):
              "reverse" (white) over the dark hero, "primary" (blue) on the scrolled pill or
              light pages by day; at night that pill is dark, where primary's navy text is
              hard to read, so reverse stays. logo-header-*.png are 353x144
              copies of "Strol logo v2 primary/reverse.png", trimmed to the artwork
              (1745x711) so they don't slow the first paint on phones. Regenerate if the
              logo changes. */}
          <span
            aria-hidden="true"
            className="relative block h-12 max-[560px]:h-10 aspect-[1745/711]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-header-primary.png"
              alt=""
              width={353}
              height={144}
              className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${logoPrimaryOpacity}`}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-header-reverse.png"
              alt=""
              width={353}
              height={144}
              className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${logoReverseOpacity}`}
            />
          </span>
        </Link>

        {/* Right side: menu links, the language switch, and (phones) the menu button.
            On phones the links are positioned against the header row (absolute), so only
            the switch (40px) and the button take space here, 12px apart; the links' right
            edge and --pad above allow for both (84px = 24px bars + 8px button padding +
            12px gap + 40px switch). */}
        <div className="flex items-center gap-[22px] max-[860px]:gap-3">
        {/* Desktop: inline links. Mobile: a single-row bar that slides out leftward
            from the hamburger in the logo's row, with shortened labels. It spans exactly
            from the logo's right edge to the X's left edge. An auto left margin on every
            link plus an auto right margin on the last one splits the free space equally,
            so the word gaps match each other and --pad. Below 440px there isn't room
            beside the logo, so it becomes a dropdown box under the right end of the
            header instead: shrink-wrapped to the words (at least a quarter of the viewport), with the pill's frosted background,
            shadow and corner radius (34px = half the pill's height), full link names
            stacked vertically. It fades and slides down rather than using the clip-path
            reveal, because a rectangular clip cuts the shadow off square at the rounded
            corners. */}
        <nav
          ref={navRef}
          className={`flex gap-[22px] max-[860px]:absolute max-[860px]:inset-y-2 max-[860px]:left-[calc(var(--pad)_+_var(--logo-w))] max-[860px]:right-[calc(var(--pad)_+_84px)] max-[860px]:items-center max-[860px]:gap-0 max-[440px]:top-[calc(100%_+_8px)] max-[440px]:bottom-auto max-[440px]:left-auto max-[440px]:right-0 max-[440px]:w-[116px] max-[440px]:flex-col max-[440px]:items-start max-[440px]:gap-3 max-[440px]:px-3 max-[440px]:py-4 max-[440px]:rounded-[34px] max-[440px]:bg-[var(--pill-bg)] max-[440px]:backdrop-blur-md max-[440px]:shadow-[0_12px_32px_rgba(58,46,40,0.16)] max-[860px]:overflow-x-auto max-[860px]:[scrollbar-width:none] max-[860px]:transition-[clip-path,opacity,visibility,transform] max-[860px]:duration-300 max-[860px]:ease-out ${
            open
              ? "max-[860px]:[clip-path:inset(0_0_0_0)] max-[860px]:opacity-100 max-[860px]:visible max-[440px]:[clip-path:none] max-[440px]:translate-y-0"
              : "max-[860px]:[clip-path:inset(0_0_0_100%)] max-[860px]:opacity-0 max-[860px]:invisible max-[440px]:[clip-path:none] max-[440px]:-translate-y-2"
          }`}
        >
          {navLinks.map(({ href, label, short, dropdown }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={`font-semibold text-[1.1rem] max-[860px]:text-[0.85rem] whitespace-nowrap transition-colors max-[860px]:ml-auto max-[860px]:last:mr-auto max-[440px]:ml-0 max-[440px]:last:mr-0 max-[440px]:text-[0.95rem] ${navLinkColor} max-[440px]:text-charcoal max-[440px]:hover:text-primary-dark`}
            >
              {/* label: desktop, short: 441-860px row, dropdown: <=440px box */}
              <span className="max-[860px]:hidden">{label}</span>
              <span className="hidden max-[860px]:inline max-[440px]:hidden">{short}</span>
              <span className="hidden max-[440px]:inline">{dropdown}</span>
            </Link>
          ))}
        </nav>

        <LanguageSwitch lang={lang} colorClass={navLinkColor} />

        <button
          ref={buttonRef}
          className="group hidden max-[860px]:flex max-[860px]:-mr-2 flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 rounded-full transition-[transform,filter] duration-200 hover:scale-125 hover:drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* When open, the top and bottom bars rotate into an X and the middle one fades out. */}
          <span
            className={`w-6 h-0.5 rounded transition-all duration-300 ${barColor} ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span className={`w-6 h-0.5 rounded transition-all duration-300 ${barColor} ${open ? "opacity-0" : ""}`} />
          <span
            className={`w-6 h-0.5 rounded transition-all duration-300 ${barColor} ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
        </div>
      </div>

      {subnav?.length ? (
        <nav
          aria-label={t.onThisPage}
          // On phones, while the menu dropdown is open (116px wide, right-aligned, 8px
          // below the header pill), the tab pill moves to the header's left edge and
          // narrows to leave an 8px gap before the dropdown: 116 + 8 = 124px. Closed it
          // is a fixed 280px, centered via margin, so the width and margin can animate
          // (300ms ease-out, same as the dropdown) instead of jumping.
          className={`mx-auto mt-2 w-fit flex gap-1 p-1 rounded-full max-[440px]:rounded-[22px] max-[440px]:grid max-[440px]:grid-cols-6 max-[440px]:gap-0.5 max-[440px]:[&>a]:col-span-2 max-[440px]:[&>a:nth-child(4)]:col-start-2 bg-[var(--pill-bg)] backdrop-blur-md shadow-[0_12px_32px_rgba(58,46,40,0.16)] max-[440px]:transition-[margin,width] max-[440px]:duration-300 max-[440px]:ease-out ${
            open
              ? "max-[440px]:ml-0 max-[440px]:w-[calc(100%-124px)]"
              : "max-[440px]:ml-[calc((100%-280px)/2)] max-[440px]:w-[280px]"
          }`}
        >
          {subnav.map(({ id, label }) => {
            const active = activeIds.includes(id);
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active ? "location" : undefined}
                className={`font-heading font-semibold text-[0.9rem] rounded-full px-5 py-1.5 transition-colors max-[440px]:flex-1 max-[440px]:px-0 max-[440px]:text-center max-[440px]:transition-[color,background-color,font-size] max-[440px]:duration-300 max-[440px]:ease-out ${
                  open ? "max-[440px]:text-[0.75rem]" : "max-[440px]:text-[0.82rem]"
                } ${
                  active ? "bg-primary text-white" : "text-primary-dark hover:bg-primary/10"
                }`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
