import type { Metadata } from "next";
import { alternatesFor, localePath, siteUrl, type Lang } from "@/lib/i18n";

const ogImage = {
  url: "/images/Owner and Chloe 1 edit.jpeg",
  width: 900,
  height: 837,
};

const ogAlt: Record<Lang, string> = {
  en: "Strol Pet Services, in-home overnight pet sitting and dog walking in Seattle",
  es: "Strol Pet Services, cuidado de mascotas a domicilio y paseo de perros en Seattle",
};

// Full metadata for a page that exists in English and Spanish: title, description,
// its own canonical address, hreflang alternates, and link-preview (Open Graph /
// Twitter) text in the page's language. `path` is the English path ("/", "/rates").
// Every page sets this; a page that didn't would inherit the root layout's values.
export function pageMetadata(
  lang: Lang,
  path: string,
  title: string,
  description: string,
  extra: Metadata = {}
): Metadata {
  const url = `${siteUrl}${localePath(lang, path) === "/" ? "" : localePath(lang, path)}`;
  return {
    title,
    description,
    alternates: alternatesFor(lang, path),
    openGraph: {
      type: "website",
      url,
      siteName: "Strol Pet Services",
      title,
      description,
      locale: lang === "es" ? "es_US" : "en_US",
      alternateLocale: lang === "es" ? "en_US" : "es_US",
      images: [{ ...ogImage, alt: ogAlt[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    ...extra,
  };
}
