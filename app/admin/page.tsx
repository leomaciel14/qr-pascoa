"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Base = "POA" | "CANOAS" | "SL";

type QR = {
  id: number;
  base: Base;
  used: boolean;
  usedAt: string | null;
};

type ApiData = {
  total: number;
  used: number;
  free: number;
  byBase: Record<Base, { total: number; used: number; free: number }>;
  qrs: QR[];
};

export default function AdminPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [base, setBase] = useState<"ALL" | Base>("ALL");

  useEffect(() => {
    fetch("/api/admin/qrs")
      .then(res => res.json())
      .then(setData);
  }, []);

  const filteredQrs = useMemo(() => {
    if (!data) return [];
    return base === "ALL"
      ? data.qrs
      : data.qrs.filter(qr => qr.base === base);
  }, [data, base]);

  if (!data) {
    return <p className="p-8">Carregando dashboard...</p>;
  }

  const summary =
    base === "ALL"
      ? { total: data.total, used: data.used, free: data.free }
      : data.byBase[base];

  return (
    <main className="p-8 space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo-sebratel.png"
            width={250}
            height={40}
            priority
            alt="Sebratel"
          />

        </div>
        <h1 className="text-3xl font-bold">Dashboard — QR Codes</h1>

        <select
          value={base}
          onChange={e => setBase(e.target.value as any)}
          className="border rounded px-3 py-2"
        >
          <option className="text-black" value="ALL">Todas as bases</option>
          <option className="text-black" value="POA">Porto Alegre</option>
          <option className="text-black" value="CANOAS">Canoas</option>
          <option className="text-black" value="SL">São Leopoldo</option>
        </select>
      </header>

      {/* Cards */}
      <div className="flex gap-4 text-black">
        <Card title="Total" value={summary.total} />
        <Card title="Usados" value={summary.used} />
        <Card title="Disponíveis" value={summary.free} />
      </div>

      {/* Tabela */}
      <div className="overflow-auto rounded border">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-black">
              <th className="p-2 text-left">ID</th>
              <th className="p-2 text-left">Base</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Usado em</th>
            </tr>
          </thead>
          <tbody>
            {filteredQrs.map(qr => (
              <tr key={qr.id} className="border-t">
                <td className="p-2">{qr.id}</td>
                <td className="p-2">{qr.base}</td>
                <td className="p-2">
                  {qr.used ? "🔴 Usado" : "🟢 Livre"}
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
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded border p-4 w-44 bg-white shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
