import Image from "next/image";
import Link from "next/link";
import { neighborhoods } from "@/lib/neighborhoods";
import { socialLinks } from "@/lib/social";
import { brandIcons } from "@/lib/brandIcons";
import { localePath, type Lang } from "@/lib/i18n";

const text = {
  en: {
    serving: "Serving Seattle neighborhoods:",
    credentials: "Licensed, Bonded & Insured · Pet First Aid Certified · Background Checked. All rights reserved.",
    privacy: "Privacy Policy",
    follow: "Strol on social media",
    on: (name: string) => `Strol on ${name} (opens in a new tab)`,
  },
  es: {
    serving: "Barrios de Seattle donde trabajo:",
    credentials:
      "Con licencia, afianzado y asegurado · Certificado en primeros auxilios para mascotas · Antecedentes verificados. Todos los derechos reservados.",
    privacy: "Política de privacidad",
    follow: "Strol en redes sociales",
    on: (name: string) => `Strol en ${name} (se abre en una pestaña nueva)`,
  },
};

export default function Footer({ lang = "en" }: { lang?: Lang }) {
  const year = new Date().getFullYear();
  const t = text[lang];

  return (
    <footer className="bg-[#2B2E33] text-[#FAF6EC] py-6 border-t border-white/10">
      <div className="mx-auto max-w-site px-6 text-[0.9rem]">
        {/* Plain-text neighborhood list, partly for local SEO. */}
        <p className="text-[#FAF6EC]/70 text-[0.85rem] mb-3">
          <span className="font-semibold text-[#FAF6EC]">{t.serving}</span> {neighborhoods.join(", ")}
        </p>
        {/* Bottom row (owner's choice 2026-11-13, to save space): favicon + copyright on the
            left; on the right, round icon-only social links (lib/social.ts, brand logos from
            lib/brandIcons.ts, new tab) above the Privacy Policy link. The icons have no visible
            names: each has an aria-label for screen readers and a title tooltip on hover. On
            narrow screens the right side wraps below the copyright, left-aligned. */}
        <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
          {/* The Strol favicon (leash "S"; public/images/footer-icon.png is a copy of app/icon.png,
              keep them in sync). Decorative: the name is in the text. */}
          {/* The favicon sits beside the copyright paragraph at every width, centered on it
              vertically (owner's choice 2026-11-13, after trying it stacked above on phones). */}
          <div className="flex items-center gap-3 flex-1 min-w-[260px]">
            <Image
              src="/images/footer-icon.png"
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0"
            />
            <p>
              &copy; {year} Strol Pet Services &middot; {t.credentials}
            </p>
          </div>
          <div className="flex flex-col items-end gap-3 max-[640px]:items-start">
            <ul className="flex items-center gap-2" aria-label={t.follow}>
              {socialLinks.map(({ name, url, icon }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener"
                    aria-label={t.on(name)}
                    title={name}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#FAF6EC]/30 text-[#FAF6EC] transition-colors hover:bg-[#FAF6EC]/10 hover:border-[#FAF6EC]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                      <path d={brandIcons[icon]} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <Link href={localePath(lang, "/privacy")} className="font-semibold text-[#FAF6EC] hover:underline">
              {t.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
