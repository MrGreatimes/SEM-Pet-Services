import PrivacyPage from "@/components/pages/PrivacyPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "es",
  "/privacy",
  "Política de privacidad | Strol Pet Services",
  "Cómo Strol Pet Services maneja la información que usted comparte a través de este sitio."
);

export default function Page() {
  return <PrivacyPage lang="es" />;
}
