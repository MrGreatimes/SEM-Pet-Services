"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";

// Optional on-page section links (e.g. the Rates page's Overnight | Walking | Policies),
// shown as a small frosted pill attached under the main header pill. They are plain
// anchor links, so every section stays on the page (good for SEO), with scroll-spy
// highlighting whichever section(s) are currently on screen.
export type SubnavItem = { id: string; label: string };

export default function Header({ lightPage = false, subnav }: { lightPage?: boolean; subnav?: SubnavItem[] }) {
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
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      clearTimeout(settleTimer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [hideOnJump]);

  // No "Home" link: the logo is the home link.
  const servicesHref = lightPage ? "/#services" : "#services";
  const missionHref = lightPage ? "/#mission" : "#mission";
  const contactHref = lightPage ? "/#contact" : "#contact";
  const navLinks = [
    { href: servicesHref, label: "Services", short: "Services", dropdown: "Services" },
    { href: missionHref, label: "My Mission", short: "Mission", dropdown: "My Mission" },
    { href: "/rates", label: "Rates & Policies", short: "Rates", dropdown: "Rates" },
    { href: contactHref, label: "Contact Me", short: "Contact", dropdown: "Contact Me" },
  ];

  // White links over the hero hover to brand gold; dark links in the scrolled pill
  // (or on light pages) hover to blue.
  const navLinkColor =
    scrolled || lightPage
      ? "text-charcoal hover:text-primary-dark"
      : "text-white hover:text-gold";
  // The logo is rendered as a CSS mask over a solid fill so it can take an exact
  // brand color: primary blue (matching the buttons) on the light/scrolled header,
  // white when floating over the dark hero.
  const logoColor = scrolled || lightPage ? "bg-primary" : "bg-white";
  // Hamburger/X bars match the logo's color; the button lifts on hover.
  const barColor = scrolled || lightPage ? "bg-primary group-hover:bg-primary-dark" : "bg-white";

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
        className="relative z-10 isolate mx-auto max-w-site px-6 flex items-center justify-between py-3.5 max-[860px]:[--logo-w:117px] max-[560px]:[--logo-w:98px] max-[860px]:[--pad:max(16px,calc((100%_-_var(--logo-w)_-_24px_-_var(--links-w))/7))] max-[440px]:[--pad:24px] max-[860px]:px-[var(--pad)]"
        style={{ "--links-w": `${linksWidth}px` } as CSSProperties}
      >
        {/* The pill's frosted background lives on its own layer rather than on this
            container: a backdrop-filter on an ancestor would re-anchor the mobile menu
            and cancel the menu's own blur, making it look different once scrolled. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 rounded-full transition-[background-color,box-shadow] duration-300 ${
            scrolled
              ? "bg-[rgba(251,243,233,0.59)] backdrop-blur-md shadow-[0_12px_32px_rgba(58,46,40,0.16)]"
              : "bg-transparent"
          }`}
        />
        <Link
          href={lightPage ? "/" : "#top"}
          className="flex items-center"
          aria-label="Strol Pet Services, home"
        >
          <span
            aria-hidden="true"
            className={`block h-12 max-[560px]:h-10 aspect-[2168/888] transition-colors duration-300 ${logoColor}`}
            style={{
              WebkitMaskImage: 'url("/images/Strol%20Pet%20Services%20Mono%20-%20Black.png")',
              maskImage: 'url("/images/Strol%20Pet%20Services%20Mono%20-%20Black.png")',
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
            }}
          />
        </Link>

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
          className={`flex gap-[22px] max-[860px]:absolute max-[860px]:inset-y-2 max-[860px]:left-[calc(var(--pad)_+_var(--logo-w))] max-[860px]:right-[calc(var(--pad)_+_24px)] max-[860px]:items-center max-[860px]:gap-0 max-[440px]:top-[calc(100%_+_8px)] max-[440px]:bottom-auto max-[440px]:left-auto max-[440px]:right-0 max-[440px]:w-[116px] max-[440px]:flex-col max-[440px]:items-start max-[440px]:gap-3 max-[440px]:px-3 max-[440px]:py-4 max-[440px]:rounded-[34px] max-[440px]:bg-[rgba(251,243,233,0.59)] max-[440px]:backdrop-blur-md max-[440px]:shadow-[0_12px_32px_rgba(58,46,40,0.16)] max-[860px]:overflow-x-auto max-[860px]:[scrollbar-width:none] max-[860px]:transition-[clip-path,opacity,visibility,transform] max-[860px]:duration-300 max-[860px]:ease-out ${
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

        <button
          ref={buttonRef}
          className="group hidden max-[860px]:flex max-[860px]:-mr-2 flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2 rounded-full transition-[transform,filter] duration-200 hover:scale-125 hover:drop-shadow-[0_4px_6px_rgba(0,0,0,0.35)] active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          aria-label={open ? "Close menu" : "Open menu"}
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

      {subnav?.length ? (
        <nav
          aria-label="On this page"
          // On phones, while the menu dropdown is open (116px wide, right-aligned, 8px
          // below the header pill), the tab pill moves to the header's left edge and
          // narrows to leave an 8px gap before the dropdown: 116 + 8 = 124px. Closed it
          // is a fixed 280px, centered via margin, so the width and margin can animate
          // (300ms ease-out, same as the dropdown) instead of jumping.
          className={`mx-auto mt-2 w-fit flex gap-1 p-1 rounded-full max-[440px]:rounded-[22px] max-[440px]:grid max-[440px]:grid-cols-6 max-[440px]:gap-0.5 max-[440px]:[&>a]:col-span-2 max-[440px]:[&>a:nth-child(4)]:col-start-2 bg-[rgba(251,243,233,0.59)] backdrop-blur-md shadow-[0_12px_32px_rgba(58,46,40,0.16)] max-[440px]:transition-[margin,width] max-[440px]:duration-300 max-[440px]:ease-out ${
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
