import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rates & Policies | Strol Pet Services",
  description:
    "Straightforward pet care rates, deposit and payment terms, cancellation policy, and booking essentials from Strol Pet Services.",
};

const btnPrimary =
  "inline-block px-7 py-3.5 rounded-full font-heading font-semibold text-base border-2 border-transparent bg-primary text-white transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-site cursor-pointer";

const rateBlock = "bg-white rounded-site shadow-site p-8 mt-8 mx-auto max-w-[700px]";
const rateNote = "text-charcoal-soft text-[0.92rem] mb-4";
const th = "text-left font-heading text-[0.85rem] uppercase tracking-wide text-charcoal-soft px-3 py-2.5 border-b-2 border-cream-alt";
const td = "px-3 py-3 border-b border-cream-alt";
const tdLast = "px-3 py-3 border-b border-cream-alt font-bold text-primary-dark whitespace-nowrap";

function Divider({ id, label }: { id: string; label: string }) {
  return (
    <div id={id} className="flex items-center gap-4 max-w-[700px] mx-auto mt-14 mb-2 rates-divider">
      <span className="flex-1 h-px bg-cream-alt" />
      <span className="font-heading font-bold text-[1.15rem] text-primary-dark whitespace-nowrap">{label}</span>
      <span className="flex-1 h-px bg-cream-alt" />
    </div>
  );
}

