"use client";

import FieldError from "@/components/FieldError";
import { btnPrimary, inputClass, labelClass } from "@/lib/styles";
import { useFormValidation } from "@/lib/useFormValidation";

// Testimonial form. Required: Name, Pet's Name, Service, Your Review. Optional: the
// publish-consent checkbox (unchecked = private feedback, still valid).
// Posts straight to Formspree as a plain HTML form.
export default function ReviewForm() {
  const { errors, onSubmit, fieldProps } = useFormValidation({
    name: (v) => (v.trim() ? undefined : "Add a name."),
    pet_name: (v) => (v.trim() ? undefined : "Add your pet's name."),
    service: (v) => (v ? undefined : "Pick the service used."),
    review: (v) => (v.trim() ? undefined : "Add a few words."),
  });

  const field = "flex flex-col gap-2 max-[440px]:gap-1";

  return (
    <form
      className="bg-white rounded-site shadow-site p-8 max-[440px]:p-3 max-w-[560px] mx-auto mt-10 max-[440px]:mt-2 flex flex-col gap-3.5 max-[440px]:gap-1.5 max-[440px]:w-full max-[440px]:flex-1 max-[440px]:min-h-0"
      action="https://formspree.io/f/xjykrlgr"
      method="POST"
      noValidate
      onSubmit={onSubmit}
    >
      <input type="hidden" name="_subject" value="New testimonial submission from Strol website" />
      <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-2 max-[560px]:grid-cols-1 max-[440px]:grid-cols-2 gap-3.5 max-[440px]:gap-2.5 items-start">
        <div className={field}>
          <label htmlFor="review-name" className={labelClass}>
            Name
          </label>
          <input
            type="text"
            autoComplete="given-name"
            required
            className={`${inputClass} max-[440px]:py-2`}
            {...fieldProps("name", "review-name")}
          />
          <FieldError id="review-name-error" message={errors.name} reserve />
        </div>
        <div className={field}>
          <label htmlFor="review-pet" className={labelClass}>
            Pet&apos;s Name
          </label>
          <input type="text" required className={`${inputClass} max-[440px]:py-2`} {...fieldProps("pet_name", "review-pet")} />
          <FieldError id="review-pet-error" message={errors.pet_name} reserve />
        </div>
      </div>

      <div className={field}>
        <label htmlFor="review-service" className={labelClass}>
          Service
        </label>
        <select defaultValue="" required className={`${inputClass} max-[440px]:py-2`} {...fieldProps("service", "review-service")}>
          <option value="">Select an option</option>
          <option value="Overnight Sitting">Overnight Sitting</option>
          <option value="Dog Walking">Dog Walking</option>
        </select>
        <FieldError id="review-service-error" message={errors.service} reserve />
      </div>

      <div className={`${field} max-[440px]:flex-1`}>
        <label htmlFor="review-text" className={labelClass}>
          Your Review
        </label>
        <p id="review-text-hint" className="text-[0.78rem] text-charcoal-soft -mt-1">
          How did your pet seem? Did you get the updates you expected?
        </p>
        {/* ~4 rows tall at minimum so it reads as a short paragraph, not a one-liner. */}
        <textarea
          rows={4}
          required
          className={`${inputClass} max-[440px]:flex-1 max-[440px]:basis-auto max-[440px]:h-0 max-[440px]:min-h-[116px] max-[440px]:resize-none`}
          {...fieldProps("review", "review-text", "review-text-hint")}
        />
        <FieldError id="review-text-error" message={errors.review} reserve />
      </div>

      <label className="flex items-center gap-3 max-[440px]:gap-2.5 text-[0.88rem] max-[440px]:text-[0.8rem] text-charcoal-soft font-body font-normal bg-cream border-[1.5px] border-cream-alt rounded-[10px] px-3.5 py-3 max-[440px]:py-1.5 cursor-pointer">
        <input
          type="checkbox"
          name="consent_to_publish"
          value="Yes"
          className="w-[18px] h-[18px] flex-none accent-primary cursor-pointer"
        />
        <span>Okay to feature this review, with my name, on the site</span>
      </label>

      <button
        type="submit"
        className={`${btnPrimary} self-start mt-2 max-[440px]:self-stretch max-[440px]:mt-1 max-[440px]:py-2.5`}
      >
        Submit Review
      </button>
    </form>
  );
}
