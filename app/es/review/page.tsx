import ReviewPage from "@/components/pages/ReviewPage";
import { pageMetadata } from "@/lib/pageMetadata";

// Spanish copy of /review: also kept out of search results (texted links only).
export const metadata = pageMetadata(
  "es",
  "/review",
  "Deje una reseña | Strol Pet Services",
  "Cuénteme cómo le fue a su mascota con Strol Pet Services.",
  { robots: { index: false, follow: true } }
);

export default function Page() {
  return <ReviewPage lang="es" />;
}
