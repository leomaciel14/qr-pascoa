import { initialQrs, QRData } from "@/data/qrs";

// ⚠️ Em memória (reset a cada restart do servidor)
let qrs: QRData[] = structuredClone(initialQrs);

type UseQRResult =
  | { status: "OK"; qr: QRData }
  | { status: "USED"; qr: QRData }
  | { status: "NOT_FOUND" };

export function useQr(id: string): UseQRResult {
  const qr = qrs.find(q => q.id === id);

  if (!qr) {
    return { status: "NOT_FOUND" };
  }

  if (qr.used) {
    return { status: "USED", qr };
  }

  // primeira leitura
  qr.used = true;
  qr.usedAt = new Date().toISOString();

  return { status: "OK", qr };
}

export function getAllQrs() {
  return qrs;
}

// útil para testes
export function resetQrs() {
  qrs = structuredClone(initialQrs);
}
