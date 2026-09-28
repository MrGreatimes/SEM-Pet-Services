// Inline error shown directly under a form field: red text (the field itself gets a
// red border via aria-invalid). role="alert" makes screen readers announce it when it
// appears, and the written message means the error doesn't rely on color alone.
//
// `reserve` keeps a one-line slot in the layout even when there's no error, so an
// error appearing on submit doesn't push the rest of the form down.
export default function FieldError({
  id,
  message,
  reserve = false,
  className = "",
}: {
  id: string;
  message?: string;
  reserve?: boolean;
  className?: string;
}) {
  if (!message && !reserve) return null;
  return (
    <p
      id={id}
      role="alert"
      className={`text-[0.82rem] max-[440px]:text-[0.78rem] leading-snug font-semibold text-red-700 ${reserve ? "min-h-[1.15rem] max-[440px]:min-h-[1.1rem]" : ""} ${className}`}
    >
      {message}
    </p>
  );
}
