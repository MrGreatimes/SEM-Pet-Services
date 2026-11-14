import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LangRoot from "@/components/LangRoot";
import type { Lang } from "@/lib/i18n";

// Privacy policy (/privacy and /es/privacy). Keep the two languages saying the same
// thing: when one changes, change the other and both dates.
const copy = {
  en: {
    title: "Privacy Policy",
    updated: "Last updated November 13, 2026",
    intro:
      "Strol Pet Services is a small, independent business. This page explains what information this website collects and how it is used. In short, the only information collected is what you choose to send through the contact and review forms, and it is used only to respond to you.",
    sections: [
      {
        heading: "What is collected",
        paragraphs: [
          "When you submit the contact form or the review form, the information you enter is collected. That may include your name, email address, the dates you need care, and details about your pet. The review form also records whether you consent to having your review featured on this site.",
        ],
      },
      {
        heading: "How it is used",
        paragraphs: [
          "Contact form submissions are used to respond to your inquiry and arrange care. Review submissions are used to understand how a visit went and, only if you check the consent box, to feature your review on this site with your first name. Your information is not sold or shared for advertising.",
        ],
      },
      {
        heading: "Form processing",
        paragraphs: [
          "Form submissions are delivered by Formspree, a third-party form service, which passes your message along by email. Their handling of the data is governed by their own privacy policy.",
          "To block spam, Formspree may ask you to complete a Google reCAPTCHA check when you submit a form. reCAPTCHA collects information such as your IP address and how you interact with the page, and its use is subject to Google's Privacy Policy and Terms of Service.",
        ],
      },
      {
        heading: "Online booking",
        paragraphs: [
          "The Book a Meet & Greet button opens a booking page run by Square, the service I use for scheduling and invoices. When you book there, Square collects the details you enter, such as your name, phone number, email, address and any note, and sends me your request along with confirmation and reminder messages. Square's handling of the data is governed by its own privacy policy.",
        ],
      },
      {
        heading: "Embedded map",
        paragraphs: [
          "The homepage shows an embedded Google Map of the service area. When it loads, Google may receive information such as your IP address and set cookies, under Google's own privacy policy.",
        ],
      },
      {
        heading: "Language preference",
        paragraphs: [
          "If you switch the site to Spanish or English, your browser remembers that choice so the site opens in the same language next time. It stays on your device and is not sent to me.",
        ],
      },
      {
        heading: "Your choices",
        paragraphs: [
          "You can ask to see, correct, or delete any information you have sent, or ask that a featured review be removed, by getting in touch through the contact form. Only send information you are comfortable sharing.",
        ],
      },
      {
        heading: "Changes",
        paragraphs: [
          "This policy may be updated from time to time. Any changes will be posted on this page with a revised date above.",
        ],
      },
    ],
  },
  es: {
    title: "Política de privacidad",
    updated: "Última actualización: 13 de noviembre de 2026",
    intro:
      "Strol Pet Services es un negocio pequeño e independiente. Esta página explica qué información recopila este sitio web y cómo se usa. En resumen, la única información que se recopila es la que usted decide enviar a través de los formularios de contacto y de reseñas, y se usa solo para responderle.",
    sections: [
      {
        heading: "Qué se recopila",
        paragraphs: [
          "Cuando envía el formulario de contacto o el de reseñas, se recopila la información que escribe. Puede incluir su nombre, su correo electrónico, las fechas en que necesita el cuidado y detalles sobre su mascota. El formulario de reseñas también registra si usted acepta que su reseña aparezca en este sitio.",
        ],
      },
      {
        heading: "Cómo se usa",
        paragraphs: [
          "Los mensajes del formulario de contacto se usan para responder a su consulta y organizar el cuidado. Las reseñas se usan para saber cómo salió una visita y, solo si marca la casilla de consentimiento, para publicar su reseña en este sitio con su nombre de pila. Su información no se vende ni se comparte con fines publicitarios.",
        ],
      },
      {
        heading: "Procesamiento de formularios",
        paragraphs: [
          "Los formularios se envían a través de Formspree, un servicio externo de formularios que me hace llegar su mensaje por correo electrónico. Su manejo de los datos se rige por su propia política de privacidad.",
          "Para bloquear el correo no deseado, Formspree puede pedirle que complete una verificación de Google reCAPTCHA al enviar un formulario. reCAPTCHA recopila información como su dirección IP y cómo interactúa con la página, y su uso está sujeto a la Política de Privacidad y las Condiciones de Servicio de Google.",
        ],
      },
      {
        heading: "Reservas en línea",
        paragraphs: [
          "El botón Agendar cita para conocernos abre una página de reservas administrada por Square, el servicio que uso para la agenda y las facturas. Cuando reserva allí, Square recopila los datos que usted escribe, como su nombre, teléfono, correo electrónico, dirección y cualquier nota, y me envía su solicitud junto con mensajes de confirmación y recordatorio. El manejo de los datos por parte de Square se rige por su propia política de privacidad.",
        ],
      },
      {
        heading: "Mapa integrado",
        paragraphs: [
          "La página de inicio muestra un mapa de Google con la zona de servicio. Cuando se carga, Google puede recibir información como su dirección IP y guardar cookies, según su propia política de privacidad.",
        ],
      },
      {
        heading: "Preferencia de idioma",
        paragraphs: [
          "Si cambia el sitio a español o a inglés, su navegador recuerda esa elección para que el sitio se abra en el mismo idioma la próxima vez. Se queda en su dispositivo y no me llega a mí.",
        ],
      },
      {
        heading: "Sus opciones",
        paragraphs: [
          "Puede pedir ver, corregir o borrar cualquier información que haya enviado, o pedir que se quite una reseña publicada, escribiéndome por el formulario de contacto. Envíe solo la información que quiera compartir.",
        ],
      },
      {
        heading: "Cambios",
        paragraphs: [
          "Esta política puede actualizarse de vez en cuando. Cualquier cambio se publicará en esta página con una nueva fecha arriba.",
        ],
      },
    ],
  },
};

const h2 = "font-heading font-bold text-[1.15rem] text-primary-dark mt-8 mb-2";
const p = "text-charcoal-soft mb-3";

export default function PrivacyPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <LangRoot lang={lang}>
      <Header lightPage />

      <main>
        <section className="pt-[150px] max-[860px]:pt-[130px] pb-24 bg-surface">
          <div className="mx-auto max-w-[720px] px-6">
            <h1 className="text-[1.6rem] mb-2">{t.title}</h1>
            <p className="text-charcoal-soft text-[0.9rem] mb-6">{t.updated}</p>

            <p className={p}>{t.intro}</p>

            {t.sections.map(({ heading, paragraphs }) => (
              <div key={heading}>
                <h2 className={h2}>{heading}</h2>
                {paragraphs.map((para) => (
                  <p key={para} className={p}>
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer lang={lang} />
    </LangRoot>
  );
}
