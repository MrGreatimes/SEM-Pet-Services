"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

// Returns an error message to show, or undefined when the value is fine. The form is
// passed too, for rules that depend on other fields (e.g. "only if the form is empty").
export type Validator = (value: string, form: HTMLFormElement | null) => string | undefined;

// Permissive on purpose: something before an @, and a domain with a dot after it.
export const looksLikeEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

/**
 * Inline validation for the site's plain HTML forms, which still POST straight to
 * Formspree. Fields are keyed by their `name` attribute.
 *
 * - A field is only checked once the user leaves it (blur), never while typing.
 * - Empty required fields are only flagged on submit, not on blur or when cleared,
 *   and leaving an empty field clears that message again.
 * - Once a field shows an error, it re-checks on every change so the error clears
 *   as soon as it's fixed (a different error only shows on the next blur).
 * - On submit, every field is checked; if any fail, the submit is cancelled (the
 *   typed data stays put). Focus is not moved; the user clicks into a field to fix it.
 * - After a successful submit (the browser leaves for Formspree's thank-you page),
 *   the form clears itself, so pressing "Go back" doesn't show the sent message
 *   still filled in. Attach the returned `formRef` to the <form>.
 */
export function useFormValidation(validators: Record<string, Validator>) {
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const submittedKey = `strol-form-sent:${Object.keys(validators).join(",")}`;

  // Coming back from the thank-you page: browsers may restore the page (and typed
  // values) from their cache, so clear this form if it was just sent. A form that was
  // typed in but never sent keeps its contents.
  useEffect(() => {
    const clearIfSent = () => {
      try {
        if (!sessionStorage.getItem(submittedKey)) return;
        sessionStorage.removeItem(submittedKey);
      } catch {
        return;
      }
      formRef.current?.reset();
      setErrors({});
    };
    clearIfSent();
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) clearIfSent();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [submittedKey]);

  const check = (name: string, value: string, form: HTMLFormElement | null) => validators[name]?.(value, form);

  // An empty field is only flagged by a submit attempt, never just for being left or
  // cleared out. Leaving an empty field clears any "required" error a submit showed;
  // the next submit brings it back if it's still empty.
  const onBlur = (e: FocusEvent<FieldElement>) => {
    const { name, value, form } = e.target;
    if (!validators[name]) return;
    setErrors((prev) => ({ ...prev, [name]: value.trim() ? check(name, value, form) : undefined }));
  };

  // While typing, an existing error can only clear (once the value is valid) or stay
  // as it is. If the problem changes (e.g. "Enter an email" becomes "Double-check your
  // email" as soon as they start typing), the error is hidden and the new message
  // waits for blur, so it never appears before they've finished.
  const onChange = (e: ChangeEvent<FieldElement>) => {
    const { name, value, form } = e.target;
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const error = check(name, value, form);
      return { ...prev, [name]: error === prev[name] ? error : undefined };
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const next: Record<string, string | undefined> = {};
    for (const name of Object.keys(validators)) {
      const field = form.elements.namedItem(name) as FieldElement | null;
      next[name] = check(name, field?.value ?? "", form);
    }
    setErrors(next);
    // Focus is deliberately left alone (owner's choice): the user picks which field
    // to fix. The errors' role="alert" still announces them to screen readers.
    if (Object.values(next).some(Boolean)) {
      e.preventDefault();
      return;
    }
    // Valid: let the browser send it, then clear the fields once the send has begun
    // (clearing inside this handler would send an empty form).
    try {
      sessionStorage.setItem(submittedKey, "1");
    } catch {
      // storage unavailable: the timed reset below still covers most cases
    }
    setTimeout(() => {
      form.reset();
      setErrors({});
    }, 0);
  };

  // Spread onto a field: wires up the handlers plus aria-invalid/aria-describedby,
  // pointing at the <FieldError id={`${id}-error`}> rendered beneath it, and at an
  // always-visible hint (by id) if the field has one.
  const fieldProps = (name: string, id: string, hintId?: string) => ({
    name,
    id,
    onBlur,
    onChange,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": [hintId, errors[name] && `${id}-error`].filter(Boolean).join(" ") || undefined,
  });

  return { errors, onSubmit, fieldProps, formRef };
}
