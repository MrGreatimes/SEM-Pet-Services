import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferCard from "@/components/OfferCard";

const btnPrimary =
  "inline-block px-7 py-3.5 rounded-full font-heading font-semibold text-base border-2 border-transparent bg-primary text-white transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-site cursor-pointer";

const inputClass =
  "font-body text-base px-3.5 py-3 border-[1.5px] border-cream-alt rounded-[10px] bg-cream text-charcoal w-full resize-y focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(62,110,142,0.3)]";

const labelClass = "font-heading font-semibold text-[0.9rem] -mb-1.5";

const siteUrl = "https://strolpetservices.com";

const serviceAreas = ["Crown Hill", "Ballard", "Shilshole", "Fremont", "Green Lake"];

const offeredServices = [
  "Overnight in-home pet sitting",
  "Dog walking",
  "Cat sitting",
  "Off-leash dog park trips",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Strol Pet Services",
  description:
    "Independent, in-home overnight pet sitting and dog walking in Seattle. Ten years of experience, with daily photo and text updates.",
  url: siteUrl,
  image: `${siteUrl}/images/Owner and dog 1 edit.jpeg`,
  logo: `${siteUrl}/images/Strol Pet Services Orange 2.png`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  areaServed: serviceAreas.map((name) => ({
    "@type": "City",
    name: `${name}, Seattle, WA`,
  })),
  knowsAbout: offeredServices,
  makesOffer: offeredServices.map((service) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: service },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="hero-bg relative min-h-screen flex items-center pt-[130px] pb-12 text-white max-[860px]:min-h-0 max-[860px]:pt-[110px]">
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,16,14,0.45) 0%, rgba(20,16,14,0.72) 100%)",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10 w-full mx-auto max-w-site px-6">
            <div className="max-w-[620px] mt-[100px]">
              <h1 className="text-white text-[2.6rem] max-[560px]:text-[2rem] mb-5">
                Trusted Overnight
                <br />
                Care and Secure Walking
              </h1>
              <p className="text-white/85 text-[1.05rem] max-w-[460px] mb-8">
                Independent overnight pet sitting and dog walking professional in Seattle.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a href="#contact" className={btnPrimary}>
                  Check Availability
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Why Strol
            </p>
            <h2 className="text-center">The Little Things That Matter</h2>
            <div className="grid grid-cols-4 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1 gap-6 mt-8">
              <div className="bg-white rounded-site p-7 px-5 text-center shadow-site">
                <div className="text-3xl mb-3">🔁</div>
                <h3 className="text-[1.05rem] mb-2">Established Pet Care Reputation</h3>
                <p className="text-charcoal-soft text-[0.92rem]">
                  Years of proven pet care, with past clients who keep coming back and asking for me by name.
                </p>
              </div>
              <div className="bg-white rounded-site p-7 px-5 text-center shadow-site">
                <div className="text-3xl mb-3">🙋</div>
                <h3 className="text-[1.05rem] mb-2">The Same Face Every Time</h3>
                <p className="text-charcoal-soft text-[0.92rem]">
                  One dedicated person, never a rotating roster, so your pet always knows who is walking through the
                  door.
                </p>
              </div>
              <div className="bg-white rounded-site p-7 px-5 text-center shadow-site">
                <div className="text-3xl mb-3">🐕</div>
                <h3 className="text-[1.05rem] mb-2">Dog Behavior Trained</h3>
                <p className="text-charcoal-soft text-[0.92rem]">
                  A psychology degree plus hands-on experience in dog psychology, so stress and trouble get spotted
                  before they start.
                </p>
              </div>
              <div className="bg-white rounded-site p-7 px-5 text-center shadow-site">
                <div className="text-3xl mb-3">💸</div>
                <h3 className="text-[1.05rem] mb-2">No Platform Fees</h3>
                <p className="text-charcoal-soft text-[0.92rem]">
                  Book directly with me. No agency or app taking a cut, just clear rates confirmed in writing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-16 bg-white">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              What I Offer
            </p>
            <h2 className="text-center">Overnight Pet Sitting &amp; Dog Walking</h2>

            <div className="grid grid-cols-4 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1 gap-6 max-w-site mx-auto mt-10">
              <OfferCard
                image="/images/1.jpeg"
                alt="Dog on a walk"
                title="20-Minute Walk"
                price="$25 per walk"
                items={["+$5 for weekends", "+$7 extra dog"]}
              />
              <OfferCard
                image="/images/11.jpeg"
                alt="Dog on a walk"
                title="30-Minute Walk"
                price="$32 per walk"
                items={["+$5 for weekends", "+$7 extra dog"]}
              />
              <OfferCard
                image="/images/14.jpeg"
                alt="Dog on a walk"
                title="45-Minute Walk"
                price="$38 per walk"
                items={["+$5 for weekends", "+$7 extra dog"]}
                imgClassName="object-[center_calc(50%-20px)]"
              />
              <OfferCard
                image="/images/4.jpeg"
                alt="Dog on a walk"
                title="60-Minute Walk"
                price="$48 per walk"
                items={["+$5 for weekends", "+$7 extra dog"]}
                note="Longer walks available upon request."
                imgClassName="object-[center_calc(50%-75px)]"
              />
            </div>

            <div className="grid grid-cols-3 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1 gap-6 max-w-[900px] mx-auto mt-6">
              <OfferCard
                image="/images/16.jpeg"
                alt="Dog at the off-leash park"
                title="Off-Leash Dog Park Trip"
                price="$45 per trip"
                items={["+$40 per extra dog"]}
                note="Two hours at a nearby off-leash park."
              />
              <OfferCard
                image="/images/13.jpeg"
                alt="A cat in care"
                title="Cat Sitting"
                price="$27–$42 per visit"
                items={[
                  "$27 per 30-minute visit",
                  "$35 per 45-minute visit",
                  "$42 per 60-minute visit",
                  "$60 for overnight house sitting",
                  "+$5 for weekends and evenings after 4pm",
                ]}
                note="No extra fees for additional cats."
                imgClassName="scale-125"
              />
              <OfferCard
                image="/images/7.jpeg"
                alt="Dog resting comfortably outdoors"
                title="Overnight Stay + 3 Walks"
                price="From $90 per night"
                items={[
                  "Three 20-minute walks: $90/night",
                  "Three 30-minute walks: $111/night",
                  "Three 45-minute walks: $132/night",
                  "Three 60-minute walks: $156/night",
                ]}
                note="Three walks a day, minimum, included in every overnight stay."
              />
            </div>
          </div>
        </section>

        {/* OUR MISSION */}
        <section id="mission" className="py-16 bg-gold-light">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Our Mission
            </p>
            <h2 className="text-center">Every Dog Deserves to Feel at Home</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">
              Ten years of caring for dogs of every age and temperament has taught me that trust is earned one visit
              at a time, not promised in a listing.
            </p>

            <div className="grid grid-cols-[1.2fr_0.8fr] max-[860px]:grid-cols-1 gap-10 items-center max-w-[900px] mx-auto mt-10">
              <div className="flex flex-col gap-4">
                <p className="text-charcoal-soft">
                  Born and raised in Seattle, I&apos;ve spent the last ten years caring for the pets of friends,
                  family, and neighbors, long before this was a business. I have hands-on experience across dogs, cats, birds, rabbits, and
                  more, from high-energy puppies to senior dogs who need a slower pace.
                </p>
                <p className="text-charcoal-soft">
                  I don&apos;t have pets of my own right now, so I get my fix by taking care of yours. (The cat in
                  this photo is one of five I earned the trust of, slowly, over several months, in a single
                  client&apos;s home.) My approach is structured and calm, friendly but focused, so every walk or
                  stay stays organized and predictable for your pet.
                </p>
              </div>
              <div className="relative w-full aspect-[900/837] rounded-site shadow-[0_4px_10px_rgba(58,46,40,0.1),0_20px_40px_rgba(58,46,40,0.16)] overflow-hidden">
                <Image
                  src="/images/Owner and dog 1 edit.jpeg"
                  alt="The owner of Strol with a dog"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE AREA */}
        <section id="area" className="py-14 bg-white">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Where I Work
            </p>
            <h2 className="text-center">Service Area</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">
              Seattle neighborhoods from Crown Hill south to Fremont, and Shilshole east to Green Lake, anywhere I
              can reach by bike.
            </p>
            <div className="flex justify-center gap-2.5 flex-wrap my-7">
              {["Crown Hill", "Ballard", "Shilshole", "Fremont", "Green Lake"].map((n) => (
                <span
                  key={n}
                  className="bg-gold-light text-gold-dark font-heading font-semibold text-[0.85rem] px-4 py-1.5 rounded-full"
                >
                  {n}
                </span>
              ))}
            </div>
            <p className="text-charcoal-soft text-[0.85rem] text-center">
              Not sure if your neighborhood is covered? Just ask, I&apos;m happy to check.
            </p>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="py-14 bg-cream-alt">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              What Clients Say
            </p>
            <h2 className="text-center">Testimonials</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">
              Reviews are on their way. If you&apos;ve worked with me before, I&apos;d love to hear how it went.
            </p>

            <form
              className="bg-white rounded-site shadow-site p-8 max-w-[560px] mx-auto mt-10 flex flex-col gap-3.5"
              action="https://formspree.io/f/xjykrlgr"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New testimonial submission from Strol website" />
              <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-2 max-[560px]:grid-cols-1 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="review-name" className={labelClass}>
                    First Name
                  </label>
                  <input type="text" id="review-name" name="name" autoComplete="given-name" required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="review-pet" className={labelClass}>
                    Pet&apos;s Name
                  </label>
                  <input type="text" id="review-pet" name="pet_name" className={inputClass} />
                </div>
              </div>

              <label htmlFor="review-service" className={labelClass}>
                Service
              </label>
              <select id="review-service" name="service" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Overnight Sitting">Overnight Sitting</option>
                <option value="Dog Walking">Dog Walking</option>
              </select>

              <label htmlFor="review-text" className={labelClass}>
                Your Review
              </label>
              <textarea
                id="review-text"
                name="review"
                rows={4}
                placeholder="e.g. How did your pet seem after their stay? Did you get the updates you expected? Would you book again?"
                required
                className={inputClass}
              />

              <label className="flex items-center gap-3 text-[0.88rem] text-charcoal-soft font-body font-normal bg-cream border-[1.5px] border-cream-alt rounded-[10px] px-3.5 py-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="consent_to_publish"
                  value="Yes"
                  required
                  className="w-[18px] h-[18px] flex-none accent-primary cursor-pointer"
                />
                <span>Okay to feature this review, with my name, on the site</span>
              </label>

              <button type="submit" className={`${btnPrimary} self-start mt-2`}>
                Submit Review
              </button>
            </form>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-16 pb-24 bg-white">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Get In Touch
            </p>
            <h2 className="text-center">Check Availability</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">
              Tell me about your dog and the dates you need, and I&apos;ll follow up to set up a free meet &amp;
              greet.
            </p>

            <ol className="flex justify-center flex-wrap gap-6 my-8">
              {[
                "I respond within 24 hours",
                "We confirm the details",
                "Free meet & greet, in public",
                "Booking confirmed",
              ].map((step, i) => (
                <li key={step} className="flex items-center gap-2.5 text-[0.88rem] font-semibold text-charcoal-soft">
                  <span className="inline-flex items-center justify-center flex-none w-6 h-6 rounded-full bg-primary text-white font-heading text-[0.78rem] font-bold">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-10 max-w-[640px] mx-auto">
              <form
                className="bg-white rounded-site shadow-site p-8 flex flex-col gap-3.5"
                action="https://formspree.io/f/xjykrlgr"
                method="POST"
              >
                <input type="hidden" name="_subject" value="New inquiry from Strol website" />
                <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <label htmlFor="name" className={labelClass}>
                  Your Name
                </label>
                <input type="text" id="name" name="name" autoComplete="name" required className={inputClass} />

                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input type="email" id="email" name="email" autoComplete="email" required className={inputClass} />

                <label htmlFor="dates" className={labelClass}>
                  Dates Needed
                </label>
                <input type="text" id="dates" name="dates" placeholder="e.g. Aug 12–16" className={inputClass} />

                <label htmlFor="dog-info" className={labelClass}>
                  About Your Dog
                </label>
                <textarea
                  id="dog-info"
                  name="dog_info"
                  rows={3}
                  placeholder="Breed, age, temperament, any special needs"
                  className={inputClass}
                />

                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea id="message" name="message" rows={4} className={inputClass} />

                <button type="submit" className={`${btnPrimary} self-start mt-2`}>
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
