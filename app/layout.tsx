import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const siteUrl = "https://strolpetservices.com";
const siteName = "Strol Pet Services";
const siteTitle = "Strol Pet Services | Dog Walking & Pet Sitting in Seattle";
const siteDescription =
  "Trusted, independent pet care services in Seattle. 10 years of experience. Daily updates, free meet & greet, and medication care included.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/images/Owner and dog 1 edit.jpeg",
        width: 900,
        height: 837,
        alt: "Strol Pet Services, in-home overnight pet sitting and dog walking in Seattle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/images/Owner and dog 1 edit.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="font-body text-charcoal bg-cream leading-relaxed">{children}</body>
    </html>
  );
}
