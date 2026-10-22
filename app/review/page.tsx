import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReviewForm from "@/components/ReviewForm";

// Clients reach this page from the homepage's "send it to me directly" link or a link
// texted to them, so it's kept out of search results and the sitemap. The homepage's
// main review ask is the Google review link (helps the Google Business Profile).
export const metadata: Metadata = {
  title: "Leave a Review | Strol Pet Services",
  description: "Share how your pet's care with Strol Pet Services went.",
  robots: { index: false, follow: true },
};

export default function ReviewPage() {
  return (
    <>
      <Header lightPage />

      <main>
        <section className="pt-[150px] max-[860px]:pt-[130px] pb-24 bg-cream-alt">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Reviews
            </p>
            <h1 className="text-center text-[1.6rem]">Share Your Experience</h1>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">
              Thanks for trusting me with your pet. I&apos;d love to hear how it went.
            </p>

            <ReviewForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
