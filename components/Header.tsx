"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header({ lightPage = false }: { lightPage?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = lightPage ? "/" : "#top";
  const servicesHref = lightPage ? "/#services" : "#services";
  const missionHref = lightPage ? "/#mission" : "#mission";
  const contactHref = lightPage ? "/#contact" : "#contact";

  const navLinkColor =
    scrolled || lightPage ? "text-charcoal hover:text-primary-dark" : "text-white hover:text-primary";
  const barColor = scrolled || lightPage ? "bg-charcoal" : "bg-white";
  // The logo is rendered as a CSS mask over a solid fill so it can take an exact
  // brand color: primary blue (matching the buttons) on the light/scrolled header,
  // white when floating over the dark hero.
  const logoColor = scrolled || lightPage ? "bg-primary" : "bg-white";

  return (
    <header
      id="top"
      className={`fixed left-0 right-0 top-0 z-[100] transition-[top] duration-300 ${
        scrolled ? "top-4 max-[860px]:left-3 max-[860px]:right-3" : "max-[860px]:left-3 max-[860px]:right-3"
      }`}
    >
      <div
        className={`mx-auto max-w-site px-6 flex items-center justify-between rounded-full py-3.5 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-[rgba(251,243,233,0.59)] backdrop-blur-md shadow-[0_12px_32px_rgba(58,46,40,0.16)]"
            : "bg-transparent"
        }`}
      >
        <Link href={lightPage ? "/" : "#top"} className="flex items-center" aria-label="Strol Pet Services, home">
          <span
            role="img"
            aria-label="Strol Pet Services"
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

        <nav
          className={`gap-[22px] max-[860px]:absolute max-[860px]:top-full max-[860px]:left-0 max-[860px]:right-0 max-[860px]:bg-cream max-[860px]:flex-col max-[860px]:px-6 max-[860px]:py-4 max-[860px]:gap-4 max-[860px]:border-b max-[860px]:border-black/[0.08] ${
            open ? "max-[860px]:flex" : "max-[860px]:hidden"
          } flex`}
        >
          <Link
            href={homeHref}
            onClick={() => setOpen(false)}
            className={`font-semibold text-[1.1rem] transition-colors max-[860px]:text-charcoal ${navLinkColor}`}
          >
            Home
          </Link>
          <Link
            href={servicesHref}
            onClick={() => setOpen(false)}
            className={`font-semibold text-[1.1rem] transition-colors max-[860px]:text-charcoal ${navLinkColor}`}
          >
            Services
          </Link>
          <Link
            href={missionHref}
            onClick={() => setOpen(false)}
            className={`font-semibold text-[1.1rem] transition-colors max-[860px]:text-charcoal ${navLinkColor}`}
          >
            Our Mission
          </Link>
          <Link
            href="/rates"
            onClick={() => setOpen(false)}
            className={`font-semibold text-[1.1rem] transition-colors max-[860px]:text-charcoal ${navLinkColor}`}
          >
            Rates &amp; Policies
          </Link>
          <Link
            href={contactHref}
            onClick={() => setOpen(false)}
            className={`font-semibold text-[1.1rem] transition-colors max-[860px]:text-charcoal ${navLinkColor}`}
          >
            Contact Us
          </Link>
        </nav>

        <button
          className="hidden max-[860px]:flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-2"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`w-6 h-0.5 rounded ${barColor}`} />
          <span className={`w-6 h-0.5 rounded ${barColor}`} />
          <span className={`w-6 h-0.5 rounded ${barColor}`} />
        </button>
      </div>
    </header>
  );
}