export default function RatesPage() {
  return (
    <>
      <Header lightPage />

      <main>
        <section id="rates" className="pt-[150px] max-[860px]:pt-[130px] pb-24 bg-white rates-divider">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Rates &amp; Policies
            </p>
            <h1 className="text-center text-[1.5rem]">Straightforward Pricing, No Surprises</h1>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">
              Independent, direct-booking rates. Everything below is confirmed in writing before your stay or walk
              begins.
            </p>

            <nav aria-label="Jump to rates" className="flex justify-center gap-3 mt-7">
              <a
                href="#rates-overnight"
                className="font-heading font-semibold text-[0.9rem] text-primary-dark border-[1.5px] border-primary rounded-full px-5 py-2 transition-colors hover:bg-primary hover:text-white"
              >
                Overnight Sitting
              </a>
              <a
                href="#rates-walking"
                className="font-heading font-semibold text-[0.9rem] text-primary-dark border-[1.5px] border-primary rounded-full px-5 py-2 transition-colors hover:bg-primary hover:text-white"
              >
                Dog Walking
              </a>
            </nav>

            <div className="!mt-8">
              <Divider id="rates-overnight" label="Overnight Pet Sitting" />
            </div>

            {/* Base Rate */}
            <div className={rateBlock}>
              <h3 className="text-[1.2rem] mb-3 text-primary-dark">Base Rate</h3>
              <p className={rateNote}>
                Covers standard care for one dog: feeding, potty breaks, overnight house presence, and daily
                photo/text updates. Every stay includes three walks a day, minimum; the nightly rate is set by your
                preferred walk length.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={th}>Included Walks</th>
                      <th className={th}>Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className={td}>Three 20-minute walks</td><td className={tdLast}>$90/night</td></tr>
                    <tr><td className={td}>Three 30-minute walks</td><td className={tdLast}>$111/night</td></tr>
                    <tr><td className={td}>Three 45-minute walks</td><td className={tdLast}>$132/night</td></tr>
                    <tr><td className={`${td} !border-b-0`}>Three 60-minute walks</td><td className={`${tdLast} !border-b-0`}>$156/night</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Add-Ons */}
            <div className={rateBlock}>
              <h3 className="text-[1.2rem] mb-3 text-primary-dark">Add-Ons</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={th}>Item</th>
                      <th className={th}>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className={td}>Each additional dog</td><td className={tdLast}>+$10/night</td></tr>
                    <tr><td className={td}>Complex behavioral/reactive dog handling</td><td className={tdLast}>+$10&ndash;15/night</td></tr>
                    <tr><td className={td}>Holiday surcharge (Thanksgiving, Dec 24&ndash;Jan 1, July 4th)</td><td className={tdLast}>+30%</td></tr>
                    <tr><td className={`${td} !border-b-0`}>Last-minute booking (inside 72 hours of start date)</td><td className={`${tdLast} !border-b-0`}>+$20 flat</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Included callout */}
            <div className="rounded-site p-7 px-8 mt-8 mx-auto max-w-[700px] bg-gold-light border-l-4 border-gold-dark">
              <h3 className="text-[1.1rem] mb-2 text-gold-dark">Included at No Extra Charge</h3>
              <p className="text-charcoal-soft">
                Basic medication administration and routine special needs, including mobility support, senior dog
                care, and feeding schedules. This is part of the value of hiring someone trained, not an upcharge.
              </p>
            </div>

            {/* Deposit & Payment */}
            <div className={rateBlock}>
              <h3 className="text-[1.2rem] mb-3 text-primary-dark">Deposit &amp; Payment</h3>
              <ul className="text-charcoal-soft space-y-2.5">
                <li className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                  <strong>Deposit:</strong> 25% of total, due to hold the dates
                </li>
                <li className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                  Deposit becomes non-refundable if canceled inside 7 days of the start date
                </li>
                <li className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                  <strong>Balance due:</strong> day of arrival
                </li>
                <li className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                  Total dollar amount confirmed in writing (text/email) before the stay begins
                </li>
              </ul>
              <div className="flex gap-2.5 mt-5 flex-wrap">
                {["Venmo", "Zelle", "Cash"].map((m) => (
                  <span key={m} className="bg-gold-light text-gold-dark font-heading font-semibold text-[0.85rem] px-4 py-1.5 rounded-full">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Meet & Greet */}
            <div className="rounded-site p-7 px-8 mt-8 mx-auto max-w-[700px]" style={{ background: "#F6E3D8", borderLeft: "4px solid #3E6E8E" }}>
              <h3 className="text-[1.1rem] mb-2 text-primary-dark">Meet &amp; Greet</h3>
              <p className="text-charcoal-soft">Free, always offered before a first booking.</p>
            </div>

            {/* Booking Essentials */}
            <div className={rateBlock}>
              <h3 className="text-[1.2rem] mb-3 text-primary-dark">Booking Essentials</h3>
              <p className={rateNote}>Get these before confirming a stay:</p>
              <ul className="text-charcoal-soft space-y-2.5">
                {[
                  "Emergency contact info",
                  "Vet name, clinic, and phone number",
                  "Current vaccination records (rabies required; Bordetella for group walks and dog park trips)",
                  "Feeding schedule, medication instructions (dosage/timing), and any behavioral notes",
                  "House access details (keys, alarm codes, wifi)",
                  "Cancellation terms acknowledged by the client",
                ].map((item) => (
                  <li key={item} className="relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-gold-dark before:font-bold">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div className={rateBlock}>
              <h3 className="text-[1.2rem] mb-3 text-primary-dark">Cancellation Policy</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={th}>Timing</th>
                      <th className={th}>Terms</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className={td}>More than 7 days before start</td><td className={`${td} font-semibold`}>Deposit refunded</td></tr>
                    <tr><td className={td}>Inside 3 days</td><td className={`${td} font-semibold`}>Deposit forfeited</td></tr>
                    <tr><td className={`${td} !border-b-0`}>Inside 24 hours</td><td className={`${td} !border-b-0 font-semibold`}>Full balance due regardless of cancellation</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-charcoal-soft text-[0.85rem] mt-4">
                Other bookings are turned away to hold your dates, which is why the 24-hour terms apply regardless of
                cancellation reason.
              </p>
            </div>

            <Divider id="rates-walking" label="Dog Walking" />

            {/* Dog Walking Rates */}
            <div className={rateBlock}>
              <h3 className="text-[1.2rem] mb-3 text-primary-dark">Walk Rates</h3>
              <p className={rateNote}>Solo walks are one-on-one. Group walks include other clients&apos; dogs on the same route.</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={th}>Length</th>
                      <th className={th}>Solo</th>
                      <th className={th}>Group</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className={td}>20 minutes</td><td className={tdLast}>$25</td><td className={tdLast}>$20</td></tr>
                    <tr><td className={td}>30 minutes</td><td className={tdLast}>$32</td><td className={tdLast}>$26</td></tr>
                    <tr><td className={td}>45 minutes</td><td className={tdLast}>$38</td><td className={tdLast}>$30</td></tr>
                    <tr><td className={`${td} !border-b-0`}>60 minutes</td><td className={`${tdLast} !border-b-0`}>$48</td><td className={`${tdLast} !border-b-0`}>$38</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dog Walking Add-Ons */}
            <div className={rateBlock}>
              <h3 className="text-[1.2rem] mb-3 text-primary-dark">Add-Ons</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={th}>Item</th>
                      <th className={th}>Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className={td}>Additional dog, same household</td><td className={tdLast}>+$7/walk</td></tr>
                    <tr><td className={td}>Weekend walks</td><td className={tdLast}>+$5/walk</td></tr>
                    <tr><td className={`${td} !border-b-0`}>Holiday walks</td><td className={`${tdLast} !border-b-0`}>+$10/walk</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Booking & Cancellation */}
            <div className={rateBlock}>
              <h3 className="text-[1.2rem] mb-3 text-primary-dark">Booking &amp; Cancellation</h3>
              <ul className="text-charcoal-soft space-y-2.5">
                <li className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                  Weekday walks can be requested the same morning, by 8am
                </li>
                <li className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                  Weekend walks require 48 hours notice
                </li>
                <li className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                  Walks are scheduled within a 2-hour arrival window, not an exact time
                </li>
                <li className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold">
                  <strong>Cancellation:</strong> 24 hours notice to cancel or reschedule without charge; cancellations
                  inside 24 hours are charged the full walk rate
                </li>
              </ul>
            </div>

            {/* Emergency Policy */}
            <div className="rounded-site p-7 px-8 mt-8 mx-auto max-w-[700px] bg-gold-light border-l-4 border-gold-dark">
              <h3 className="text-[1.1rem] mb-2 text-gold-dark">In an Emergency</h3>
              <p className="text-charcoal-soft">
                My approach is prevention-first: staying alert to hazards and avoiding unnecessary risk during every
                walk or stay. If a medical emergency does happen, I&apos;ll contact you immediately and arrange transport
                for your pet by pet taxi or with your help, to your designated vet, or to the nearest emergency vet if I
                can&apos;t reach you.
              </p>
            </div>

            {/* Sitter-Side Cancellation */}
            <div className="rounded-site p-7 px-8 mt-8 mx-auto max-w-[700px]" style={{ background: "#F6E3D8", borderLeft: "4px solid #3E6E8E" }}>
              <h3 className="text-[1.1rem] mb-2 text-primary-dark">If I Ever Need to Cancel</h3>
              <p className="text-charcoal-soft">
                If I ever need to cancel or reschedule, I&apos;ll reach out as early as possible. Same-day
                cancellations on my end come at no charge to you, and you&apos;ll get priority for rebooking.
              </p>
            </div>

            <p className="text-center mt-12">
              <a href="/#contact" className={btnPrimary}>
                Check Availability
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
