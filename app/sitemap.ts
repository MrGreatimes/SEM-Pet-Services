import type { MetadataRoute } from "next";
import { localePath, siteUrl } from "@/lib/i18n";

// Homepage and Rates in English and Spanish, each listing its other-language copy so
// Google pairs them. Privacy and review pages are left out (review is noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages = [
    { path: "/", priority: 1 },
    { path: "/rates", priority: 0.8 },
  ];
  const url = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

  return pages.flatMap(({ path, priority }) => {
    const languages = { en: url(path), es: url(localePath("es", path)) };
    return (["en", "es"] as const).map((lang) => ({
      url: languages[lang],
      lastModified,
      changeFrequency: "monthly" as const,
      priority: lang === "en" ? priority : priority - 0.1,
      alternates: { languages },
    }));
  });
}
