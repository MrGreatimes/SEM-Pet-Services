import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { btnPrimary } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Rates & Policies | Strol Pet Services",
  description:
    "Rates for dog walking, overnight pet sitting, cat sitting, and dog park trips in North Seattle, plus deposit and cancellation policies.",
};

// Page order: hero, what's always included, rates (walking and overnight side by side
// on desktop, stacked at <=860px), cat sitting and dog park (same two-column layout),
// booking checklist, all policies in one block, CTA.
// The header's on-page tab bar (Walking | Overnight | Cat Sitting | Dog Park | Policies) links to the ids below;
// `anchor` offsets jumps so headings land below the fixed header + tab bar.

const subnav = [
  { id: "walking", label: "Walking" },
  { id: "overnight", label: "Overnight" },
  { id: "cat-sitting", label: "Cat Sitting" },
  { id: "dog-park", label: "Dog Park" },
  { id: "policies", label: "Policies" },
];

const anchor = "scroll-mt-[150px] max-[440px]:scroll-mt-[184px]";
const card = "bg-white rounded-site shadow-site p-8 max-[560px]:p-6";
const narrow = "mx-auto max-w-[700px]";
const rateNote = "text-charcoal-soft text-[0.92rem] mb-4";
const th = "text-left font-heading text-[0.85rem] uppercase tracking-wide text-charcoal-soft px-3 max-[440px]:px-2.5 py-2.5 border-b-2 border-cream-alt";
const td = "px-3 max-[440px]:px-2.5 py-3 border-b border-cream-alt";
const tdLast = "px-3 max-[440px]:px-2.5 py-3 border-b border-cream-alt font-bold text-primary-dark whitespace-nowrap";
const bullet = "relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary before:font-bold";
const check = "relative pl-5 before:content-['✓'] before:absolute before:left-0 before:text-gold-ink before:font-bold";
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
        <section id="rates" className="pt-[180px] max-[860px]:pt-[160px] max-[440px]:pt-[196px] pb-24 bg-white">
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
              <h2 className="text-[1.1rem] mb-3 text-gold-ink">What&apos;s Always Included</h2>
              <ul className="text-charcoal-soft space-y-2.5">
                <li className={check}>
                  Meet &amp; greet: Offered before a first booking.
                </li>
                <li className={check}>
                  Basic medication administration and routine special needs
                </li>
                <li className={check}>Daily photo/text updates</li>
                <li className={check}>
                  Indoor enrichment sessions available: puzzle feeding, scent games, and short training reps, drawing on
                  professional behavioral training
                </li>
              </ul>
            </div>

            {/* Rates: dog walking first, then overnight; two columns on desktop, stacked at <=860px */}
            <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-8 max-[860px]:gap-14 mt-14 items-start">
              <div id="walking" className={anchor}>
                <Divider label="Dog Walking" />

                <div className={card}>
                  <h3 className={blockTitle}>Walk Rates</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className={th}>Length</th>
                          <th className={th}>Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className={td}>20 minutes</td><td className={tdLast}>$25</td></tr>
                        <tr><td className={td}>30 minutes</td><td className={tdLast}>$32</td></tr>
                        <tr><td className={td}>45 minutes</td><td className={tdLast}>$38</td></tr>
                        <tr><td className={`${td} !border-b-0`}>60 minutes</td><td className={`${tdLast} !border-b-0`}>$48</td></tr>
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
                        <tr><td className={`${td} !border-b-0`}>Holiday walks (Thanksgiving, Dec 24&ndash;Jan 1, July 4th)</td><td className={`${tdLast} !border-b-0`}>+$10/walk</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-charcoal-soft text-[0.85rem] mt-4">Holiday rates replace weekend rates.</p>
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

              <div id="overnight" className={anchor}>
                <Divider label="Overnight Pet Sitting" />

                <div className={card}>
                  <h3 className={blockTitle}>Base Rate</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className={th}>Service</th>
                          <th className={th}>Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className={`${td} !border-b-0`}>Overnight stay (base)</td><td className={`${tdLast} !border-b-0`}>$70/night</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className={`${rateNote} mt-4 !mb-0`}>
                    Covers care for one dog: arrival and departure, two feedings, four to five potty trips (5&ndash;10 minutes, out and
                    back), pad maintenance, overnight house presence, and daily photo and text updates.
                  </p>
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
                        <tr><td className={td}>20-minute walk</td><td className={tdLast}>+$15/day</td></tr>
                        <tr><td className={td}>30-minute walk</td><td className={tdLast}>+$19/day</td></tr>
                        <tr><td className={td}>45-minute walk</td><td className={tdLast}>+$24/day</td></tr>
                        <tr><td className={td}>60-minute walk</td><td className={tdLast}>+$30/day</td></tr>
                        <tr><td className={td}>20-minute enrichment session</td><td className={tdLast}>+$12/day</td></tr>
                        <tr><td className={td}>No yard access (street-only potty trips)</td><td className={tdLast}>+$10/night</td></tr>
                        <tr><td className={td}>Each additional dog, base care</td><td className={tdLast}>+$7/night</td></tr>
                        <tr><td className={td}>Each additional dog, per walk</td><td className={tdLast}>+$7/walk</td></tr>
                        <tr><td className={td}>Complex behavioral/<wbr />reactive dog handling</td><td className={tdLast}>+$10&ndash;15/night</td></tr>
                        <tr><td className={td}>Holiday surcharge (Thanksgiving, Dec 24&ndash;Jan 1, July 4th)</td><td className={tdLast}>+30%</td></tr>
                        <tr><td className={`${td} !border-b-0`}>Last-minute booking (inside 72 hours of start date)</td><td className={`${tdLast} !border-b-0`}>+$20 flat</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>Common Builds</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className={th}>Profile</th>
                          <th className={th}>Nightly</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className={td}>Yard access, no walks</td><td className={tdLast}>$70</td></tr>
                        <tr><td className={td}>One 20-minute walk, yard</td><td className={tdLast}>$85</td></tr>
                        <tr><td className={td}>Apartment, pad-trained, one enrichment session</td><td className={tdLast}>$92</td></tr>
                        <tr><td className={td}>Two 20-minute walks, apartment</td><td className={tdLast}>$110</td></tr>
                        <tr><td className={td}>Three 20-minute walks</td><td className={tdLast}>$115</td></tr>
                        <tr><td className={`${td} !border-b-0`}>Three 60-minute walks</td><td className={`${tdLast} !border-b-0`}>$160</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Cat Sitting and Off-Leash Dog Park: side by side on desktop */}
            <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-8 max-[860px]:gap-14 mt-14 items-start">
              <div id="cat-sitting" className={anchor}>
                <Divider label="Cat Sitting" />
                <div className={card}>
                  <h3 className={blockTitle}>Visit Rates</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className={th}>Visit</th>
                          <th className={th}>Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className={td}>30-minute visit</td><td className={tdLast}>$27</td></tr>
                        <tr><td className={td}>45-minute visit</td><td className={tdLast}>$35</td></tr>
                        <tr><td className={td}>60-minute visit</td><td className={tdLast}>$42</td></tr>
                        <tr><td className={`${td} !border-b-0`}>Overnight house sitting</td><td className={`${tdLast} !border-b-0`}>$75</td></tr>
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
                        <tr><td className={td}>Weekend and evening visits (after 4pm)</td><td className={tdLast}>+$5/visit</td></tr>
                        <tr><td className={td}>Holiday visits (Thanksgiving, Dec 24&ndash;Jan 1, July 4th)</td><td className={tdLast}>+$10/visit</td></tr>
                        <tr><td className={`${td} !border-b-0`}>Holiday overnight house sitting</td><td className={`${tdLast} !border-b-0`}>+30%</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-charcoal-soft text-[0.85rem] mt-4">Holiday rates replace weekend rates.</p>
                </div>
              </div>

              <div id="dog-park" className={anchor}>
                <Divider label="Off-Leash Dog Park" />
                <div className={card}>
                  <h3 className={blockTitle}>Park Trips</h3>
                  <p className={rateNote}>Two hours at a nearby off-leash park.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className={th}>Trip</th>
                          <th className={th}>Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className={`${td} !border-b-0`}>Off-leash dog park trip</td><td className={`${tdLast} !border-b-0`}>$70 per trip</td></tr>
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
                        <tr><td className={td}>Each extra dog</td><td className={tdLast}>+$20</td></tr>
                        <tr><td className={`${td} !border-b-0`}>Holiday trips (Thanksgiving, Dec 24&ndash;Jan 1, July 4th)</td><td className={`${tdLast} !border-b-0`}>+$10/trip</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Before Your First Booking */}
            <div className={`${narrow} ${card} mt-14`}>
              <h2 className={blockTitle}>Before Your First Booking</h2>
              <p className={rateNote}>Get these before your first walk or stay:</p>
              <ul className="text-charcoal-soft space-y-2.5">
                {[
                  "Emergency contact info",
                  "Vet name, clinic, and phone number",
                  "Current vaccination records (rabies required; Bordetella for dog park trips)",
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

                <h4 className={subTitle}>Overnight stays (including cat overnight house sitting)</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className={th}>Timing</th>
                        <th className={th}>Terms</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className={td}>More than 48 hours before start</td><td className={`${td} font-semibold`}>Deposit refunded</td></tr>
                      <tr><td className={td}>24 to 48 hours before start</td><td className={`${td} font-semibold`}>Deposit non-refundable</td></tr>
                      <tr><td className={`${td} !border-b-0`}>Inside 24 hours</td><td className={`${td} !border-b-0 font-semibold`}>50% of the total stay due (deposit included)</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-charcoal-soft text-[0.85rem] mt-4">
                  Other bookings are turned away to hold your dates, which is why these terms apply regardless of
                  cancellation reason.
                </p>

                <h4 className={`${subTitle} mt-6`}>Dog walks, cat visits and park trips</h4>
                <p className="text-charcoal-soft">
                  24 hours notice to cancel or reschedule without charge; cancellations inside 24 hours are charged the
                  full rate
                </p>
              </div>

              <div className="rounded-site p-7 px-8 max-[560px]:p-6 mt-8" style={{ background: "#F6E3D8", borderLeft: "4px solid #3E6E8E" }}>
                <h3 className="text-[1.1rem] mb-2 text-primary-dark">If I Cancel</h3>
                <p className="text-charcoal-soft">
                  If I ever need to cancel or reschedule, I&apos;ll reach out as early as possible. You&apos;re never
                  charged for a cancellation on my end, any deposit is refunded in full, and you&apos;ll get priority for
                  rebooking.
                </p>
              </div>

              <div className={`${card} mt-8`}>
                <h3 className={blockTitle}>Deposit &amp; Payment</h3>
                <h4 className={subTitle}>Overnight stays</h4>
                <ul className="text-charcoal-soft space-y-2.5">
                  <li className={bullet}>
                    <strong>Deposit:</strong> 25% of total, due to hold the dates
                  </li>
                  <li className={bullet}>Deposit becomes non-refundable if canceled within 48 hours of the start</li>
                  <li className={bullet}>
                    <strong>Balance due:</strong> day of arrival
                  </li>
                  <li className={bullet}>Total dollar amount confirmed in writing (text/email) before the stay begins</li>
                </ul>
                <h4 className={`${subTitle} mt-6`}>Walks, visits and park trips</h4>
                <p className="text-charcoal-soft">Paid after each service</p>
                <div className="flex gap-2.5 mt-5 flex-wrap">
                  {["Venmo", "Zelle", "Cash"].map((m) => (
                    <span key={m} className="bg-gold-light text-gold-ink font-heading font-semibold text-[0.85rem] px-4 py-1.5 rounded-full">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-site p-7 px-8 max-[560px]:p-6 mt-8 bg-gold-light border-l-4 border-gold-dark">
                <h3 className="text-[1.1rem] mb-2 text-gold-ink">In an Emergency</h3>
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
