import ReviewPage from "@/components/pages/ReviewPage";
import { pageMetadata } from "@/lib/pageMetadata";

// Clients reach this page from a link Sean texts them, so it's kept out of search
// results and the sitemap. The homepage's main review ask is the Google review link.
export const metadata = pageMetadata(
  "en",
  "/review",
  "Leave a Review | Strol Pet Services",
  "Share how your pet's care with Strol Pet Services went.",
  { robots: { index: false, follow: true } }
);

export default function Page() {
  return <ReviewPage lang="en" />;
}
