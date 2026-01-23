import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token || typeof token !== "string") {
    return NextResponse.json(
      { error: "Token inválido" },
      { status: 400 }
    );
  }

  const ref = db.collection("qrs").doc(token);

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

    // pega os dados já confirmados
    const finalSnap = await ref.get();
    const finalData = finalSnap.data();

    return NextResponse.json({
      status: "OK",
      qrId: finalData?.id,   // ID interno (dash/admin)
      base: finalData?.base // POA / CANOAS / SL
    });

  } catch (e: any) {
    if (e.message === "USED") {
      return NextResponse.json({ status: "USED" });
    }

    if (e.message === "NOT_FOUND") {
      return NextResponse.json(
        { error: "QR não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao validar QR" },
      { status: 500 }
    );
  }
}
