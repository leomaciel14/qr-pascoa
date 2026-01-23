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

type SortKey = "id" | "base" | "used" | "usedAt";
type SortOrder = "asc" | "desc";

export default function AdminPage() {
  const [data, setData] = useState<ApiData | null>(null);
  const [base, setBase] = useState<"ALL" | Base>("ALL");

  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    fetch("/api/admin/qrs")
      .then(res => res.json())
      .then(setData);
  }, []);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  }

  const filteredQrs = useMemo(() => {
    if (!data) return [];

    let list =
      base === "ALL"
        ? [...data.qrs]
        : data.qrs.filter(qr => qr.base === base);

    list.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue === null) return 1;
      if (bValue === null) return -1;

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [data, base, sortKey, sortOrder]);

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
            width={220}
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
          <option value="ALL">Todas as bases</option>
          <option value="POA">Porto Alegre</option>
          <option value="CANOAS">Canoas</option>
          <option value="SL">São Leopoldo</option>
        </select>
      </header>

      {/* Cards */}
      <div className="flex gap-4 text-black">
        <Card title="Total" value={summary.total} />
        <Card title="Usados" value={summary.used} />
        <Card title="Disponíveis" value={summary.free} />
      </div>

      {/* Tabela */}
      <div className="overflow-auto rounded border bg-white">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-black">
              <th className="p-2 text-left">
                <SortHeader
                  label="ID"
                  column="id"
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              <th className="p-2 text-left">
                <SortHeader
                  label="Base"
                  column="base"
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              <th className="p-2 text-left">
                <SortHeader
                  label="Status"
                  column="used"
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
              <th className="p-2 text-left">
                <SortHeader
                  label="Usado em"
                  column="usedAt"
                  sortKey={sortKey}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredQrs.map(qr => (
              <tr key={qr.id} className="border-t hover:bg-gray-50">
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

/* ================= COMPONENTS ================= */

function SortHeader({
  label,
  column,
  sortKey,
  sortOrder,
  onSort,
}: {
  label: string;
  column: SortKey;
  sortKey: SortKey;
  sortOrder: SortOrder;
  onSort: (key: SortKey) => void;
}) {
  const active = sortKey === column;

  return (
    <button
      onClick={() => onSort(column)}
      className="flex items-center gap-1 font-semibold hover:underline"
    >
      {label}
      {active && (sortOrder === "asc" ? "⬆️" : "⬇️")}
    </button>
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
