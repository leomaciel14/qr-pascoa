import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

type Base = "POA" | "CANOAS" | "SL";

export async function GET() {
  const snap = await db.collection("qrs").get();

  const qrs = snap.docs.map(d => d.data());

  const byBase: Record<Base, { total: number; used: number; free: number }> = {
    POA: { total: 0, used: 0, free: 0 },
    CANOAS: { total: 0, used: 0, free: 0 },
    SL: { total: 0, used: 0, free: 0 },
  };

  qrs.forEach((qr: any) => {
    const base = qr.base as Base;

    byBase[base].total++;
    qr.used ? byBase[base].used++ : byBase[base].free++;
  });

  return NextResponse.json({
    total: qrs.length,
    used: qrs.filter((q: any) => q.used).length,
    free: qrs.filter((q: any) => !q.used).length,
    byBase,
    qrs,
  });
}
