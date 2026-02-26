import { Suspense } from "react";
import PascoaClient from "./pascoa-client";

function LoadingScreen() {
  return (
    <main className="fixed inset-0 z-[9999] bg-pascoa-chocolate flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">

        <img
          src="/logo-sebratel.png"
          alt="Logo Sebratel"
          style={{ width: '7.5rem' }}
          className="animate-pulse"
        />

        <div className="flex flex-col items-center gap-3">
          {/* Spinner Giratório */}
          <div className="w-6 h-6 border-2 border-white/20 border-t-yellow-500 rounded-full animate-spin" />

          <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-mono mt-2">
            Validando QR Code
          </p>
        </div>
      </div>
    </main>
  );
}

export default function PascoaPage() {
  // Agora o Suspense volta a controlar o fluxo:
  // Se o PascoaClient estiver processando, ele mostra o fallback (LoadingScreen).
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PascoaClient />
    </Suspense>
  );
}