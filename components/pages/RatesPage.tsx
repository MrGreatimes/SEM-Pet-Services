import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LangRoot from "@/components/LangRoot";
import { btnPrimary } from "@/lib/styles";
import { bookingUrl } from "@/lib/booking";
import { localePath, type Lang } from "@/lib/i18n";
import StrolMacron from "@/components/StrolMacron";

// Rates & Policies, in English (/rates) and Spanish (/es/rates).
// Page order: hero, what's always included, rates (walking and overnight side by side
// on desktop, stacked at <=860px), cat sitting and dog park (same two-column layout),
// booking checklist, all policies in one block, CTA.
// The header's on-page tab bar (Walking | Overnight | Cat Sitting | Dog Park | Policies) links to the ids below;
// `anchor` offsets jumps so headings land below the fixed header + tab bar. The ids stay
// in English on both pages, so the language switch keeps your place.
//
// All text is in `copy`, English and Spanish side by side. Rates, fees and terms are the
// owner's real business terms: change a number in BOTH languages.

type Row = [string, React.ReactNode];

const holidaysEn = "Thanksgiving, Dec 24–Jan 1, July 4th";
const holidaysEs = "Día de Acción de Gracias, 24 dic–1 ene, 4 de julio";

const copy = {
  en: {
    subnav: ["Walking", "Overnight", "Cat Sitting", "Dog Park", "Policies"],
    label: "Rates & Policies",
    title: "Pricing You Can Plan Around",
    intro: "Independent, direct-booking rates. Everything below is confirmed in writing before your stay or walk begins.",
    includedTitle: "What's Always Included",
    included: [
      "Complimentary meet & greet before a first booking",
      "Basic medication administration and routine special needs",
      "Daily photo/text updates",
    ],
    newClientsLead: "New clients:",
    newClients: "$10 off your first booking (walk, cat visit, overnight stay or park trip). One per household.",
    referLead: "Refer a friend:",
    refer: "when someone you refer finishes their first booking, you get $25 off your next one. No limit on referrals.",
    itemFee: ["Item", "Fee"],
    addOns: "Add-Ons",
    holidayNote: "Holiday rates replace weekend rates.",
    walking: {
      divider: "Dog Walking",
      ratesTitle: "Walk Rates",
      head: ["Length", "Rate"],
      rows: [["20 minutes", "$25"], ["30 minutes", "$32"], ["45 minutes", "$38"], ["60 minutes", "$48"]] as Row[],
      longer: "Longer walks are available on request.",
      addOns: [
        ["Additional dog, same household", "+$7/walk"],
        ["Weekend walks", "+$5/walk"],
        [`Holiday walks (${holidaysEn})`, "+$10/walk"],
      ] as Row[],
      bookingTitle: "Booking",
      booking: [
        "Weekday walks can be requested the same morning, by 8am",
        "Weekend walks require 48 hours notice",
        "Walks are scheduled within a 2-hour arrival window, not an exact time",
      ],
    },
    overnight: {
      divider: "Overnight Pet Sitting",
      baseTitle: "Base Rate",
      head: ["Service", "Rate"],
      rows: [["Overnight stay (base)", "$70/night"]] as Row[],
      covers:
        "Covers care for one dog: arrival and departure, two feedings, four to five potty trips, pad maintenance, overnight house presence, plenty of play and attention, and daily photo and text updates.",
      addOns: [
        ["20-minute walk", "+$15/day"],
        ["30-minute walk", "+$19/day"],
        ["45-minute walk", "+$24/day"],
        ["60-minute walk", "+$30/day"],
        ["No yard access (street-only potty trips)", "+$10/night"],
        ["Each additional pet (dog or cat), base care", "+$7/night"],
        ["Each additional dog, per walk", "+$7/walk"],
        [
          <>
            Complex behavioral/
            <wbr />
            reactive dog handling
          </>,
          "+$10–15/night",
        ],
        [`Holiday surcharge (${holidaysEn})`, "+30%"],
        ["Last-minute booking (inside 72 hours of start date)", "+$20 flat"],
      ] as [React.ReactNode, string][],
      buildsTitle: "Common Builds",
      buildsHead: ["Profile", "Nightly"],
      builds: [
        ["Yard access, no walks", "$70"],
        ["One 20-minute walk, yard", "$85"],
        ["Two 20-minute walks, apartment", "$110"],
        ["Three 20-minute walks", "$115"],
        ["Three 60-minute walks", "$160"],
      ] as Row[],
    },
    cat: {
      divider: "Cat Sitting",
      ratesTitle: "Visit Rates",
      head: ["Visit", "Rate"],
      rows: [["30-minute visit", "$27"], ["45-minute visit", "$35"], ["60-minute visit", "$42"], ["Overnight house sitting", "$75"]] as Row[],
      addOns: [
        ["Weekend and evening visits (after 4pm)", "+$5/visit"],
        [`Holiday visits (${holidaysEn})`, "+$10/visit"],
        ["Holiday overnight house sitting", "+30%"],
      ] as Row[],
    },
    park: {
      divider: "Off-Leash Dog Park",
      title: "Park Trips",
      note: "Two hours at a nearby off-leash park.",
      head: ["Trip", "Rate"],
      rows: [["Off-leash dog park trip", "$70 per trip"]] as Row[],
      addOns: [
        ["Each extra dog", "+$20"],
        [`Holiday trips (${holidaysEn})`, "+$10/trip"],
      ] as Row[],
    },
    firstTitle: "Before Your First Booking",
    firstIntro: "Get these before your first walk or stay:",
    firstItems: [
      "Emergency contact info",
      "Vet name, clinic, and phone number",
      "Current vaccination records (rabies required; Bordetella for dog park trips)",
      "Feeding schedule, medication instructions (dosage/timing), and any behavioral notes",
      "House access details (keys, alarm codes, wifi)",
      "Cancellation terms acknowledged by the client",
    ],
    insurance: (
      <>
        <StrolMacron /> carries general liability insurance and a dishonesty bond. Ask if you&apos;d like a copy of the
        certificate of insurance. I&apos;m Red Cross certified in pet first aid, including pet CPR, and background checked
        through the Washington State Patrol.
      </>
    ),
    policies: "Policies",
    youCancel: "If You Cancel",
    overnightTerms: "Overnight stays (including cat overnight house sitting)",
    termsHead: ["Timing", "Terms"],
    terms: [
      ["More than 48 hours before start", "Deposit refunded"],
      ["24 to 48 hours before start", "Deposit non-refundable"],
      ["Inside 24 hours", "50% of the total stay due (deposit included)"],
    ] as Row[],
    termsWhy: "Other bookings are turned away to hold your dates, which is why these terms apply regardless of cancellation reason.",
    shortTitle: "Dog walks, cat visits and park trips",
    shortTerms:
      "24 hours notice to cancel or reschedule without charge; cancellations inside 24 hours are charged the full rate",
    iCancel: "If I Cancel",
    iCancelText:
      "If I ever need to cancel or reschedule, I'll reach out as early as possible. You're never charged for a cancellation on my end, any deposit is refunded in full, and you'll get priority for rebooking.",
    paymentTitle: "Deposit & Payment",
    paymentOvernight: "Overnight stays",
    payment: [
      <>
        <strong>Deposit:</strong> 25% of total, due to hold the dates
      </>,
      "Deposit becomes non-refundable if canceled within 48 hours of the start",
      <>
        <strong>Balance due:</strong> day of arrival
      </>,
      "Total dollar amount confirmed in writing (text/email) before the stay begins",
    ],
    paymentShortTitle: "Walks, visits and park trips",
    paymentShort: "Paid after each service",
    methods: ["Venmo", "Zelle", "Cash"],
    emergencyTitle: "In an Emergency",
    emergency:
      "My approach is prevention-first: staying alert to hazards and avoiding unnecessary risk during every walk or stay. If a medical emergency does happen, I'll contact you immediately and arrange transport for your pet by pet taxi or with your help, to your designated vet, or to the nearest emergency vet if I can't reach you.",
    bookMeet: "Book a Meet & Greet",
    newTab: " (opens in a new tab)",
    already: "Already a client or have a question?",
    sendNote: "Send me a note",
  },
  es: {
    subnav: ["Paseos", "Nocturno", "Gatos", "Parque", "Políticas"],
    label: "Tarifas y políticas",
    title: "Precios con los que puede planificar",
    intro:
      "Tarifas independientes, reservando directamente conmigo. Todo lo que aparece abajo se confirma por escrito antes de que empiece su estadía o paseo.",
    includedTitle: "Siempre incluido",
    included: [
      "Cita para conocernos, sin costo, antes de la primera reserva",
      "Administración básica de medicamentos y necesidades especiales de rutina",
      "Fotos y mensajes diarios",
    ],
    newClientsLead: "Clientes nuevos:",
    newClients:
      "$10 de descuento en su primera reserva (paseo, visita a su gato, estadía nocturna o visita al parque). Uno por hogar.",
    referLead: "Recomiende a alguien:",
    refer:
      "cuando alguien que usted recomendó termine su primera reserva, usted recibe $25 de descuento en su próxima reserva. Sin límite de recomendaciones.",
    itemFee: ["Concepto", "Costo"],
    addOns: "Extras",
    holidayNote: "Las tarifas de días festivos reemplazan a las de fin de semana.",
    walking: {
      divider: "Paseo de perros",
      ratesTitle: "Tarifas de paseo",
      head: ["Duración", "Tarifa"],
      rows: [["20 minutos", "$25"], ["30 minutos", "$32"], ["45 minutos", "$38"], ["60 minutos", "$48"]] as Row[],
      longer: "Se pueden pedir paseos más largos.",
      addOns: [
        ["Perro adicional del mismo hogar", "+$7/paseo"],
        ["Paseos en fin de semana", "+$5/paseo"],
        [`Paseos en días festivos (${holidaysEs})`, "+$10/paseo"],
      ] as Row[],
      bookingTitle: "Reservas",
      booking: [
        "Los paseos entre semana se pueden pedir la misma mañana, antes de las 8am",
        "Los paseos de fin de semana requieren 48 horas de aviso",
        "Los paseos se programan dentro de un margen de llegada de 2 horas, no a una hora exacta",
      ],
    },
    overnight: {
      divider: "Cuidado nocturno de mascotas",
      baseTitle: "Tarifa base",
      head: ["Servicio", "Tarifa"],
      rows: [["Estadía nocturna (base)", "$70/noche"]] as Row[],
      covers:
        "Cubre el cuidado de un perro: llegada y salida, dos comidas, de cuatro a cinco salidas para hacer sus necesidades, cambio de tapetes, compañía en casa durante la noche, mucho juego y atención, y fotos y mensajes diarios.",
      addOns: [
        ["Paseo de 20 minutos", "+$15/día"],
        ["Paseo de 30 minutos", "+$19/día"],
        ["Paseo de 45 minutos", "+$24/día"],
        ["Paseo de 60 minutos", "+$30/día"],
        ["Sin acceso a patio (salidas solo a la calle)", "+$10/noche"],
        ["Cada mascota adicional (perro o gato), cuidado básico", "+$7/noche"],
        ["Cada perro adicional, por paseo", "+$7/paseo"],
        [
          <>
            Manejo de perros con conducta compleja/
            <wbr />
            reactiva
          </>,
          "+$10–15/noche",
        ],
        [`Recargo por días festivos (${holidaysEs})`, "+30%"],
        ["Reserva de último momento (menos de 72 horas antes del inicio)", "+$20 fijo"],
      ] as [React.ReactNode, string][],
      buildsTitle: "Combinaciones comunes",
      buildsHead: ["Perfil", "Por noche"],
      builds: [
        ["Con patio, sin paseos", "$70"],
        ["Un paseo de 20 minutos, con patio", "$85"],
        ["Dos paseos de 20 minutos, departamento", "$110"],
        ["Tres paseos de 20 minutos", "$115"],
        ["Tres paseos de 60 minutos", "$160"],
      ] as Row[],
    },
    cat: {
      divider: "Cuidado de gatos",
      ratesTitle: "Tarifas por visita",
      head: ["Visita", "Tarifa"],
      rows: [
        ["Visita de 30 minutos", "$27"],
        ["Visita de 45 minutos", "$35"],
        ["Visita de 60 minutos", "$42"],
        ["Cuidado nocturno en casa", "$75"],
      ] as Row[],
      addOns: [
        ["Visitas en fin de semana y por la tarde (después de las 4pm)", "+$5/visita"],
        [`Visitas en días festivos (${holidaysEs})`, "+$10/visita"],
        ["Cuidado nocturno en días festivos", "+30%"],
      ] as Row[],
    },
    park: {
      divider: "Parque para perros",
      title: "Visitas al parque",
      note: "Dos horas en un parque cercano donde los perros pueden andar sin correa.",
      head: ["Visita", "Tarifa"],
      rows: [["Visita al parque para perros sin correa", "$70 por visita"]] as Row[],
      addOns: [
        ["Cada perro adicional", "+$20"],
        [`Visitas en días festivos (${holidaysEs})`, "+$10/visita"],
      ] as Row[],
    },
    firstTitle: "Antes de su primera reserva",
    firstIntro: "Necesito lo siguiente antes de su primer paseo o estadía:",
    firstItems: [
      "Datos de un contacto de emergencia",
      "Nombre, clínica y teléfono del veterinario",
      "Cartilla de vacunación al día (rabia obligatoria; Bordetella para visitas al parque)",
      "Horario de comidas, instrucciones de medicamentos (dosis y horario) y cualquier nota sobre su conducta",
      "Detalles para entrar a la casa (llaves, códigos de alarma, wifi)",
      "Condiciones de cancelación aceptadas por el cliente",
    ],
    insurance: (
      <>
        <StrolMacron /> tiene seguro de responsabilidad civil general y una fianza de fidelidad. Si desea una
        copia del certificado de seguro, pídamela. Estoy certificado por la Cruz Roja en primeros auxilios para mascotas,
        incluida la RCP para mascotas, y mis antecedentes fueron verificados por la Patrulla Estatal de Washington
        (Washington State Patrol).
      </>
    ),
    policies: "Políticas",
    youCancel: "Si usted cancela",
    overnightTerms: "Estadías nocturnas (incluido el cuidado nocturno de gatos)",
    termsHead: ["Plazo", "Condiciones"],
    terms: [
      ["Más de 48 horas antes del inicio", "Se devuelve el depósito"],
      ["Entre 24 y 48 horas antes del inicio", "El depósito no es reembolsable"],
      ["Menos de 24 horas antes", "Se cobra el 50% del total de la estadía (depósito incluido)"],
    ] as Row[],
    termsWhy:
      "Rechazo otras reservas para apartar sus fechas, por eso estas condiciones se aplican sin importar el motivo de la cancelación.",
    shortTitle: "Paseos, visitas a gatos y visitas al parque",
    shortTerms:
      "Avise con 24 horas para cancelar o cambiar la fecha sin costo; las cancelaciones con menos de 24 horas de aviso se cobran a la tarifa completa",
    iCancel: "Si yo cancelo",
    iCancelText:
      "Si alguna vez necesito cancelar o cambiar la fecha, le avisaré lo antes posible. Nunca se le cobra por una cancelación de mi parte, cualquier depósito se le devuelve completo y tendrá prioridad para volver a reservar.",
    paymentTitle: "Depósito y pago",
    paymentOvernight: "Estadías nocturnas",
    payment: [
      <>
        <strong>Depósito:</strong> 25% del total, para apartar las fechas
      </>,
      "El depósito deja de ser reembolsable si se cancela dentro de las 48 horas previas al inicio",
      <>
        <strong>Saldo:</strong> se paga el día de llegada
      </>,
      "El monto total se confirma por escrito (mensaje de texto o correo) antes de que empiece la estadía",
    ],
    paymentShortTitle: "Paseos, visitas y visitas al parque",
    paymentShort: "Se pagan después de cada servicio",
    methods: ["Venmo", "Zelle", "Efectivo"],
    emergencyTitle: "En caso de emergencia",
    emergency:
      "Mi enfoque es la prevención: estar atento a los peligros y evitar riesgos innecesarios en cada paseo o estadía. Si llega a ocurrir una emergencia médica, me comunicaré con usted de inmediato y organizaré el traslado de su mascota, en un taxi para mascotas o con su ayuda, a su veterinario, o a la clínica veterinaria de emergencia más cercana si no logro comunicarme con usted.",
    bookMeet: "Agendar cita para conocernos",
    newTab: " (se abre en una pestaña nueva)",
    already: "¿Ya es cliente o tiene una pregunta?",
    sendNote: "Envíeme un mensaje",
  },
};

