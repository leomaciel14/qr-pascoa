export type QRData = {
  id: string;
  base: "POA" | "CANOAS" | "SL" | "TESTE";
  used: boolean;
  usedAt: string | null;
};

export const initialQrs: QRData[] = [
  { id: "QR001", base: "POA", used: false, usedAt: null },
  { id: "QR002", base: "POA", used: false, usedAt: null },
  { id: "QR101", base: "CANOAS", used: false, usedAt: null },
  { id: "QR102", base: "CANOAS", used: false, usedAt: null },
  { id: "QR201", base: "SL", used: false, usedAt: null },
  { id: "QR202", base: "SL", used: false, usedAt: null },
  { id: "QR301", base: "TESTE", used: false, usedAt: null },
  { id: "QR302", base: "TESTE", used: false, usedAt: null }
];
