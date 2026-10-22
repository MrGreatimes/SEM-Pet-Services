"use client";

import { useEffect, useId, useRef, useState } from "react";

// Review body, clamped to 5 lines with a "Read more" toggle. The toggle only shows when
// the text actually runs past 5 lines (re-checked on resize), so short reviews stay as is.
export default function ReviewText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      if (!expanded) setOverflows(el.scrollHeight > el.clientHeight + 1);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [expanded]);

  return (
    <>
      <p ref={ref} id={id} className={expanded ? "" : "line-clamp-5"}>
        &ldquo;{text}&rdquo;
      </p>
      {(overflows || expanded) && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={id}
          className="mt-2 font-semibold text-primary-dark text-[0.9rem] underline underline-offset-4 decoration-1 hover:decoration-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </>
  );
}