const subnavIds = ["walking", "overnight", "cat-sitting", "dog-park", "policies"];

const anchor = "scroll-mt-[150px] max-[440px]:scroll-mt-[184px]";
const card = "bg-card rounded-site shadow-site p-8 max-[560px]:p-6";
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

// Two-column table; the last row has no bottom border. "price": right column is a bold
// blue amount; "terms": right column is semibold text that may wrap.
function RateTable({ head, rows, variant = "price" }: { head: string[]; rows: [React.ReactNode, React.ReactNode][]; variant?: "price" | "terms" }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className={th}>{head[0]}</th>
            <th className={th}>{head[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, value], i) => {
            const last = i === rows.length - 1 ? " !border-b-0" : "";
            return (
              <tr key={i}>
                <td className={`${td}${last}`}>{label}</td>
                <td className={variant === "price" ? `${tdLast}${last}` : `${td}${last} font-semibold`}>{value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function RatesPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const subnav = subnavIds.map((id, i) => ({ id, label: t.subnav[i] }));
  return (
    <LangRoot lang={lang}>
      <Header lightPage subnav={subnav} />

      <main>
        <section id="rates" className="pt-[180px] max-[860px]:pt-[160px] max-[440px]:pt-[196px] pb-24 bg-surface">
          <div className="mx-auto max-w-site px-6">
            {/* Hero */}
            <p className="font-heading font-semibold text-primary-dark uppercase tracking-[0.08em] text-[0.85rem] mb-2 text-center">
              {t.label}
            </p>
            <h1 className="text-center text-[1.5rem]">{t.title}</h1>
            <p className="text-charcoal-soft max-w-[560px] mx-auto mt-3 text-center">{t.intro}</p>

            {/* What's Always Included (applies to both services) */}
            <div className={`${narrow} mt-10 rounded-site p-7 px-8 max-[560px]:p-6 bg-gold-light border-l-4 border-gold-dark`}>
              <h2 className="text-[1.1rem] mb-3 text-gold-ink">{t.includedTitle}</h2>
              <ul className="text-charcoal-soft space-y-2.5">
                {t.included.map((item) => (
                  <li key={item} className={check}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-charcoal-soft mt-4 pt-4 border-t border-gold-dark/30">
                <strong className="text-gold-ink">{t.newClientsLead}</strong> {t.newClients}
              </p>
              <p className="text-charcoal-soft mt-2">
                <strong className="text-gold-ink">{t.referLead}</strong> {t.refer}
              </p>
            </div>

            {/* Rates: dog walking first, then overnight; two columns on desktop, stacked at <=860px */}
            <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-8 max-[860px]:gap-14 mt-14 items-start">
              <div id="walking" className={anchor}>
                <Divider label={t.walking.divider} />

                <div className={card}>
                  <h3 className={blockTitle}>{t.walking.ratesTitle}</h3>
                  <RateTable head={t.walking.head} rows={t.walking.rows} />
                  <p className="text-charcoal-soft text-[0.85rem] mt-4">{t.walking.longer}</p>
                </div>

                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>{t.addOns}</h3>
                  <RateTable head={t.itemFee} rows={t.walking.addOns} />
                  <p className="text-charcoal-soft text-[0.85rem] mt-4">{t.holidayNote}</p>
                </div>

                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>{t.walking.bookingTitle}</h3>
                  <ul className="text-charcoal-soft space-y-2.5">
                    {t.walking.booking.map((item) => (
                      <li key={item} className={bullet}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div id="overnight" className={anchor}>
                <Divider label={t.overnight.divider} />

                <div className={card}>
                  <h3 className={blockTitle}>{t.overnight.baseTitle}</h3>
                  <RateTable head={t.overnight.head} rows={t.overnight.rows} />
                  <p className={`${rateNote} mt-4 !mb-0`}>{t.overnight.covers}</p>
                </div>

                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>{t.addOns}</h3>
                  <RateTable head={t.itemFee} rows={t.overnight.addOns} />
                </div>

                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>{t.overnight.buildsTitle}</h3>
                  <RateTable head={t.overnight.buildsHead} rows={t.overnight.builds} />
                </div>
              </div>
            </div>

            {/* Cat Sitting and Off-Leash Dog Park: side by side on desktop */}
            <div className="grid grid-cols-2 max-[860px]:grid-cols-1 gap-8 max-[860px]:gap-14 mt-14 items-start">
              <div id="cat-sitting" className={anchor}>
                <Divider label={t.cat.divider} />
                <div className={card}>
                  <h3 className={blockTitle}>{t.cat.ratesTitle}</h3>
                  <RateTable head={t.cat.head} rows={t.cat.rows} />
                </div>
                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>{t.addOns}</h3>
                  <RateTable head={t.itemFee} rows={t.cat.addOns} />
                  <p className="text-charcoal-soft text-[0.85rem] mt-4">{t.holidayNote}</p>
                </div>
              </div>

              <div id="dog-park" className={anchor}>
                <Divider label={t.park.divider} />
                <div className={card}>
                  <h3 className={blockTitle}>{t.park.title}</h3>
                  <p className={rateNote}>{t.park.note}</p>
                  <RateTable head={t.park.head} rows={t.park.rows} />
                </div>
                <div className={`${card} mt-8`}>
                  <h3 className={blockTitle}>{t.addOns}</h3>
                  <RateTable head={t.itemFee} rows={t.park.addOns} />
                </div>
              </div>
            </div>

            {/* Before Your First Booking */}
            <div className={`${narrow} ${card} mt-14`}>
              <h2 className={blockTitle}>{t.firstTitle}</h2>
              <p className={rateNote}>{t.firstIntro}</p>
              <ul className="text-charcoal-soft space-y-2.5">
                {t.firstItems.map((item) => (
                  <li key={item} className={check}>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-charcoal-soft text-[0.85rem] mt-4">{t.insurance}</p>
            </div>

            {/* Policies: every cancellation, payment and emergency term in one place */}
            <div className={`${narrow} mt-14`}>
              <Divider id="policies" label={t.policies} />

              <div className={card}>
                <h3 className={blockTitle}>{t.youCancel}</h3>

                <h4 className={subTitle}>{t.overnightTerms}</h4>
                <RateTable head={t.termsHead} rows={t.terms} variant="terms" />
                <p className="text-charcoal-soft text-[0.85rem] mt-4">{t.termsWhy}</p>

                <h4 className={`${subTitle} mt-6`}>{t.shortTitle}</h4>
                <p className="text-charcoal-soft">{t.shortTerms}</p>
              </div>

              <div className="rounded-site p-7 px-8 max-[560px]:p-6 mt-8 bg-blush border-l-4 border-primary">
                <h3 className="text-[1.1rem] mb-2 text-primary-dark">{t.iCancel}</h3>
                <p className="text-charcoal-soft">{t.iCancelText}</p>
              </div>

              <div className={`${card} mt-8`}>
                <h3 className={blockTitle}>{t.paymentTitle}</h3>
                <h4 className={subTitle}>{t.paymentOvernight}</h4>
                <ul className="text-charcoal-soft space-y-2.5">
                  {t.payment.map((item, i) => (
                    <li key={i} className={bullet}>
                      {item}
                    </li>
                  ))}
                </ul>
                <h4 className={`${subTitle} mt-6`}>{t.paymentShortTitle}</h4>
                <p className="text-charcoal-soft">{t.paymentShort}</p>
                <div className="flex gap-2.5 mt-5 flex-wrap">
                  {t.methods.map((m) => (
                    <span key={m} className="bg-gold-light text-gold-ink font-heading font-semibold text-[0.85rem] px-4 py-1.5 rounded-full">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-site p-7 px-8 max-[560px]:p-6 mt-8 bg-gold-light border-l-4 border-gold-dark">
                <h3 className="text-[1.1rem] mb-2 text-gold-ink">{t.emergencyTitle}</h3>
                <p className="text-charcoal-soft">{t.emergency}</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <a href={bookingUrl} target="_blank" rel="noopener" className={btnPrimary}>
                {t.bookMeet}
                <span className="sr-only">{t.newTab}</span>
              </a>
              <p className="text-charcoal-soft text-[0.9rem] mt-4">
                {t.already}{" "}
                <a
                  href={`${localePath(lang, "/")}#contact`}
                  className="text-primary-dark font-semibold underline underline-offset-4 decoration-1 hover:decoration-2"
                >
                  {t.sendNote}
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </LangRoot>
  );
}
