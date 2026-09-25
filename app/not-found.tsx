import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page Not Found | Strol Pet Services",
  robots: { index: false, follow: false },
};

const btnPrimary =
  "inline-block px-7 py-3.5 rounded-full font-heading font-semibold text-base border-2 border-transparent bg-primary text-white transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-site cursor-pointer";

const btnSecondary =
  "inline-block px-7 py-3.5 rounded-full font-heading font-semibold text-base border-2 border-primary text-primary-dark transition-all hover:bg-primary hover:text-white hover:-translate-y-0.5 cursor-pointer";

export default function NotFound() {
  return (
    <>
      <Header lightPage />

      <main>
        <section className="pt-[170px] max-[860px]:pt-[140px] pb-28 bg-white text-center">
          <div className="mx-auto max-w-[600px] px-6">
            <div className="text-5xl mb-4">🐾</div>
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2">
              Error 404
            </p>
            <h1 className="text-[1.8rem] max-[560px]:text-[1.5rem] mb-4">This Page Wandered Off</h1>
            <p className="text-charcoal-soft mb-8">
              The page you were looking for is not here. It may have moved, or the link might be out of date. Let us
              get you back on track.
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/" className={btnPrimary}>
                Back to Home
              </Link>
              <Link href="/rates" className={btnSecondary}>
                View Rates
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
