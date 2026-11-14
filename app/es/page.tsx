import HomePage from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata = pageMetadata(
  "es",
  "/",
  "Strol Pet Services | Paseo de perros y cuidado de mascotas en Seattle",
  "Cuidado de mascotas en Seattle con licencia, afianzado y asegurado: paseo de perros, cuidado nocturno y cuidado de gatos, con actualizaciones diarias y una cita para conocernos sin costo. Se habla español."
);

export default function Page() {
  return <HomePage lang="es" />;
}
