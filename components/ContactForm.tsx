"use client";

import FieldError from "@/components/FieldError";
import { useLang } from "@/components/LangRoot";
import { btnPrimary, inputClass, labelClass } from "@/lib/styles";
import { looksLikeEmail, useFormValidation } from "@/lib/useFormValidation";

const text = {
  en: {
    nameMissing: "Add a name.",
    emailMissing: "Enter an email.",
    emailFormat: "Format: name@example.com",
    name: "Your Name",
    email: "Email",
    dates: "Dates Needed",
    referredBy: "Referred By",
    more: "Tell Me More",
    optional: "(optional)",
    moreHint: "Breed, age, temperament and special needs.",
    send: "Send Request",
  },
  es: {
    nameMissing: "Escriba su nombre.",
    emailMissing: "Escriba su correo electrónico.",
    emailFormat: "Formato: nombre@ejemplo.com",
    name: "Su nombre",
    email: "Correo electrónico",
    dates: "Fechas",
    referredBy: "Recomendación de",
    more: "Cuénteme más",
    optional: "(opcional)",
    moreHint: "Raza, edad, temperamento y necesidades especiales.",
    send: "Enviar solicitud",
  },
};

// "Check Availability" form. Required: Your Name, Email. Optional: Dates Needed,
// Tell Me More (one combined box for dog details and anything else). Posts straight to Formspree as a plain HTML form.
// On the Spanish site the labels and errors are in Spanish, and the email Sean gets
// says "language: Spanish" (and "(Spanish)" in the subject) so he knows to reply in Spanish.
export default function ContactForm() {
  const lang = useLang();
  const t = text[lang];
  const { errors, onSubmit, fieldProps, formRef } = useFormValidation({
    name: (v) => (v.trim() ? undefined : t.nameMissing),
    email: (v) => {
      if (!v.trim()) return t.emailMissing;
      if (!looksLikeEmail(v)) return t.emailFormat;
      return undefined;
    },
  });

  const field = "flex flex-col gap-2 max-[440px]:gap-1";
  // Grows to share leftover height, but never shrinks below its label + hint + the
  // textarea minimum (so a box can't spill over the next field).
  const grow = "max-[440px]:flex-1";
  // On phones the textareas start at 0 height and grow into whatever space the
  // screen-tall section has left (min 48px), rather than keeping their rows height.
  const textarea = `${inputClass} max-[440px]:py-2 max-[440px]:flex-1 max-[440px]:basis-auto max-[440px]:h-0 max-[440px]:min-h-[48px] max-[440px]:resize-none`;

  return (
    <form
      ref={formRef}
      className="bg-card rounded-site shadow-site p-8 max-[440px]:p-4 flex flex-col gap-3.5 max-[440px]:gap-2 max-[440px]:w-full"
      action="https://formspree.io/f/xjykrlgr"
      method="POST"
      noValidate
      onSubmit={onSubmit}
    >
      <input
        type="hidden"
        name="_subject"
        value={lang === "es" ? "New inquiry from Strol website (Spanish)" : "New inquiry from Strol website"}
      />
      <input type="hidden" name="language" value={lang === "es" ? "Spanish" : "English"} />
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
      {/* Reminder for Sean, printed in every Formspree email (owner's request 2026-11-06). Visible in page source, so keep it client-safe. */}
      <input
        type="hidden"
        name="booking_checklist"
        value="New client: add New Client $10 Off to the first invoice. If referred_by is filled in: note it, and once this first booking is done add Referral Reward $25 Off to the referrer's next invoice."
      />

      {/* On phones Name and Email sit side by side, top-aligned. */}
      <div className="flex flex-col gap-3.5 max-[440px]:grid max-[440px]:grid-cols-2 max-[440px]:gap-2 max-[440px]:items-start">
        <div className={field}>
          <label htmlFor="name" className={labelClass}>
            {t.name}
          </label>
          <input
            type="text"
            autoComplete="name"
            required
            className={`${inputClass} max-[440px]:py-2`}
            {...fieldProps("name", "name")}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div className={field}>
          <label htmlFor="email" className={labelClass}>
            {t.email}
          </label>
          <input
            type="email"
            autoComplete="email"
            required
            className={`${inputClass} max-[440px]:py-2`}
            {...fieldProps("email", "email")}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      {/* On phones Dates and Referred By sit side by side too, so the form stays one screen tall. */}
      <div className="flex flex-col gap-3.5 max-[440px]:grid max-[440px]:grid-cols-2 max-[440px]:gap-2 max-[440px]:items-end">
        <div className={field}>
          <label htmlFor="dates" className={labelClass}>
            {t.dates} <span className="font-normal text-charcoal-soft">{t.optional}</span>
          </label>
          <input
            type="text"
            id="dates"
            name="dates"
            className={`${inputClass} max-[440px]:py-2`}
          />
        </div>
        <div className={field}>
          <label htmlFor="referred_by" className={labelClass}>
            {t.referredBy} <span className="font-normal text-charcoal-soft">{t.optional}</span>
          </label>
          <input
            type="text"
            id="referred_by"
            name="referred_by"
            className={`${inputClass} max-[440px]:py-2`}
          />
        </div>
      </div>

      <div className={`${field} ${grow}`}>
        <label htmlFor="message" className={labelClass}>
          {t.more} <span className="font-normal text-charcoal-soft">{t.optional}</span>
        </label>
        <p id="message-hint" className="text-[0.78rem] text-charcoal-soft -mt-1">
          {t.moreHint}
        </p>
        <textarea id="message" name="message" rows={5} aria-describedby="message-hint" className={textarea} />
      </div>

      <button
        type="submit"
        className={`${btnPrimary} self-start mt-2 max-[440px]:self-stretch max-[440px]:mt-1 max-[440px]:py-3`}
      >
        {t.send}
      </button>
    </form>
  );
}
