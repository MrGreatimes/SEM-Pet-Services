import RatesPage from "@/components/pages/RatesPage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "es",
  "/rates",
  "Tarifas y políticas | Strol Pet Services",
  "Tarifas de paseo de perros, cuidado nocturno de mascotas, cuidado de gatos y visitas al parque para perros en el norte de Seattle, además de las políticas de depósito y cancelación."
);

export default function Page() {
  return <RatesPage lang="es" />;
}
