import admin from "firebase-admin";
import { readFileSync, mkdirSync, existsSync } from "fs";
import QRCode from "qrcode";
import path from "path";

const serviceAccount = JSON.parse(
  readFileSync("./serviceAccount.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const OUTPUT_DIR = "./qrcodes/png";

async function generatePNGs() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const snap = await db.collection("qrs").get();

  for (const doc of snap.docs) {
    const data = doc.data();
    const token = doc.id;

    const url = `https://qr-pascoa.vercel.app/pascoa?t=${token}`;
    const fileName = `qr_${data.id}_${data.base}.png`;

    await QRCode.toFile(
      path.join(OUTPUT_DIR, fileName),
      url,
      {
        width: 1024,        // alta resolução
        margin: 2,
        errorCorrectionLevel: "H", // ideal pra impressão
      }
    );

    console.log(`✅ ${fileName}`);
  }

  console.log("🎉 Todos os QR Codes em PNG foram gerados");
}

generatePNGs().catch(console.error);