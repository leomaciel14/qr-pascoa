import { Suspense } from "react";
import PascoaClient from "./pascoa-client";

export default function PascoaPage() {
  return (
    <Suspense fallback={<p>Validando QR...</p>}>
      <PascoaClient />
    </Suspense>
  );
}
