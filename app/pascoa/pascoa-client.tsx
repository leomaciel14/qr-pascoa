"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PascoaClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ok">("loading");

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
        if (data.status === "USED") {
          router.replace("/ja-usado");
        } else if (data.status === "OK") {
          setStatus("ok");
        } else {
          router.replace("/ja-usado");
        }
      })
      .catch(() => {
        router.replace("/ja-usado");
      });
  }, [params, router]);

  if (status === "loading") {
    return <p className="p-8">Validando QR...</p>;
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-8 bg-yellow-300 text-black">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold">🐰 Feliz Páscoa!</h1>
        <p>QR válido! Aproveite 🎉</p>
      </div>
    </main>
  );
}