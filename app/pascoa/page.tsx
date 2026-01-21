"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PascoaPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const id = params.get("id");

    if (!id) return;

    fetch("/api/qr", {
      method: "POST",
      body: JSON.stringify({ id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "USED") {
          router.push("/ja-usado");
        }
      });
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">🐰 Feliz Páscoa!</h1>
      <p>QR válido 🎉</p>
    </main>
  );
}
