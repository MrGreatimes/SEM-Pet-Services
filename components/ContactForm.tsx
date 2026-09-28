"use client";

import FieldError from "@/components/FieldError";
import { btnPrimary, inputClass, labelClass } from "@/lib/styles";
import { looksLikeEmail, useFormValidation } from "@/lib/useFormValidation";

// "Check Availability" form. Required: Your Name, Email. Optional: Dates Needed,
// About Your Dog, Message. Posts straight to Formspree as a plain HTML form.
export default function ContactForm() {
  const { errors, onSubmit, fieldProps } = useFormValidation({
    name: (v) => (v.trim() ? undefined : "Add a name."),
    email: (v) => {
      if (!v.trim()) return "Enter an email.";
      if (!looksLikeEmail(v)) return "Format: name@example.com";
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
      className="bg-white rounded-site shadow-site p-8 max-[440px]:p-4 flex flex-col gap-3.5 max-[440px]:gap-2 max-[440px]:w-full"
      action="https://formspree.io/f/xjykrlgr"
      method="POST"
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="_subject" value="New inquiry from Strol website" />
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      {/* On phones Name and Email sit side by side, top-aligned. */}
      <div className="flex flex-col gap-3.5 max-[440px]:grid max-[440px]:grid-cols-2 max-[440px]:gap-2 max-[440px]:items-start">
        <div className={field}>
          <label htmlFor="name" className={labelClass}>
            Your Name
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
            Email
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

      <div className={field}>
        <label htmlFor="dates" className={labelClass}>
          Dates Needed
        </label>
        <p id="dates-hint" className="text-[0.78rem] text-charcoal-soft -mt-1">
          e.g. Aug 12–16
        </p>
        <input
          type="text"
          id="dates"
          name="dates"
          aria-describedby="dates-hint"
          className={`${inputClass} max-[440px]:py-2`}
        />
      </div>

      <div className={`${field} ${grow}`}>
        <label htmlFor="dog-info" className={labelClass}>
          About Your Dog
        </label>
        <p id="dog-info-hint" className="text-[0.78rem] text-charcoal-soft -mt-1">
          Breed, age, temperament, any special needs
        </p>
        <textarea id="dog-info" name="dog_info" rows={3} aria-describedby="dog-info-hint" className={textarea} />
      </div>

      <div className={`${field} ${grow}`}>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea id="message" name="message" rows={4} className={textarea} />
      </div>

      <button
        type="submit"
        className={`${btnPrimary} self-start mt-2 max-[440px]:self-stretch max-[440px]:mt-1 max-[440px]:py-3`}
      >
        Send Request
      </button>
    </form>
  );
}
