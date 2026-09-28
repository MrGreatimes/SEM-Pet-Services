import Link from "next/link";
import { neighborhoods } from "@/lib/neighborhoods";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream py-6">
      <div className="mx-auto max-w-site px-6 text-[0.9rem]">
        {/* Plain-text neighborhood list, partly for local SEO. */}
        <p className="text-cream/70 text-[0.85rem] mb-3">
          <span className="font-semibold text-cream">Serving Seattle neighborhoods:</span>{" "}
          {neighborhoods.join(", ")}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p>&copy; {year} Strol Pet Services. All rights reserved.</p>
          <Link href="/privacy" className="font-semibold text-cream hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
