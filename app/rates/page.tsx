import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { btnPrimary } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Rates & Policies | Strol Pet Services",
  description:
    "Rates for overnight pet sitting and dog walking in North Seattle, plus deposit, cancellation, and booking policies from Strol Pet Services.",
};

// Page order: hero, what's always included, rates (overnight and walking side by side
// on desktop, stacked at <=860px), booking checklist, all policies in one block, CTA.
// The header's on-page tab bar (Overnight | Walking | Policies) links to the ids below;
// `anchor` offsets jumps so headings land below the fixed header + tab bar.

const subnav = [
  { id: "overnight", label: "Overnight" },
  { id: "walking", label: "Walking" },
  { id: "policies", label: "Policies" },
];

const anchor = "scroll-mt-[150px]";
const card = "bg-white rounded-site shadow-site p-8 max-[560px]:p-6";
const narrow = "mx-auto max-w-[700px]";
const rateNote = "text-charcoal-soft text-[0.92rem] mb-4";
const th = "text-left font-heading text-[0.85rem] uppercase tracking-wide text-charcoal-soft px-3 py-2.5 border-b-2 border-cream-alt";
const td = "px-3 py-3 border-b border-cream-alt";
const tdLast = "px-3 py-3 border-b border-cream-alt font-bold text-primary-dark whitespace-nowrap";
const bullet = "relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold";
const check = "relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-gold-dark before:font-bold";
const blockTitle = "text-[1.2rem] mb-3 text-primary-dark";
const subTitle = "font-heading font-bold text-[1rem] text-charcoal mb-2";

function Divider({ id, label, className = "" }: { id?: string; label: string; className?: string }) {
  return (
    <div id={id} className={`flex items-center gap-4 mb-6 ${id ? anchor : ""} ${className}`}>
      <span className="flex-1 h-px bg-cream-alt" />
      <h2 className="font-heading font-bold text-[1.15rem] text-primary-dark whitespace-nowrap">{label}</h2>
      <span className="flex-1 h-px bg-cream-alt" />
    </div>
  );
}

export default function RatesPage() {
  return (
    <>
      <Header lightPage subnav={subnav} />

      <main>
        <section id="rates" className="pt-[180px] max-[860px]:pt-[160px] pb-24 bg-white">
          <div className="mx-auto max-w-site px-6">
            {/* Hero */}
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Rates &amp; Policies
            </p>
            <h1 className="text-center text-[1.5rem]">Pricing You Can Plan Around</h1>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">
              Independent, direct-booking rates. Everything below is confirmed in writing before your stay or walk
              begins.
            </p>

            {/* What's Always Included (applies to both services) */}
            <div className={`${narrow} mt-10 rounded-site p-7 px-8 max-[560px]:p-6 bg-gold-light border-l-4 border-gold-dark`}>
              <h2 className="text-[1.1rem] mb-3 text-gold-dark">What&apos;s Always Included</h2>
              <ul className="text-charcoal-soft space-y-2.5">
                <li className={check}>
                  Meet &amp; greet: Offered before a first booking.
                </li>
                <li className={check}>
                  Basic medication administration and routine special needs
                </li>
                <li className={check}>Daily photo/text updates</li>
              </ul>
            </div>

            {/* Rates: two columns on desktop, stacked at <=860px */}
            <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-8 max-[860px]:gap-14 mt-14 items-start">
              <div id="overnight" className={anchor}>
                <Divider label="Overnight Pet Sitting" />

                <div className={card}>
                  <h3 className={blockTitle}>Base Rate</h3>
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

                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>Add-Ons</h3>
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
              </div>

              <div id="walking" className={anchor}>
                <Divider label="Dog Walking" />

                <div className={card}>
                  <h3 className={blockTitle}>Walk Rates</h3>
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

                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>Add-Ons</h3>
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

                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>Booking</h3>
                  <ul className="text-charcoal-soft space-y-2.5">
                    <li className={bullet}>Weekday walks can be requested the same morning, by 8am</li>
                    <li className={bullet}>Weekend walks require 48 hours notice</li>
                    <li className={bullet}>Walks are scheduled within a 2-hour arrival window, not an exact time</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Before Your First Booking */}
            <div className={`${narrow} ${card} mt-14`}>
              <h2 className={blockTitle}>Before Your First Booking</h2>
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
                  <li key={item} className={check}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies: every cancellation, payment and emergency term in one place */}
            <div className={`${narrow} mt-14`}>
              <Divider id="policies" label="Policies" />

              <div className={card}>
                <h3 className={blockTitle}>If You Cancel</h3>

                <h4 className={subTitle}>Overnight stays</h4>
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

                <h4 className={`${subTitle} mt-6`}>Dog walks</h4>
                <p className="text-charcoal-soft">
                  24 hours notice to cancel or reschedule without charge; cancellations inside 24 hours are charged the
                  full walk rate
                </p>
              </div>

              <div className="rounded-site p-7 px-8 max-[560px]:p-6 mt-8" style={{ background: "#F6E3D8", borderLeft: "4px solid #3E6E8E" }}>
                <h3 className="text-[1.1rem] mb-2 text-primary-dark">If I Cancel</h3>
                <p className="text-charcoal-soft">
                  If I ever need to cancel or reschedule, I&apos;ll reach out as early as possible. Same-day
                  cancellations on my end come at no charge to you, and you&apos;ll get priority for rebooking.
                </p>
              </div>

              <div className={`${card} mt-8`}>
                <h3 className={blockTitle}>Deposit &amp; Payment</h3>
                <ul className="text-charcoal-soft space-y-2.5">
                  <li className={bullet}>
                    <strong>Deposit:</strong> 25% of total, due to hold the dates
                  </li>
                  <li className={bullet}>Deposit becomes non-refundable if canceled inside 7 days of the start date</li>
                  <li className={bullet}>
                    <strong>Balance due:</strong> day of arrival
                  </li>
                  <li className={bullet}>Total dollar amount confirmed in writing (text/email) before the stay begins</li>
                </ul>
                <div className="flex gap-2.5 mt-5 flex-wrap">
                  {["Venmo", "Zelle", "Cash"].map((m) => (
                    <span key={m} className="bg-gold-light text-gold-dark font-heading font-semibold text-[0.85rem] px-4 py-1.5 rounded-full">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-site p-7 px-8 max-[560px]:p-6 mt-8 bg-gold-light border-l-4 border-gold-dark">
                <h3 className="text-[1.1rem] mb-2 text-gold-dark">In an Emergency</h3>
                <p className="text-charcoal-soft">
                  My approach is prevention-first: staying alert to hazards and avoiding unnecessary risk during every
                  walk or stay. If a medical emergency does happen, I&apos;ll contact you immediately and arrange transport
                  for your pet by pet taxi or with your help, to your designated vet, or to the nearest emergency vet if I
                  can&apos;t reach you.
                </p>
              </div>
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
