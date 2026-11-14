import RatesPage from "@/components/pages/RatesPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "en",
  "/rates",
  "Rates & Policies | Strol Pet Services",
  "Rates for dog walking, overnight pet sitting, cat sitting, and dog park trips in North Seattle, plus deposit and cancellation policies."
);

export default function Page() {
  return <RatesPage lang="en" />;
}
