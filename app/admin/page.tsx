"use client";

import { useEffect, useState } from "react";

type QR = {
  id: string;
  base: string;
  used: boolean;
  usedAt: string | null;
};

export default function AdminPage() {
  const [data, setData] = useState<{
    total: number;
    used: number;
    free: number;
    qrs: QR[];
  } | null>(null);

  useEffect(() => {
    fetch("/api/admin/qrs")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return <p className="p-8">Carregando dashboard...</p>;
  }

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard — QR Codes</h1>

      {/* Cards de métricas */}
      <div className="flex gap-4">
        <Card title="Total" value={data.total} />
        <Card title="Usados" value={data.used} />
        <Card title="Disponíveis" value={data.free} />
      </div>

      {/* Tabela */}
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Base</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Usado em</th>
          </tr>
        </thead>
        <tbody>
          {data.qrs.map(qr => (
            <tr key={qr.id} className="border-t">
              <td className="p-2">{qr.id}</td>
              <td className="p-2">{qr.base}</td>
              <td className="p-2">
                {qr.used ? "✅ Usado" : "🟢 Livre"}
              </td>
              <td className="p-2">
                {qr.usedAt
                  ? new Date(qr.usedAt).toLocaleString("pt-BR")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded border p-4 w-40">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
