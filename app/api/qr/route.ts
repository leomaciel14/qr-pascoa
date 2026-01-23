import { NextResponse } from "next/server";
import { useQr } from "@/lib/qrStore";

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { status: "INVALID" },
      { status: 400 }
    );
  }

  const result = useQr(id);

  return NextResponse.json(result);
}
