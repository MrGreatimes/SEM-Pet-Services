// Strol's social profiles (added 2026-11-13). Shown as links in the footer on every page.
// Those with `sameAs: true` are also listed in the homepage's LocalBusiness structured
// data, which tells Google these profiles belong to the business. Use clean links (no
// tracking codes). The Google link is the profile's "Share" short link: it opens a Google
// search showing the Business Profile, so it suits visitors but isn't a profile page, and
// Google already knows its own profile, so it's left out of sameAs.
export const socialLinks = [
  { name: "Instagram", url: "https://www.instagram.com/strolpetservices/", icon: "instagram", sameAs: true },
  { name: "Facebook", url: "https://www.facebook.com/strolpetservices", icon: "facebook", sameAs: true },
  { name: "TikTok", url: "https://www.tiktok.com/@strolpetservices", icon: "tiktok", sameAs: true },
  { name: "Nextdoor", url: "https://nextdoor.com/page/strol-pet-services-seattle-wa", icon: "nextdoor", sameAs: true },
  { name: "Google", url: "https://share.google/3ufcP8hVedraf8fMu", icon: "google", sameAs: false },
] as const;
