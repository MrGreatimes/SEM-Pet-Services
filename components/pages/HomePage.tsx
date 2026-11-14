import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferCard from "@/components/OfferCard";
import PhotoViewer from "@/components/PhotoViewer";
import PhotoStack from "@/components/PhotoStack";
import ReviewText from "@/components/ReviewText";
import ContactForm from "@/components/ContactForm";
import StrolMacron from "@/components/StrolMacron";
import LazyMap from "@/components/LazyMap";
import LangRoot from "@/components/LangRoot";
import { btnPrimary } from "@/lib/styles";
import { bookingUrl } from "@/lib/booking";
import { neighborhoods } from "@/lib/neighborhoods";
import { localePath, siteUrl, type Lang } from "@/lib/i18n";
import { socialLinks } from "@/lib/social";

// The homepage, in English (app/page.tsx, "/") and Spanish (app/es/page.tsx, "/es").
// All visible text is in `copy` below, English and Spanish side by side; the layout is
// shared, so a change to the layout applies to both languages.

// Opens the review box on the Strol Google Business Profile.
const googleReviewUrl = "https://g.page/r/CffSIU9PzpUFEBM/review";

const copy = {
  en: {
    heroTitle: (
      <>
        Trusted Overnight
        <br />
        Care and Secure Walking
      </>
    ),
    heroText: "Independent overnight pet sitting and dog walking professional in Seattle.",
    whyLabel: "Why",
    whyTitle: "The Little Things That Matter",
    whyCards: [
      {
        emoji: "⭐",
        title: "Trusted & Reputable",
        text: "Licensed, bonded and insured, Red Cross pet first aid certified (including pet CPR), and background checked. Your home and your pet are protected.",
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
    ],
    servicesLabel: "What I Offer",
    servicesTitle: "Dog Walking, Pet Sitting & Park Trips",
    walk: (min: number) => `${min}-Minute Walk`,
    perWalk: (price: number) => `$${price} per walk`,
    walkAlts: ["German shepherd resting its head on a lap", "Dog on a walk", "Golden retriever on a leash beside blue hydrangeas", "Dog on a walk"],
    park: {
      alt: "Dog lying in the dirt at an off-leash park",
      title: "Off-Leash Dog Park Trip",
      price: "$70 per trip",
      items: ["+$20 per extra dog"],
      note: "Two hours at a nearby off-leash park.",
    },
    cat: {
      alt: "Tabby cat stretched out on a pink blanket",
      title: "Cat Sitting",
      price: "$27–$42 per visit",
      items: ["30 to 60-minute visits, plus overnight house sitting."],
    },
    overnight: {
      alt: "Dog resting comfortably outdoors",
      title: "Overnight Stay",
      price: "From $70 per night",
      items: ["Feedings, potty trips and overnight house presence included", "Add walks from +$15/day"],
    },
    offerTitle: (
      <>
        New to <StrolMacron />? $10 off your first booking.
      </>
    ),
    offerText:
      "Good for a walk, cat visit, overnight stay or park trip, and it starts with a complimentary meet & greet. One per household.",
    referralLead: "Already a client?",
    referralText: "Refer a friend and you get $25 off your next booking once their first one is done.",
    seeRates: "See all rates & policies",
    missionLabel: "My Mission",
    missionTitle: "Every Dog Deserves to Feel Loved",
    missionIntro:
      "Caring for dogs of every age and temperament has taught me that trust is earned one visit at a time, not promised in a listing.",
    photosLabel: "Photos of Sean with pets",
    photoAlts: [
      "The owner of Strol with a dog",
      "The owner of Strol holding a small black dog on the waterfront",
      "The owner of Strol with a cat on his shoulder",
      "The owner of Strol holding a white dog in a bow tie collar",
      "The owner of Strol getting a kiss from a dog",
      "The owner of Strol with a dog resting on the couch behind him",
      "The owner of Strol laughing as a dog paws at his face",
      "The owner of Strol petting a German shepherd lying on her bed by a window",
    ],
    bio: [
      "Hi, I'm Sean. Born and raised in Seattle, I cared for the pets of friends, family, and neighbors long before I started doing it professionally. I have hands-on experience across dogs, cats, birds, rabbits, and more, from high-energy puppies to senior dogs who need a slower pace. I speak both English and Spanish, so you can book and get updates in whichever you prefer.",
      "I don't have pets of my own right now, so I get my fix by taking care of yours. (I once earned the trust of five cats, slowly, over several months, in a single client's home.) My approach is structured and calm, friendly but focused, so every walk and stay is organized and predictable for your pet.",
    ],
    areaLabel: "Where I Work",
    areaTitle: "Service Area",
    areaText:
      "I'm based in Ballard and sit throughout North Seattle: hill to hill, shore to shore. Crown Hill down to Queen Anne, Puget Sound across to Lake Washington.",
    outsideTitle: "Outside that range?",
    outsideText: "Reach out anyway. I take bookings across greater Seattle and figure it out case by case.",
    mapTitle: "Map of the Strol Pet Services area in North Seattle",
    getInTouch: "Get in touch.",
    reviewsLabel: "Reviews",
    reviewsTitle: "What Clients Say",
    reviewsNote: null as string | null,
    reviewFor: (service: string, pet: string) => `${service} for ${pet}`,
    overnightStay: "Overnight Stay",
    leaveReview: "Leave a Review on Google",
    contactLabel: "Get In Touch",
    contactTitle: "Check Availability",
    contactText: "Pick a time to meet and I'll confirm it.",
    bookMeet: "Book a Meet & Greet",
    newTab: " (opens in a new tab)",
    meetDetails: "Free · 30 minutes · Location of your choice",
    bookingNote: null as string | null,
    or: "or",
    sendNote: "Questions or requests? Send me a note.",
    ldDescription:
      "Independent, in-home overnight pet sitting and dog walking in Seattle, with daily photo and text updates.",
    ldServices: ["Overnight in-home pet sitting", "Dog walking", "Cat sitting", "Off-leash dog park trips"],
  },
  es: {
    heroTitle: (
      <>
        Cuidado nocturno confiable
        <br />
        y paseos seguros
      </>
    ),
    heroText: "Profesional independiente en cuidado nocturno de mascotas y paseo de perros en Seattle.",
    whyLabel: "Por qué",
    whyTitle: "Los pequeños detalles que importan",
    whyCards: [
      {
        emoji: "⭐",
        title: "De confianza y con buena reputación",
        text: "Con licencia, afianzado y asegurado, certificado por la Cruz Roja en primeros auxilios para mascotas (incluida la RCP para mascotas) y con antecedentes verificados. Su hogar y su mascota están protegidos.",
      },
      {
        emoji: "🌿",
        title: "Personalidad sencilla y cercana",
        text: "Una presencia tranquila y acogedora que hace sentir cómodas a las mascotas, junto con una guía firme y estructurada tanto para los perros como para sus dueños.",
      },
      {
        emoji: "🧠",
        title: "Formación en manejo de conducta",
        text: "Formación profesional para leer a las mascotas y a las personas, así detecto el estrés a tiempo y mantengo cada visita tranquila y estructurada.",
      },
      {
        emoji: "🤝",
        title: "Sin comisiones de plataforma",
        text: "Reserve directamente conmigo. Ninguna agencia ni aplicación se queda con una parte, solo tarifas claras confirmadas por escrito.",
      },
    ],
    servicesLabel: "Lo que ofrezco",
    servicesTitle: "Paseos, cuidado de mascotas y visitas al parque",
    walk: (min: number) => `Paseo de ${min} minutos`,
    perWalk: (price: number) => `$${price} por paseo`,
    walkAlts: [
      "Pastor alemán con la cabeza apoyada en un regazo",
      "Perro de paseo",
      "Golden retriever con correa junto a unas hortensias azules",
      "Perro de paseo",
    ],
    park: {
      alt: "Perro acostado en la tierra en un parque para perros sin correa",
      title: "Visita al parque para perros",
      price: "$70 por visita",
      items: ["+$20 por cada perro adicional"],
      note: "Dos horas en un parque cercano donde pueden andar sin correa.",
    },
    cat: {
      alt: "Gato atigrado estirado sobre una cobija rosa",
      title: "Cuidado de gatos",
      price: "$27–$42 por visita",
      items: ["Visitas de 30 a 60 minutos, y también cuidado nocturno en casa."],
    },
    overnight: {
      alt: "Perro descansando cómodamente al aire libre",
      title: "Estadía nocturna",
      price: "Desde $70 por noche",
      items: [
        "Incluye comidas, salidas para hacer sus necesidades y compañía en casa durante la noche",
        "Agregue paseos desde +$15/día",
      ],
    },
    offerTitle: (
      <>
        ¿Quiere probar <StrolMacron />? $10 de descuento en su primera reserva.
      </>
    ),
    offerText:
      "Válido para un paseo, una visita a su gato, una estadía nocturna o una visita al parque, y empieza con una cita para conocernos sin costo. Uno por hogar.",
    referralLead: "¿Ya es cliente?",
    referralText:
      "Recomiende a alguien y recibirá $25 de descuento en su próxima reserva cuando esa persona termine su primera reserva.",
    seeRates: "Ver todas las tarifas y políticas",
    missionLabel: "Mi misión",
    missionTitle: "Todo perro merece sentirse querido",
    missionIntro:
      "Cuidar perros de todas las edades y temperamentos me ha enseñado que la confianza se gana visita a visita, no se promete en un anuncio.",
    photosLabel: "Fotos de Sean con mascotas",
    photoAlts: [
      "El dueño de Strol con un perro",
      "El dueño de Strol cargando un perrito negro junto al agua",
      "El dueño de Strol con un gato en el hombro",
      "El dueño de Strol cargando un perro blanco con collar de moño",
      "El dueño de Strol recibiendo un beso de un perro",
      "El dueño de Strol con un perro descansando en el sillón detrás de él",
      "El dueño de Strol riéndose mientras un perro le toca la cara con la pata",
      "El dueño de Strol acariciando a una pastora alemana acostada en su cama junto a una ventana",
    ],
    bio: [
      "Hola, soy Sean. Nací y crecí en Seattle, y cuidaba las mascotas de amigos, familiares y vecinos mucho antes de dedicarme a esto profesionalmente. Tengo experiencia práctica con perros, gatos, aves, conejos y más, desde cachorros llenos de energía hasta perros mayores que necesitan un ritmo más tranquilo. Hablo inglés y español, así que puede reservar y recibir actualizaciones en el idioma que prefiera.",
      "Ahora mismo no tengo mascotas propias, así que me doy el gusto cuidando las suyas. (Una vez me gané la confianza de cinco gatos, poco a poco, durante varios meses, en la casa de un mismo cliente.) Mi forma de trabajar es estructurada y tranquila, amable pero enfocada, para que cada paseo y cada estadía sean organizados y predecibles para su mascota.",
    ],
    areaLabel: "Dónde trabajo",
    areaTitle: "Zona de servicio",
    areaText:
      "Vivo en Ballard y trabajo en todo el norte de Seattle, de colina a colina y de orilla a orilla: desde Crown Hill hasta Queen Anne, y desde Puget Sound hasta el lago Washington.",
    outsideTitle: "¿Vive fuera de esa zona?",
    outsideText: "Escríbame de todos modos. Acepto reservas en toda el área de Seattle y lo vemos caso por caso.",
    mapTitle: "Mapa de la zona de servicio de Strol Pet Services en el norte de Seattle",
    getInTouch: "Contácteme.",
    reviewsLabel: "Reseñas",
    reviewsTitle: "Lo que dicen los clientes",
    reviewsNote: "Las reseñas aparecen en inglés, tal como las escribieron los clientes." as string | null,
    reviewFor: (service: string, pet: string) => `${service} para ${pet}`,
    overnightStay: "Estadía nocturna",
    leaveReview: "Deje una reseña en Google",
    contactLabel: "Hablemos",
    contactTitle: "Consultar disponibilidad",
    contactText: "Elija un horario para conocernos y se lo confirmaré.",
    bookMeet: "Agendar cita para conocernos",
    newTab: " (se abre en una pestaña nueva)",
    meetDetails: "Gratis · 30 minutos · En el lugar que usted elija",
    // Square's booking page has no Spanish version of my service text; remove this line
    // if that changes.
    bookingNote: "La página de reservas está en inglés." as string | null,
    or: "o",
    sendNote: "¿Preguntas o solicitudes? Envíeme un mensaje.",
    ldDescription:
      "Cuidado nocturno de mascotas a domicilio y paseo de perros en Seattle, con fotos y mensajes diarios. Se habla español.",
    ldServices: ["Cuidado nocturno de mascotas a domicilio", "Paseo de perros", "Cuidado de gatos", "Visitas al parque para perros sin correa"],
  },
};

// Client reviews, quoted with permission, laid out like Rover reviews: pet photo, first
// name and last initial, service, date, then the text. No star ratings (owner's choice;
// the review form doesn't collect them). "date" is when the review was sent and is left
// out of the card until known. imgClassName crops and zooms each photo so the dog's face
// fills the small circle. The text stays in English on the Spanish page too (owner's
// choice 2026-11-13: they're the clients' own words); only the line above it is translated.
// `service` names a line in `copy` ("overnightStay"), so it shows in the page's language.
type Review = {
  service: "overnightStay";
  name: string;
  date?: { en: string; es: string };
  pet: string;
  photo: string;
  imgClassName: string;
  text: string;
};

const reviews: Review[] = [
  {
    name: "Sona S.",
    service: "overnightStay",
    date: { en: "Sep 8, 2026", es: "8 sep 2026" },
    pet: "Ollie",
    photo: "/images/Ollie 3.jpeg",
    imgClassName: "object-[50%_81%] origin-[29%_50%] scale-[1.8]",
    text: "It takes a lot of faith to trust your entire home and your beloved dog to someone for weeks. Sean wholly earns that trust. We are so thankful for his amazing care of our dog Ollie and our home. He left our home in better condition than we left it, even offering to fix our hopeless robot vacuum and mow our lawn. He also took amazing care of Ollie. He provided multiple video and picture updates every day, so we always knew what Ollie was up to. It made leaving our family member behind a lot easier. We knew Ollie was having as much fun (if not more) while we were gone as Sean took him to all his favorite spots. We could tell Ollie was totally comfortable with him, because he quickly exposed Sean to all his weird Golden Retriever quirks and Husky stubbornness. We plan to use Sean many more times in the future. He's our first contact for watching Ollie and our home and fully recommend him taking care of your most valued things.",
  },
  {
    name: "Oliver T.",
    service: "overnightStay",
    date: { en: "Nov 12, 2026", es: "12 nov 2026" },
    pet: "Kaasie & Manu",
    photo: "/images/Kaasie 2.jpeg",
    imgClassName: "object-top origin-[87%_38%] scale-[1.4]",
    // Updated review (Nov 12, 2026), quoted as written. Blank lines are paragraph breaks.
    text: "We absolutely love having Sean look after Kaasie (Belgian malinoise/german shep adult female) and Manu (maine coon adult male)! He is just wonderful with them. He has such a natural connection with cats and really takes the time to get to know their personalities and little quirks. It means so much to know they’re not just being looked after, but genuinely loved and cared for while we’re away.\n\nHe’s also incredible when it comes to looking after our home. He’s thoughtful, respectful, and notices all the little things. Honestly, we often come home to find everything in even better shape than when we left! He goes above and beyond, and it’s clear how much pride he takes in making sure everything is taken care of.\n\nIt’s hard to put a price on the peace of mind that comes from knowing your pets and home are in such good hands. We never have to worry when Sean is looking after things. He’s someone we trust completely, and we feel incredibly lucky to have found him. I would recommend him in a heartbeat to anyone looking for someone truly special to care for their pets and home.",
  },
];

// Structured data for Google. Both languages describe the same business (same @id),
// each in its own language.
function jsonLd(lang: Lang) {
  const t = copy[lang];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Strol Pet Services",
    description: t.ldDescription,
    url: `${siteUrl}${lang === "es" ? "/es" : ""}`,
    image: encodeURI(`${siteUrl}/images/Owner and Chloe 1 edit.jpeg`),
    logo: encodeURI(`${siteUrl}/images/Strol logo v2 primary.png`),
    priceRange: "$$",
    knowsLanguage: ["en", "es"],
    sameAs: socialLinks.filter((s) => s.sameAs).map((s) => s.url),
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
    knowsAbout: t.ldServices,
    makesOffer: t.ldServices.map((service) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: service },
    })),
  };
}

