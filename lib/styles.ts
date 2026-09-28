// Class strings shared by the homepage and the form components.

export const btnPrimary =
  "inline-block px-7 py-3.5 rounded-full font-heading font-semibold text-base border-2 border-transparent bg-primary text-white transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-site cursor-pointer";

// Invalid fields (aria-invalid="true") get a red border and focus ring. The error
// message under the field carries an icon and text, so color isn't the only signal.
export const inputClass =
  "font-body text-base px-3.5 py-3 border-[1.5px] border-cream-alt rounded-[10px] bg-cream text-charcoal w-full resize-y focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(62,110,142,0.3)] aria-[invalid=true]:border-red-700 aria-[invalid=true]:focus:border-red-700 aria-[invalid=true]:focus:shadow-[0_0_0_3px_rgba(185,28,28,0.2)]";

// Field labels ignore clicks (owner's choice) so the cursor only lands in a field when
// the field itself is clicked, not the label row above it. htmlFor is still set, so
// screen readers keep the label/field association.
export const labelClass = "font-heading font-semibold text-[0.9rem] pointer-events-none";
