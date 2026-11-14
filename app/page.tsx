import HomePage from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "en",
  "/",
  "Strol Pet Services | Dog Walking & Pet Sitting in Seattle",
  "Licensed, bonded and insured pet care in Seattle: dog walking, overnight and cat sitting, with daily updates and a complimentary meet & greet."
);

export default function Page() {
  return <HomePage lang="en" />;
}
