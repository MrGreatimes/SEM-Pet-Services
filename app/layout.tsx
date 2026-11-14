import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import { LANG_STORAGE_KEY, siteUrl } from "@/lib/i18n";
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

// Site-wide defaults only. Each page sets its own title, description, canonical address,
// language alternates and link preview through lib/pageMetadata.ts (before 2026-11-13 the
// canonical "/" set here leaked into /rates and /privacy, telling Google they were copies
// of the homepage).
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

// A visitor who picked Spanish with the header's language switch and later opens an
// English page directly (typed address, bookmark, shared link) is sent to the same page
// in Spanish before anything is drawn. Only for the four pages that have a Spanish copy.
// Search engines never store a choice, so they always get each page in its own language.
const rememberLanguage = `try{var p=location.pathname;if(localStorage.getItem(${JSON.stringify(
  LANG_STORAGE_KEY
)})==="es"&&["/","/rates","/privacy","/review"].indexOf(p)>-1){location.replace((p==="/"?"/es":"/es"+p)+location.search+location.hash)}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${workSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: rememberLanguage }} />
      </head>
      <body className="font-body text-charcoal bg-cream leading-relaxed">{children}</body>
    </html>
  );
}
