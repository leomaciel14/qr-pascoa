export type QRData = {
  id: string;
  base: "A" | "B" | "C";
  used: boolean;
  usedAt: string | null;
};

export const initialQrs: QRData[] = [
  { id: "QR001", base: "A", used: false, usedAt: null },
  { id: "QR002", base: "A", used: false, usedAt: null },
  { id: "QR007", base: "B", used: false, usedAt: null },
  { id: "QR010", base: "C", used: false, usedAt: null }
];
