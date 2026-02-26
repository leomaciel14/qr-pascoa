"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PascoaSuccess from "@/app/pascoa/PascoaSuccess";

export default function PascoaClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ok">("loading");
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
          setQrData({ qrId: data.qrId, base: data.base });
          setStatus("ok");
        } else {
          router.replace("/ja-usado");
        }
      })
      .catch(() => {
        router.replace("/ja-usado");
      });
  }, [params, router]);

  // Se ainda estiver carregando, retornamos null. 
  // Isso permite que o Suspense (no page.tsx) mostre a LoadingScreen oficial.
  if (status === "loading") return null;

  return <PascoaSuccess qrId={qrData.qrId} base={qrData.base} preview={false} />;
}