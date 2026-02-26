"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PascoaSuccess from "@/app/pascoa/PascoaSuccess";

export default function PascoaClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ok">("loading");
  
  // Estado para guardar os dados reais do QR Code
  const [qrData, setQrData] = useState<{ qrId?: number; base?: string }>({});

  useEffect(() => {
    const token = params.get("t");

    if (!token) {
      router.replace("/ja-usado");
      return;
    }

    fetch("/api/qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "OK") {
          // Guardamos os dados que vieram da API (Firestore)
          setQrData({
            qrId: data.qrId,
            base: data.base
          });
          setStatus("ok");
        } else {
          // Se for USED ou qualquer erro, manda para a página de erro
          router.replace("/ja-usado");
        }
      })
      .catch(() => {
        router.replace("/ja-usado");
      });
  }, [params, router]);

  if (status === "loading") {
    // Aqui você pode até colocar um background escuro para não dar "flash" branco
    return (
      <main className="h-[100dvh] w-full bg-black flex items-center justify-center">
        <p className="text-white font-mono animate-pulse">Validando QR...</p>
      </main>
    );
  }

  // Passamos os dados REAIS para o componente visual
  return <PascoaSuccess qrId={qrData.qrId} base={qrData.base} preview={false} />;
}