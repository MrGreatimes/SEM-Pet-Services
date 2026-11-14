import type { Metadata } from "next";
import Footer from "@/components/Footer";
import NotFoundBody from "@/components/pages/NotFoundBody";

export const metadata: Metadata = {
  title: "Page Not Found | Strol Pet Services",
  robots: { index: false, follow: false },
};

// The body picks English or Spanish from the address (see NotFoundBody); the footer is a
// server component, so both versions are passed in and it shows the matching one.
export default function NotFound() {
  return <NotFoundBody footer={{ en: <Footer lang="en" />, es: <Footer lang="es" /> }} />;
}
