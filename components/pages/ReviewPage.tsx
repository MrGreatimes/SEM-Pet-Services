import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";
import LangRoot from "@/components/LangRoot";
import type { Lang } from "@/lib/i18n";

// Standalone review form (/review and /es/review). Clients reach it only from a link Sean
// texts them; the homepage's review button goes to Google.
const copy = {
  en: {
    label: "Reviews",
    title: "Share Your Experience",
    intro: "Thanks for trusting me with your pet. I'd love to hear how it went.",
  },
  es: {
    label: "Reseñas",
    title: "Cuénteme su experiencia",
    intro: "Gracias por confiarme a su mascota. Me encantaría saber cómo le fue.",
  },
};

export default function ReviewPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <LangRoot lang={lang}>
      <Header lightPage />

      <main>
        <section className="pt-[150px] max-[860px]:pt-[130px] pb-24 bg-cream-alt">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              {t.label}
            </p>
            <h1 className="text-center text-[1.6rem]">{t.title}</h1>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">{t.intro}</p>

            <ReviewForm />
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </LangRoot>
  );
}
