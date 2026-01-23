"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PascoaClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "ok">("loading");

  useEffect(() => {
    const id = params.get("id");
    if (!id) return;

    fetch("/api/qr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "USED") {
          router.replace("/ja-usado");
        } else if (data.status === "OK") {
          setStatus("ok");
        }
      });
  }, [params, router]);

  if (status === "loading") {
    return <p>Validando QR...</p>;
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">🐰 Feliz Páscoa!</h1>
      <p>QR válido! Aproveite 🎉</p>
    </main>
  );
}
