import Image from "next/image";
import { preload } from "react-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferCard from "@/components/OfferCard";
import ReviewForm from "@/components/ReviewForm";
import ContactForm from "@/components/ContactForm";
import { btnPrimary } from "@/lib/styles";
import { neighborhoods } from "@/lib/neighborhoods";


const siteUrl = "https://strolpetservices.com";


const offeredServices = [
  "Overnight in-home pet sitting",
  "Dog walking",
  "Cat sitting",
  "Off-leash dog park trips",
];

const whyCards = [
  {
    emoji: "⭐",
    title: "Trusted & Reputable",
    text: "Years of dependable pet care, with past clients who keep coming back and asking for me by name.",
  },
  {
    emoji: "🌿",
    title: "Down-to-Earth Personality",
    text: "A calm, welcoming presence that puts pets at ease, balanced with firm, structured guidance for dogs and their people alike.",
  },
  {
    emoji: "🧠",
    title: "Behavior Management Trained",
    text: "Professional training in reading pets and people, so I catch stress early and keep every visit steady and structured.",
  },
  {
    emoji: "🤝",
    title: "No Platform Fees",
    text: "Book directly with me. No agency or app taking a cut, just clear rates confirmed in writing.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Strol Pet Services",
  description:
    "Independent, in-home overnight pet sitting and dog walking in Seattle. Ten years of experience, with daily photo and text updates.",
  url: siteUrl,
  image: encodeURI(`${siteUrl}/images/Owner and Chloe 1 edit.jpeg`),
  logo: encodeURI(`${siteUrl}/images/Strol Pet Services Orange 2.png`),
  priceRange: "$$",
  knowsLanguage: ["en", "es"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Seattle",
    addressRegion: "WA",
    addressCountry: "US",
  },
  areaServed: neighborhoods.map((name) => ({
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
  // The hero photo is a CSS background (.hero-bg in globals.css), which the
  // browser normally finds only after the stylesheet loads. Preloading it
  // starts the download right away; it's the page's LCP image.
  preload("/images/background.webp", { as: "image", fetchPriority: "high" });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main>
        {/* HERO */}
        <section className="hero-bg relative min-h-screen flex items-center pt-[130px] pb-12 text-white max-[860px]:min-h-[100svh] max-[860px]:pt-[110px] max-[860px]:items-end max-[860px]:pb-16">
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

        {/* WHY STROL */}
        {/* On phones (<=560px) the cards become compact rows (emoji left, text right).
            At <=440px the section fills the screen height and the four cards stretch
            equally to fill the space below the heading. */}
        <section className="py-12 max-[560px]:py-10 bg-white max-[440px]:min-h-[100svh] max-[440px]:pt-12 max-[440px]:pb-2 max-[440px]:flex">
          <div className="mx-auto max-w-site px-6 max-[440px]:w-full max-[440px]:flex max-[440px]:flex-col">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Why Strol
            </p>
            <h2 className="text-center">The Little Things That Matter</h2>
            <div className="grid grid-cols-4 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1 gap-6 max-[560px]:gap-3 mt-8 max-[560px]:mt-6 max-[440px]:flex-1 max-[440px]:min-h-0 max-[440px]:auto-rows-fr max-[440px]:gap-1.5 max-[440px]:mt-3">
              {whyCards.map(({ emoji, title, text }) => (
                <div
                  key={title}
                  className="bg-white rounded-site p-7 px-5 text-center shadow-site max-[560px]:flex max-[560px]:items-start max-[440px]:items-center max-[560px]:gap-4 max-[560px]:p-4 max-[440px]:py-2.5 max-[440px]:gap-3 max-[560px]:text-left"
                >
                  <div aria-hidden="true" className="text-3xl mb-3 max-[560px]:text-2xl max-[440px]:text-xl max-[560px]:mb-0 max-[560px]:shrink-0">{emoji}</div>
                  <div>
                    <h3 className="text-[1.05rem] mb-2 max-[560px]:text-base max-[440px]:text-[0.9rem] max-[560px]:mb-1">{title}</h3>
                    <p className="text-charcoal-soft text-[0.92rem] max-[560px]:text-[0.85rem] max-[440px]:text-[0.78rem] max-[560px]:leading-snug">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-16 max-[440px]:pt-10 max-[440px]:pb-12 bg-white">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              What I Offer
            </p>
            <h2 className="text-center">Dog Walking, Pet Sitting &amp; Park Trips</h2>

            <div className="grid grid-cols-4 max-[860px]:grid-cols-1 gap-6 max-[860px]:gap-2.5 max-w-site max-[860px]:max-w-[560px] mx-auto mt-8 max-[560px]:mt-6 max-[440px]:mt-4">
              <OfferCard
                image="/images/Kaasie 1.jpeg"
                alt="German shepherd resting its head on a lap"
                title="20-Minute Walk"
                price="$25 per walk"
              />
              <OfferCard
                image="/images/Fleia.jpeg"
                alt="Dog on a walk"
                title="30-Minute Walk"
                price="$32 per walk"
              />
              <OfferCard
                image="/images/Honeybee 2.jpeg"
                alt="Golden retriever on a leash beside blue hydrangeas"
                title="45-Minute Walk"
                price="$38 per walk"
                imgClassName="object-[center_40%]"
              />
              <OfferCard
                image="/images/Bunnie 1.jpeg"
                alt="Dog on a walk"
                title="60-Minute Walk"
                price="$48 per walk"
                imgClassName="object-[center_80%]"
              />
            </div>

            <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-6 max-[860px]:gap-2.5 max-w-[900px] max-[860px]:max-w-[560px] mx-auto mt-6 max-[860px]:mt-2.5">
              <OfferCard
                image="/images/Ollie 2.jpeg"
                alt="Dog lying in the dirt at an off-leash park"
                title="Off-Leash Dog Park Trip"
                price="$45 per trip"
                items={["+$20 per extra dog"]}
                note="Two hours at a nearby off-leash park."
              />
              <OfferCard
                image="/images/Manu 2.jpeg"
                alt="Tabby cat stretched out on a pink blanket"
                title="Cat Sitting"
                price="$27–$42 per visit"
                items={["30 to 60-minute visits, plus overnight house sitting."]}
              />
              <OfferCard
                image="/images/Biker 1.jpeg"
                alt="Dog resting comfortably outdoors"
                title="Overnight Stay + 3 Walks"
                price="From $90 per night"
                items={[
                  "Three 20-minute walks: $90/night",
                  "Three 30-minute walks: $111/night",
                  "Three 45-minute walks: $132/night",
                  "Three 60-minute walks: $156/night",
                ]}
              />
            </div>

            <p className="text-center mt-8 max-[860px]:mt-6">
              <a href="/rates" className="font-heading font-semibold text-primary-dark underline underline-offset-4 hover:text-primary">
                See all rates &amp; policies &rarr;
              </a>
            </p>
          </div>
        </section>

        {/* MY MISSION */}
        {/* At <=440px the photo floats right with the bio text wrapping around it, and
            the type/spacing tighten, and the yellow section fills the screen with its
            content fitted between the header pill (ends at 84px) and the screen bottom,
            anchored at the top (92px, same as Why Strol) so it stays put across widths. */}
        <section id="mission" className="py-16 bg-gold-light max-[440px]:min-h-[100svh] max-[440px]:pt-12 max-[440px]:pb-4 max-[440px]:flex">
          <div className="mx-auto max-w-site px-6 max-[440px]:w-full">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              My Mission
            </p>
            <h2 className="text-center">Every Dog Deserves to Feel Loved</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 max-[440px]:mt-2 max-[440px]:text-[0.95rem] max-[440px]:leading-snug text-center max-[440px]:text-left">
              Ten years of caring for dogs of every age and temperament has taught me that trust is earned one visit
              at a time, not promised in a listing.
            </p>

            <div className="grid grid-cols-[1.2fr_0.8fr] max-[860px]:grid-cols-1 gap-10 items-center max-w-[900px] mx-auto mt-10 max-[440px]:flow-root max-[440px]:mt-4">
              <div className="relative w-full aspect-[900/837] col-start-2 row-start-1 max-[860px]:col-start-1 max-[860px]:row-start-2 max-[440px]:float-right max-[440px]:w-[48%] max-[440px]:ml-3 max-[440px]:mb-1.5 max-[440px]:mt-1 rounded-site shadow-[0_4px_10px_rgba(58,46,40,0.1),0_20px_40px_rgba(58,46,40,0.16)] overflow-hidden">
                <Image
                  src="/images/Owner and Chloe 1 edit.jpeg"
                  alt="The owner of Strol with a dog"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-4 col-start-1 row-start-1 max-[440px]:block max-[440px]:text-[0.95rem] max-[440px]:leading-snug max-[440px]:[&>p+p]:mt-3">
                <p className="text-charcoal-soft">
                  Hi, I&apos;m Sean. Born and raised in Seattle, I&apos;ve spent the last ten years caring for the pets of friends,
                  family, and neighbors, long before this was a business. I have hands-on experience across dogs,
                  cats, birds, rabbits, and more, from high-energy puppies to senior dogs who need a slower pace. I
                  speak both English and Spanish, so you can book and get updates in whichever you prefer.
                </p>
                <p className="text-charcoal-soft">
                  I don&apos;t have pets of my own right now, so I get my fix by taking care of yours. (I once earned
                  the trust of five cats, slowly, over several months, in a single client&apos;s home.) My approach is structured and calm, friendly but focused, so every walk
                  and stay is organized and predictable for your pet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICE AREA */}
        {/* At <=440px the section is exactly one screen tall (the map stretches to fill
            whatever height is left, so the button always ends at the bottom) and its top padding clears
            the floating header pill (ends at 84px), matching the Why Strol and Mission
            sections; content stays anchored at the top. The map is a keyless Google Maps
            embed (no mapping library), lazy-loaded. */}
        <section id="area" className="py-14 max-[440px]:pt-12 max-[440px]:pb-6 max-[440px]:min-h-[100svh] max-[440px]:flex bg-white">
          <div className="mx-auto max-w-[720px] px-6 max-[440px]:w-full max-[440px]:flex max-[440px]:flex-col">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Where I Work
            </p>
            <h2 className="text-center">Service Area</h2>
            <p className="text-charcoal-soft mt-3 max-[440px]:mt-2 text-center max-[440px]:text-left max-[440px]:text-[0.95rem] max-[440px]:leading-snug">
              I&apos;m based in Ballard and sit throughout North Seattle: hill to hill, shore to shore. Crown Hill down to
              Queen Anne, Puget Sound across to Lake Washington.
            </p>

            <div className="rounded-site p-6 px-7 max-[440px]:p-4 mt-6 max-[440px]:mt-4 bg-gold-light border-l-4 border-gold-dark">
              <h3 className="text-[1.1rem] max-[440px]:text-base mb-2 max-[440px]:mb-1 text-gold-ink">Outside that range?</h3>
              <p className="text-charcoal-soft text-[0.95rem] max-[440px]:text-[0.875rem] max-[440px]:leading-snug">
                Reach out anyway. I take bookings across greater Seattle and figure it out case by case.
              </p>
            </div>

            <div className="relative mt-6 max-[440px]:mt-4 aspect-video max-[560px]:aspect-[4/3] max-[440px]:aspect-auto max-[440px]:flex-1 max-[440px]:min-h-[160px] rounded-site overflow-hidden shadow-site bg-cream-alt">
              {/* Google My Maps embed with the custom service-area boundary (Crown Hill to
                  Queen Anne, Puget Sound to Lake Washington). Its framing comes from the
                  map's saved default view in My Maps. My Maps always shows a 46px title bar;
                  the iframe is shifted up and made 46px taller so the frame (overflow-hidden)
                  crops it off, leaving Google's attribution at the bottom visible. */}
              <iframe
                title="Map of the Strol Pet Services area in North Seattle"
                src="https://www.google.com/maps/d/embed?mid=1SVwcGDoesTB7NbzgF1NtwevxwBSE4s4&ehbc=2E312F&noprof=1"
                className="absolute left-0 -top-[46px] w-full h-[calc(100%_+_46px)] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="mt-8 max-[440px]:mt-4 text-center">
              <a href="#contact" className={`${btnPrimary} max-[440px]:py-3 max-[440px]:text-[0.95rem]`}>
                Get in touch.
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        {/* At <=440px, like the sections above: exactly one screen tall, top padding
            clears the header pill, and the review textarea stretches to fill the
            leftover height so the submit button ends at the bottom. */}
        <section id="testimonials" className="py-14 max-[440px]:pt-12 max-[440px]:pb-4 max-[440px]:min-h-[100svh] max-[440px]:flex bg-cream-alt">
          <div className="mx-auto max-w-site px-6 max-[440px]:w-full max-[440px]:flex max-[440px]:flex-col">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Reviews
            </p>
            <h2 className="text-center">Share Your Experience</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 max-[440px]:mt-2 max-[440px]:text-[0.95rem] max-[440px]:leading-snug text-center max-[440px]:text-left">
              Reviews are on their way. If you&apos;ve worked with me before, I&apos;d love to hear how it went.
            </p>

            <ReviewForm />
          </div>
        </section>

        {/* CONTACT */}
        {/* At <=440px, like the sections above: exactly one screen tall, top padding
            clears the header pill, Name/Email sit side by side, and the two textareas
            share the leftover height so the send button ends at the bottom. */}
        <section id="contact" className="py-16 pb-24 max-[440px]:pt-12 max-[440px]:pb-6 max-[440px]:min-h-[100svh] max-[440px]:flex bg-white">
          <div className="mx-auto max-w-site px-6 max-[440px]:w-full max-[440px]:flex max-[440px]:flex-col">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              Get In Touch
            </p>
            <h2 className="text-center">Check Availability</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 max-[440px]:mt-2 max-[440px]:text-[0.95rem] max-[440px]:leading-snug text-center">
              Tell me about your dog and the dates you need, and I&apos;ll follow up to set up a meet &amp;
              greet. <strong className="font-semibold text-charcoal">Now booking for November and beyond.</strong>
            </p>

            <div className="mt-10 max-[440px]:mt-4 max-w-[640px] mx-auto max-[440px]:w-full max-[440px]:flex-1 max-[440px]:min-h-0 max-[440px]:flex">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
