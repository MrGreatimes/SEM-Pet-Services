"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import LangRoot from "@/components/LangRoot";
import { langOf, localePath } from "@/lib/i18n";

// The 404 page body. One not-found page serves the whole site, so it picks its language
// from the address: anything under /es gets the Spanish version.
const copy = {
  en: {
    label: "Error 404",
    title: "This Page Wandered Off",
    text: "The page you were looking for is not here. It may have moved, or the link might be out of date. Let me get you back on track.",
    home: "Back to Home",
    rates: "View Rates",
  },
  es: {
    label: "Error 404",
    title: "Esta página se escapó",
    text: "La página que buscaba no está aquí. Puede que se haya movido o que el enlace ya no funcione. Déjeme ayudarle a volver al camino.",
    home: "Volver al inicio",
    rates: "Ver tarifas",
  },
};

const btnPrimary =
  "inline-block px-7 py-3.5 rounded-full font-heading font-semibold text-base border-2 border-transparent bg-primary text-white transition-all hover:bg-primary-hover hover:-translate-y-0.5 hover:shadow-site cursor-pointer";

const btnSecondary =
  "inline-block px-7 py-3.5 rounded-full font-heading font-semibold text-base border-2 border-primary text-primary-dark transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5 cursor-pointer";

export default function NotFoundBody({ footer }: { footer: { en: React.ReactNode; es: React.ReactNode } }) {
  const lang = langOf(usePathname() ?? "/");
  const t = copy[lang];
  return (
    <LangRoot lang={lang}>
      <Header lightPage />

      <main>
        <section className="pt-[170px] max-[860px]:pt-[140px] pb-28 bg-surface text-center">
          <div className="mx-auto max-w-[600px] px-6">
            <div className="text-5xl mb-4">🐾</div>
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2">
              {t.label}
            </p>
            <h1 className="text-[1.8rem] max-[560px]:text-[1.5rem] mb-4">{t.title}</h1>
            <p className="text-charcoal-soft mb-8">{t.text}</p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href={localePath(lang, "/")} className={btnPrimary}>
                {t.home}
              </Link>
              <Link href={localePath(lang, "/rates")} className={btnSecondary}>
                {t.rates}
              </Link>
            </div>
          </div>
        </section>
      </main>

      {footer[lang]}
    </LangRoot>
  );
}
