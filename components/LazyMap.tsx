"use client";

import { useEffect, useRef, useState } from "react";

// Google My Maps embed that only loads once the visitor scrolls near it. The
// embed pulls in ~500KB of Google scripts; with plain loading="lazy" Chrome
// still fetched it during page load (its lazy threshold is very generous), which
// delayed the first paint on phones. The parent frame keeps its size, so nothing
// shifts when the map appears.
export default function LazyMap({ src, title, className }: { src: string; title: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {show && (
        <iframe
          title={title}
          src={src}
          className={className}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      )}
    </div>
  );
}
