import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Strol Pet Services",
  description: "How Strol Pet Services handles the information you share through this site.",
};

const h2 = "font-heading font-bold text-[1.15rem] text-primary-dark mt-8 mb-2";
const p = "text-charcoal-soft mb-3";

export default function PrivacyPage() {
  return (
    <>
      <Header lightPage />

      <main>
        <section className="pt-[150px] max-[860px]:pt-[130px] pb-24 bg-white">
          <div className="mx-auto max-w-[720px] px-6">
            <h1 className="text-[1.6rem] mb-2">Privacy Policy</h1>
            <p className="text-charcoal-soft text-[0.9rem] mb-6">Last updated September 23, 2026</p>

            <p className={p}>
              Strol Pet Services is a small, independent business. This page explains what information this website
              collects and how it is used. In short, the only information collected is what you choose to send through
              the contact and review forms, and it is used only to respond to you.
            </p>

            <h2 className={h2}>What is collected</h2>
            <p className={p}>
              When you submit the contact form or the review form, the information you enter is collected. That may
              include your name, email address, the dates you need care, and details about your pet. The review form
              also records whether you consent to having your review featured on this site.
            </p>

            <h2 className={h2}>How it is used</h2>
            <p className={p}>
              Contact form submissions are used to respond to your inquiry and arrange care. Review submissions are
              used to understand how a visit went and, only if you check the consent box, to feature your review on
              this site with your first name. Your information is not sold or shared for advertising.
            </p>

            <h2 className={h2}>Form processing</h2>
            <p className={p}>
              Form submissions are delivered by Formspree, a third-party form service, which passes your message
              along by email. Their handling of the data is governed by their own privacy policy.
            </p>

            <h2 className={h2}>Your choices</h2>
            <p className={p}>
              You can ask to see, correct, or delete any information you have sent, or ask that a featured review be
              removed, by getting in touch through the contact form. Only send information you are comfortable
              sharing.
            </p>

            <h2 className={h2}>Changes</h2>
            <p className={p}>
              This policy may be updated from time to time. Any changes will be posted on this page with a revised
              date above.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
