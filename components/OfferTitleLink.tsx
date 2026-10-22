"use client";

import Link from "next/link";
import { useState } from "react";

// Offer card title link. Mouse: underlines on hover. Touch: underlines the moment a
// finger lands on it (phones otherwise wait a beat before faking a hover), and clears
// when the finger lifts or the touch turns into a scroll (pointercancel). Hover
// underline is limited to devices that really hover, so it doesn't stick after a tap.
export default function OfferTitleLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [pressed, setPressed] = useState(false);
  const release = () => setPressed(false);

  return (
    <Link
      href={href}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") setPressed(true);
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerLeave={release}
      className={`relative max-[860px]:block max-[860px]:py-2 max-[860px]:-my-2 rounded-sm [@media(hover:hover)]:hover:underline underline-offset-4 decoration-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
        pressed ? "underline" : ""
      }`}
    >
      {children}
    </Link>
  );
}
