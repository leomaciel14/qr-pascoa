import { NextResponse } from "next/server";
import { getAllQrs } from "@/lib/qrStore";

export async function GET() {
  const qrs = getAllQrs();

  return NextResponse.json({
    total: qrs.length,
    used: qrs.filter(q => q.used).length,
    free: qrs.filter(q => !q.used).length,
    qrs
  });
}
