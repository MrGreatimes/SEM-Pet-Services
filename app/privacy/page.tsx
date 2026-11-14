import PrivacyPage from "@/components/pages/PrivacyPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "en",
  "/privacy",
  "Privacy Policy | Strol Pet Services",
  "How Strol Pet Services handles the information you share through this site."
);

export default function Page() {
  return <PrivacyPage lang="en" />;
}
