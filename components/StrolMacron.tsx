// "Strōl" with the macron drawn as a bar centered over the "o", instead of the font's
// own "ō": Fraunces Bold places its macron off to the right, over the "l" (reads as
// "Strof"). The underlying text is plain "Strol", so screen readers, copy/paste and
// search all see the normal spelling. Sizes are in em, so it scales with any font size.
// `caps`: for uppercase labels (e.g. "WHY STROL", which uses letter-spacing): the bar
// sits higher, above a capital O, and the right inset allows for the tracking.
export default function StrolMacron({ caps = false }: { caps?: boolean }) {
  return (
    <>
      Str
      <span className="relative inline-block leading-none">
        o
        <span
          aria-hidden="true"
          className={`absolute h-[0.08em] rounded-full bg-current ${
            caps ? "left-[0.14em] right-[0.22em] -top-[0.1em]" : "left-[0.12em] right-[0.12em] top-[0.14em]"
          }`}
        />
      </span>
      l
    </>
  );
}