const myMissionPhotos = [
  { image: "/images/Owner and Chloe 1 edit.jpeg" },
  { image: "/images/Owner and Oscar.jpg", imgClassName: "object-[50%_70%]" },
  { image: "/images/Owner and cat 1.jpg", imgClassName: "object-[50%_58%]" },
  { image: "/images/Owner and Max.jpg", imgClassName: "object-[50%_45%]" },
  { image: "/images/Owner and Chloe 4.jpeg", imgClassName: "object-[50%_38%]" },
  { image: "/images/Owner and Buddy.jpg", imgClassName: "object-[50%_45%]" },
  { image: "/images/Owner and Nemo.jpg", imgClassName: "object-[50%_45%]" },
  { image: "/images/Owner and Kaasie.jpeg", imgClassName: "object-[50%_60%]" },
];

export default function HomePage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const rates = localePath(lang, "/rates");
  return (
    <LangRoot lang={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang)) }}
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
              <h1 className="text-white text-[2.6rem] max-[560px]:text-[2rem] mb-5">{t.heroTitle}</h1>
              <p className="text-white/85 text-[1.05rem] max-w-[460px] mb-8">{t.heroText}</p>
              <div className="flex gap-4 flex-wrap">
                {/* Hero button opens the Square meet & greet booking page (owner's choice
                    2026-11-13; was "Check Availability", a jump to #contact). */}
                <a href={bookingUrl} target="_blank" rel="noopener" className={btnPrimary}>
                  {t.bookMeet}
                  <span className="sr-only">{t.newTab}</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* WHY STROL */}
        {/* On phones (<=560px) the cards become compact rows (emoji left, text right).
            At <=440px the section fills the screen height and the four cards stretch
            equally to fill the space below the heading. */}
        <section className="py-12 max-[560px]:py-10 bg-surface max-[440px]:min-h-[100svh] max-[440px]:pt-12 max-[440px]:pb-2 max-[440px]:flex">
          <div className="mx-auto max-w-site px-6 max-[440px]:w-full max-[440px]:flex max-[440px]:flex-col">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              {t.whyLabel} <StrolMacron caps />
            </p>
            <h2 className="text-center">{t.whyTitle}</h2>
            <div className="grid grid-cols-4 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1 gap-6 max-[560px]:gap-3 mt-8 max-[560px]:mt-6 max-[440px]:flex-1 max-[440px]:min-h-0 max-[440px]:auto-rows-fr max-[440px]:gap-1.5 max-[440px]:mt-3">
              {t.whyCards.map(({ emoji, title, text }) => (
                <div
                  key={title}
                  className="bg-card rounded-site p-7 px-5 text-center shadow-site max-[560px]:flex max-[560px]:items-start max-[440px]:items-center max-[560px]:gap-4 max-[560px]:p-4 max-[440px]:py-2.5 max-[440px]:gap-3 max-[560px]:text-left"
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
        <section id="services" className="py-16 max-[440px]:pt-10 max-[440px]:pb-12 bg-surface">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              {t.servicesLabel}
            </p>
            <h2 className="text-center">{t.servicesTitle}</h2>

            <div className="grid grid-cols-4 max-[860px]:grid-cols-1 gap-6 max-[860px]:gap-2.5 max-w-site max-[860px]:max-w-[560px] mx-auto mt-8 max-[560px]:mt-6 max-[440px]:mt-4">
              <OfferCard
                image="/images/Kaasie 1.jpeg"
                alt={t.walkAlts[0]}
                title={t.walk(20)}
                href={`${rates}#walking`}
                price={t.perWalk(25)}
              />
              <OfferCard
                image="/images/Fleia.jpeg"
                alt={t.walkAlts[1]}
                title={t.walk(30)}
                href={`${rates}#walking`}
                price={t.perWalk(32)}
              />
              <OfferCard
                image="/images/Honeybee 2.jpeg"
                alt={t.walkAlts[2]}
                title={t.walk(45)}
                href={`${rates}#walking`}
                price={t.perWalk(38)}
                imgClassName="object-[center_40%]"
              />
              <OfferCard
                image="/images/Bunnie 1.jpeg"
                alt={t.walkAlts[3]}
                title={t.walk(60)}
                href={`${rates}#walking`}
                price={t.perWalk(48)}
                imgClassName="object-[center_80%]"
              />
            </div>

            <div className="grid grid-cols-3 max-[860px]:grid-cols-1 gap-6 max-[860px]:gap-2.5 max-w-[900px] max-[860px]:max-w-[560px] mx-auto mt-6 max-[860px]:mt-2.5">
              <OfferCard
                image="/images/Ollie 2.jpeg"
                fullImage="/images/Ollie 2 full.jpeg"
                alt={t.park.alt}
                title={t.park.title}
                href={`${rates}#dog-park`}
                price={t.park.price}
                items={t.park.items}
                note={t.park.note}
              />
              <OfferCard
                image="/images/Manu 2.jpeg"
                alt={t.cat.alt}
                title={t.cat.title}
                href={`${rates}#cat-sitting`}
                price={t.cat.price}
                items={t.cat.items}
              />
              <OfferCard
                image="/images/Biker 1.jpeg"
                alt={t.overnight.alt}
                title={t.overnight.title}
                href={`${rates}#overnight`}
                price={t.overnight.price}
                items={t.overnight.items}
              />
            </div>

            {/* First-time client offer (gold callout, same pattern as "Outside that range?") */}
            <div className="max-w-[900px] max-[860px]:max-w-[560px] mx-auto rounded-site p-6 px-7 max-[440px]:p-4 mt-8 max-[860px]:mt-6 bg-gold-light border-l-4 border-gold-dark">
              <h3 className="text-[1.1rem] max-[440px]:text-base mb-2 max-[440px]:mb-1 text-gold-ink">{t.offerTitle}</h3>
              <p className="text-charcoal-soft text-[0.95rem] max-[440px]:text-[0.875rem] max-[440px]:leading-snug">
                {t.offerText}
              </p>
              <p className="text-charcoal-soft text-[0.95rem] max-[440px]:text-[0.875rem] max-[440px]:leading-snug mt-2">
                <strong className="text-gold-ink">{t.referralLead}</strong> {t.referralText}
              </p>
            </div>

            <p className="text-center mt-8 max-[860px]:mt-6">
              <a href={rates} className="font-heading font-semibold text-primary-dark underline underline-offset-4 hover:text-primary">
                {t.seeRates} &rarr;
              </a>
            </p>
          </div>
        </section>

        {/* MY MISSION */}
        {/* At <=440px the photo floats right with the bio text wrapping around it, and
            the type/spacing tighten, and the yellow section fills the screen with its
            content fitted between the header pill (ends at 84px) and the screen bottom,
            anchored at the top (92px, same as Why Strol) so it stays put across widths. */}
        {/* overflow-x-clip: a photo dragged off the right edge of the screen must not widen the page (it made a horizontal scrollbar pop up). clip, not hidden, so nothing else changes. */}
        <section id="mission" className="overflow-x-clip py-16 bg-gold-light max-[440px]:min-h-[100svh] max-[440px]:pt-12 max-[440px]:pb-4 max-[440px]:flex">
          <div className="mx-auto max-w-site px-6 max-[440px]:w-full">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              {t.missionLabel}
            </p>
            <h2 className="text-center">{t.missionTitle}</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 max-[440px]:mt-2 max-[440px]:text-[0.95rem] max-[440px]:leading-snug text-center max-[440px]:text-left">
              {t.missionIntro}
            </p>

            <div className="grid grid-cols-[1.2fr_0.8fr] max-[860px]:grid-cols-1 gap-10 items-center max-w-[900px] mx-auto mt-10 max-[440px]:flow-root max-[440px]:mt-4">
              <div className="relative w-full aspect-[900/837] col-start-2 row-start-1 max-[860px]:col-start-1 max-[860px]:row-start-2 max-[440px]:float-right max-[440px]:w-[48%] max-[440px]:ml-3 max-[440px]:mb-1.5 max-[440px]:mt-1">
                {/* Photo stack (added 2026-11-12): a pile of prints, swipe for the next.
                    Tall photos are cropped to the card around the faces; tapping opens the
                    full photo. Order mixes indoor/outdoor and dogs/cats. Rounding and shadow
                    live on each card. */}
                <PhotoStack
                  label={t.photosLabel}
                  sizes="(max-width: 440px) 48vw, (max-width: 860px) 100vw, 360px"
                  photos={myMissionPhotos.map((p, i) => ({ ...p, alt: t.photoAlts[i] }))}
                />
              </div>
              <div className="flex flex-col gap-4 col-start-1 row-start-1 max-[440px]:block max-[440px]:text-[0.95rem] max-[440px]:leading-snug max-[440px]:[&>p+p]:mt-3">
                {t.bio.map((para) => (
                  <p key={para} className="text-charcoal-soft">
                    {para}
                  </p>
                ))}
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
        <section id="area" className="py-14 max-[440px]:pt-12 max-[440px]:pb-6 max-[440px]:min-h-[100svh] max-[440px]:flex bg-surface">
          <div className="mx-auto max-w-[720px] px-6 max-[440px]:w-full max-[440px]:flex max-[440px]:flex-col">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              {t.areaLabel}
            </p>
            <h2 className="text-center">{t.areaTitle}</h2>
            <p className="text-charcoal-soft mt-3 max-[440px]:mt-2 text-center max-[440px]:text-left max-[440px]:text-[0.95rem] max-[440px]:leading-snug">
              {t.areaText}
            </p>

            <div className="rounded-site p-6 px-7 max-[440px]:p-4 mt-6 max-[440px]:mt-4 bg-gold-light border-l-4 border-gold-dark">
              <h3 className="text-[1.1rem] max-[440px]:text-base mb-2 max-[440px]:mb-1 text-gold-ink">{t.outsideTitle}</h3>
              <p className="text-charcoal-soft text-[0.95rem] max-[440px]:text-[0.875rem] max-[440px]:leading-snug">
                {t.outsideText}
              </p>
            </div>

            <div className="relative mt-6 max-[440px]:mt-4 aspect-video max-[560px]:aspect-[4/3] max-[440px]:aspect-auto max-[440px]:flex-1 max-[440px]:min-h-[160px] rounded-site overflow-hidden shadow-site bg-cream-alt">
              {/* Google My Maps embed with the custom service-area boundary (Crown Hill to
                  Queen Anne, Puget Sound to Lake Washington). Its framing comes from the
                  map's saved default view in My Maps. My Maps always shows a 46px title bar;
                  the iframe is shifted up and made 46px taller so the frame (overflow-hidden)
                  crops it off, leaving Google's attribution at the bottom visible. */}
              <LazyMap
                title={t.mapTitle}
                src="https://www.google.com/maps/d/embed?mid=1SVwcGDoesTB7NbzgF1NtwevxwBSE4s4&ehbc=2E312F&noprof=1"
                className="absolute left-0 -top-[46px] w-full h-[calc(100%_+_46px)] border-0"
              />
            </div>

            <div className="mt-8 max-[440px]:mt-4 text-center">
              <a href="#contact" className={`${btnPrimary} max-[440px]:py-3 max-[440px]:text-[0.95rem]`}>
                {t.getInTouch}
              </a>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        {/* Cards sit side by side on desktop and stack at <=860px. */}
        <section id="reviews" className="py-14 max-[440px]:pt-12 bg-cream-alt">
          <div className="mx-auto max-w-site px-6">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              {t.reviewsLabel}
            </p>
            <h2 className="text-center">{t.reviewsTitle}</h2>
            {t.reviewsNote && <p data-lang-only className="text-charcoal-soft text-[0.9rem] text-center mt-2">{t.reviewsNote}</p>}
            <div className="grid grid-cols-2 max-[860px]:grid-cols-1 items-start gap-6 max-[560px]:gap-4 mt-8 max-[560px]:mt-6">
              {reviews.map(({ name, service, date, pet, photo, imgClassName, text }) => (
                <figure key={name} className="bg-card rounded-site p-7 max-[560px]:p-5 shadow-site">
                  {/* Header row: reviewer, then "service for pet" and the date on the
                      left; the pet's photo in the top right corner (owner's choice). */}
                  <figcaption className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="font-heading font-semibold text-[1.05rem] text-charcoal">{name}</p>
                      <p className="text-charcoal-soft text-[0.85rem]">
                        {t.reviewFor(t[service], pet)}
                        {date && <> &middot; {date[lang]}</>}
                      </p>
                    </div>
                    {/* Tapping the photo opens it full screen, like the offer card photos.
                        sizes is double the circle so the zoomed-in crop stays sharp. */}
                    <div className="relative w-14 h-14 shrink-0 rounded-full overflow-hidden bg-cream-alt">
                      <PhotoViewer image={photo} alt={pet} imgClassName={imgClassName} sizes="112px" />
                    </div>
                  </figcaption>
                  {/* The quote itself is in English on both sites. */}
                  <blockquote lang="en" className="text-charcoal-soft text-[0.95rem] max-[560px]:text-[0.9rem] leading-relaxed">
                    <ReviewText text={text} />
                  </blockquote>
                </figure>
              ))}
            </div>

            {/* The only form on the homepage is Check Availability. Reviews go to Google
                (helps the Business Profile reach). The site's own form on /review is no
                longer linked here (owner's choice 2026-11-12); Sean texts that link only to
                clients who won't use Google. */}
            <div className="mt-10 max-[560px]:mt-8 text-center">
              <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                {t.leaveReview}
              </a>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        {/* At <=440px, like the sections above: exactly one screen tall, top padding
            clears the header pill, Name/Email sit side by side, and the two textareas
            share the leftover height so the send button ends at the bottom. */}
        <section id="contact" className="py-16 pb-24 max-[440px]:pt-12 max-[440px]:pb-6 max-[440px]:min-h-[100svh] max-[440px]:flex bg-surface">
          <div className="mx-auto max-w-site px-6 max-[440px]:w-full max-[440px]:flex max-[440px]:flex-col">
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              {t.contactLabel}
            </p>
            <h2 className="text-center">{t.contactTitle}</h2>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 max-[440px]:mt-2 max-[440px]:text-[0.95rem] max-[440px]:leading-snug text-center">
              {t.contactText}
            </p>

            {/* Online booking (Square Appointments, opens in a new tab). Requests stay pending
                until Sean accepts them; the form below is the fallback for everything else. */}
            <div className="mt-6 max-[440px]:mt-3 text-center">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener"
                className={`${btnPrimary} max-[440px]:w-full max-[440px]:py-3`}
              >
                {t.bookMeet}
                <span className="sr-only">{t.newTab}</span>
              </a>
              <p className="text-charcoal-soft text-[0.85rem] mt-2">{t.meetDetails}</p>
              {t.bookingNote && <p data-lang-only className="text-charcoal-soft text-[0.8rem] mt-0.5">{t.bookingNote}</p>}
            </div>

            <div className="flex items-center gap-4 max-w-[640px] mx-auto w-full mt-8 max-[440px]:mt-4" aria-hidden="true">
              <span className="h-px flex-1 bg-charcoal-soft/25" />
              <span className="font-heading font-semibold text-charcoal-soft text-[0.85rem] uppercase tracking-[0.08em]">{t.or}</span>
              <span className="h-px flex-1 bg-charcoal-soft/25" />
            </div>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-4 max-[440px]:mt-2max-[440px]:text-[0.9rem] max-[440px]:leading-snug text-center">
              {t.sendNote}
            </p>

            <div className="mt-6 max-[440px]:mt-3 max-w-[640px] mx-auto max-[440px]:w-full max-[440px]:flex-1 max-[440px]:min-h-0 max-[440px]:flex">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </LangRoot>
  );
}
