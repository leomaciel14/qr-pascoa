import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function POST(req: Request) {
  const { id } = await req.json();

  const ref = db.collection("qrs").doc(String(id));

  try {
    await db.runTransaction(async tx => {
      const snap = await tx.get(ref);

      if (!snap.exists) {
        throw new Error("NOT_FOUND");
      }

      const data = snap.data();

      if (data?.used) {
        throw new Error("USED");
      }

      tx.update(ref, {
        used: true,
        usedAt: new Date().toISOString(),
      });
    });

    return NextResponse.json({ status: "OK" });
  } catch (e: any) {
    if (e.message === "USED") {
      return NextResponse.json({ status: "USED" });
    }

    return NextResponse.json(
      { error: "QR inválido" },
      { status: 400 }
    );
  }
}
