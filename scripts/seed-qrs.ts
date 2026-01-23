import admin from "firebase-admin";
import { readFileSync } from "fs";

// 🔐 serviceAccount.json (NUNCA subir isso pro git)
const serviceAccount = JSON.parse(
  readFileSync("./serviceAccount.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

type Base = "POA" | "CANOAS" | "SL";

function getBaseById(id: number): Base {
  if (id < 100) return "POA";
  if (id < 200) return "CANOAS";
  return "SL";
}

async function seed() {
  const batch = db.batch();

  for (let i = 0; i < 300; i++) {
    const ref = db.collection("qrs").doc(String(i));

    batch.set(ref, {
      id: i,
      base: getBaseById(i),
      used: false,
      usedAt: null,
    });
  }

  await batch.commit();
  console.log("✅ 300 QR Codes criados com sucesso");
}

seed().catch(console.error);
