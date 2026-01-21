import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "ID inválido" },
      { status: 400 }
    );
  }

  // mock temporário
  if (id === "QR007") {
    return NextResponse.json({ status: "USED" });
  }

  return NextResponse.json({ status: "OK" });
}
